import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { DataSource, Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number) {
    const { itemId, hidden, amount } = createOfferDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    const wish = await this.wishRepository.findOne({
      where: { id: itemId },
      relations: ['owner'],
    });

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    if (wish.owner.id === user.id) {
      throw new BadRequestException('Владелец подарка не может поддержать');
    }

    const currentRaised =
      typeof wish.raised === 'string' ? parseFloat(wish.raised) : wish.raised;

    if (isNaN(currentRaised) || typeof amount !== 'number') {
      throw new BadRequestException('Некорректные данные для расчета');
    }

    const raised = parseFloat((currentRaised + amount).toFixed(2));

    if (raised > wish.price) {
      throw new BadRequestException('Сумма вклада слишком большая');
    }

    wish.raised = raised;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(Offer, {
        amount,
        hidden,
        user,
      });

      await queryRunner.manager.update(Wish, wish.id, { raised: wish.raised });
      delete user.password;
      await queryRunner.commitTransaction();
      return {};
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Ошибка при создании оффера');
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.offerRepository.find({
      relations: ['items'],
    });
  }

  findOne(id: number) {
    return this.offerRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }
}

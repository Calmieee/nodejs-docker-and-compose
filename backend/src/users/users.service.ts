import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return bcrypt.hash(createUserDto.password, 10).then((hashed) =>
      this.userRepository.save({
        ...createUserDto,
        password: hashed,
        about: createUserDto.about || 'Пока ничего не рассказал о себе',
        avatar: createUserDto.avatar || 'https://i.pravatar.cc/300',
      }),
    );
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    let updatedUser = {};

    if (updateUserDto.hasOwnProperty('password')) {
      updatedUser = await bcrypt
        .hash(updateUserDto.password, 10)
        .then((hashed) =>
          this.userRepository.save({
            ...user,
            ...updateUserDto,
            password: hashed,
          }),
        );
    } else {
      updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
    }

    return updatedUser;
  }

  async findMany(query: string) {
    const users = await this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });

    if (!users.length) {
      throw new Error();
    }

    return users;
  }
}

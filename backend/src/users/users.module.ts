import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish])],
  providers: [UsersService, WishesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

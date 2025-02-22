import { IsString, Min, Max, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @Min(1)
  @Max(250)
  name: string;

  @Column({
    type: 'varchar',
    length: 1500,
    nullable: true,
  })
  @IsString()
  @Max(1500)
  description: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishlist, {
    cascade: true,
  })
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}

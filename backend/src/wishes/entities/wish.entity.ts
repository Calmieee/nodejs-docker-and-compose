import { IsString, Length, IsUrl, IsNumber, Min, Max } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  link: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  @IsNumber()
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  @IsNumber()
  raised: number;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @IsString()
  @Min(1)
  @Max(1024)
  description: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  @IsNumber()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item, {
    cascade: true,
  })
  offers: Offer[];
}

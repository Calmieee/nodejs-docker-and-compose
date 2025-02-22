import { IsBoolean } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @JoinColumn()
  item: Wish;

  @Column({ type: 'numeric', precision: 10, scale: 2, select: true })
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}

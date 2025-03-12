import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../user/user.entity';
import { BaseEntity } from '../shared/base';

@Entity()
export class Rating extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @Column({ type: 'numeric', enum: [1, 2, 3, 4, 5] })
  rating: 1 | 2 | 3 | 4 | 5;

  @Column({ nullable: true })
  comment?: string;

  @Column({ type: Date })
  updatedAt: Date;
}

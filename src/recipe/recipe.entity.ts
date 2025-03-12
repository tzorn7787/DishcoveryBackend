import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Ingredient } from './ingredient.entity';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';

@Entity()
export class Recipe extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  text: string;

  @Column()
  imgUrl: string;

  @Column({
    type: 'text',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: 'easy' | 'medium' | 'hard';

  @Column()
  prepTime: number;

  @Column()
  cookTime: number;

  @OneToMany(() => Rating, (rating) => rating.recipe, { cascade: true })
  ratings: Rating[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true, // automatically creates the ingredient in the referenced table
  })
  ingredients: Ingredient[];

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}

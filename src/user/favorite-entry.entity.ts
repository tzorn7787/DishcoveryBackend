import { Recipe } from 'src/recipe/recipe.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class FavoriteEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @CreateDateColumn()
  savedAt: Date;
}

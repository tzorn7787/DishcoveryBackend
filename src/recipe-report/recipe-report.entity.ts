import { Recipe } from 'src/recipe/recipe.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'datetime' })
  reportedAt: Date;

  @Column()
  reason: string;
}

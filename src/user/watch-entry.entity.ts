import { Recipe } from 'src/recipe/recipe.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WatchEntry {
  @ApiProperty({ example: 1, description: 'Eindeutige ID des Eintrags' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User, description: 'Der Benutzer, dem der Eintrag gehört' })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ type: () => Recipe, description: 'Das Rezept, das gemerkt wurde' })
  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  recipe: Recipe;

  @ApiProperty({
    example: '2025-03-26T10:00:00Z',
    description: 'Zeitpunkt, an dem der Eintrag erstellt wurde',
  })
  @CreateDateColumn()
  savedAt: Date;
}

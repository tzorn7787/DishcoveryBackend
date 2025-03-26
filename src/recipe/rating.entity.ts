import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../user/user.entity';
import { BaseEntity } from '../shared/base';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Rating extends BaseEntity {
  @ApiProperty({ description: 'Der Benutzer, der die Bewertung abgegeben hat', type: () => User })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ description: 'Das Rezept, das bewertet wurde', type: () => Recipe })
  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  recipe: Recipe;

  @ApiProperty({
    example: 5,
    description: 'Bewertung in Sternen (1-5)',
    enum: [1, 2, 3, 4, 5],
  })
  @Column({ type: 'numeric', enum: [1, 2, 3, 4, 5] })
  rating: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({ example: 'Super leckeres Rezept!', description: 'Optionaler Kommentar zur Bewertung', required: false })
  @Column({ nullable: true })
  comment?: string;

  @ApiProperty({ example: '2025-03-14T12:00:00Z', description: 'Datum der letzten Aktualisierung' })
  @Column({ type: Date })
  updatedAt: Date;
}

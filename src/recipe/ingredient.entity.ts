import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Ingredient {
  @ApiProperty({ example: 1, description: 'Eindeutige ID der Zutat' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Das Rezept, zu dem die Zutat gehört', type: () => Recipe })
  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @ApiProperty({ example: 'Mehl', description: 'Name der Zutat' })
  @Column()
  name: string;

  @ApiProperty({ example: 200, description: 'Menge der Zutat' })
  @Column()
  amount: number;

  @ApiProperty({
    example: 'g',
    description: 'Einheit der Menge',
    enum: ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece'],
  })
  @Column({
    type: 'text',
    enum: ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece'],
  })
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}

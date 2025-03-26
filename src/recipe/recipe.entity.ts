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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Recipe extends BaseEntity {
  @ApiProperty({ example: 'Spaghetti Bolognese', description: 'Der Name des Rezepts' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Leckere italienische Pasta mit Fleischsauce', description: 'Kurzbeschreibung des Rezepts' })
  @Column()
  description: string;

  @ApiProperty({ example: '1. Nudeln kochen\n2. Sauce zubereiten\n3. Servieren', description: 'Detaillierte Rezeptanleitung' })
  @Column()
  text: string;

  @ApiProperty({ example: 'https://example.com/spaghetti.jpg', description: 'Bild-URL des Rezepts' })
  @Column()
  imgUrl: string;

  @ApiProperty({ example: 'medium', description: 'Schwierigkeitsgrad', enum: ['easy', 'medium', 'hard'] })
  @Column({
    type: 'text',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: 'easy' | 'medium' | 'hard';

  @ApiProperty({ example: 15, description: 'Vorbereitungszeit in Minuten' })
  @Column()
  prepTime: number;

  @ApiProperty({ example: 30, description: 'Kochzeit in Minuten' })
  @Column()
  cookTime: number;

  @ApiProperty({example: 5, description: 'Durchschnitts Bewertung in Sternen',})
  @Column()
  avgRating: number;

  @ApiProperty({ type: () => [Rating], description: 'Liste der Bewertungen für das Rezept' })
  @OneToMany(() => Rating, (rating) => rating.recipe, { cascade: true })
  ratings: Rating[];

  @ApiProperty({ type: () => [Ingredient], description: 'Liste der Zutaten für das Rezept' })
  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, { cascade: true })
  ingredients: Ingredient[];

  @ApiProperty({ description: 'Der Benutzer, der das Rezept erstellt hat', type: () => User })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ example: '2025-03-14T10:00:00Z', description: 'Datum der letzten Aktualisierung' })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @ApiProperty({ type: () => [Tag], description: 'Liste der Tags für das Rezept' })
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ApiProperty({ example: 1, description: 'Anzahl der Portionen für das Rezept' })
  @Column()
  servings: number;
}

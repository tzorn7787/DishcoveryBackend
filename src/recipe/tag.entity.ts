import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tag {
  @ApiProperty({ example: 1, description: 'Eindeutige ID des Tags' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Vegan', description: 'Name des Tags' })
  @Column()
  name: string;
}

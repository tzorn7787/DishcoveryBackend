import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeReport } from './recipe-report.entity';

@Injectable()
export class RecipeReportService {
  constructor(
    @InjectRepository(RecipeReport)
    private RecipeReportsRepository: Repository<RecipeReport>,
  ) {}

  async create(recipeReport: RecipeReport): Promise<RecipeReport> {
    return await this.RecipeReportsRepository.save(recipeReport);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<RecipeReport[]> {
    return await this.RecipeReportsRepository.find();
  }

  async readOne(id: number): Promise<RecipeReport | null> {
    const result = await this.RecipeReportsRepository.find({
      where: { id },
      relations: { user: true, recipe: true },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<RecipeReport>) {
    return await this.RecipeReportsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.RecipeReportsRepository.delete(id);
  }
}

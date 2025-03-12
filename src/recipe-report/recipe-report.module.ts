import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeReportController } from './recipe-report.controller';
import { RecipeReport } from './recipe-report.entity';
import { RecipeReportService } from './recipe-report.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeReport])],
  providers: [RecipeReportService],
  controllers: [RecipeReportController],
  exports: [RecipeReportService],
})
export class RecipeReportModule {}

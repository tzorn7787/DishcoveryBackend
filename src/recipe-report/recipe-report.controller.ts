import { Controller } from '@nestjs/common';
import { RecipeReportService } from './recipe-report.service';

@Controller('recipe-report')
export class RecipeReportController {
  constructor(private readonly recipeReportService: RecipeReportService) {}
}

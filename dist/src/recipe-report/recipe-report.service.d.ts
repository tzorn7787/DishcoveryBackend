import { Repository } from 'typeorm';
import { RecipeReport } from './recipe-report.entity';
export declare class RecipeReportService {
    private RecipeReportsRepository;
    constructor(RecipeReportsRepository: Repository<RecipeReport>);
    create(recipeReport: RecipeReport): Promise<RecipeReport>;
    readAll(): Promise<RecipeReport[]>;
    readOne(id: number): Promise<RecipeReport | null>;
    update(id: number, data: Partial<RecipeReport>): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<void>;
}

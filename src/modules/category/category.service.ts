import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './category.schema';
import { CategoryResponse } from './category.types';

export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async create(data: CreateCategoryDto): Promise<CategoryResponse> {
        return this.categoryRepository.create(data);
    }

    async findAll(): Promise<CategoryResponse[]> {
        return this.categoryRepository.findAll();
    }

    async findOne(id: string): Promise<CategoryResponse | null> {
        return this.categoryRepository.findById(id);
    }

    async update(id: string, data: UpdateCategoryDto): Promise<CategoryResponse> {
        return this.categoryRepository.update(id, data);
    }

    async remove(id: string): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}

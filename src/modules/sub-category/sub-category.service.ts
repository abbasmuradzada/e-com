import { SubCategoryRepository } from './sub-category.repository';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './sub-category.schema';
import { SubCategoryResponse, SubCategoryWithProducts } from './sub-category.types';

export class SubCategoryService {
    constructor(private readonly subCategoryRepository: SubCategoryRepository) {}

    async create(data: CreateSubCategoryDto): Promise<SubCategoryResponse> {
        return this.subCategoryRepository.create(data);
    }

    async findAll(): Promise<SubCategoryResponse[]> {
        return this.subCategoryRepository.findAll();
    }

    async findOne(id: string): Promise<SubCategoryResponse | null> {
        return this.subCategoryRepository.findById(id);
    }

    async update(id: string, data: UpdateSubCategoryDto): Promise<SubCategoryResponse> {
        return this.subCategoryRepository.update(id, data);
    }

    async remove(id: string): Promise<void> {
        await this.subCategoryRepository.delete(id);
    }

    async findByCategoryId(categoryId: string): Promise<SubCategoryResponse[]> {
        return this.subCategoryRepository.findByCategoryId(categoryId);
    }
}

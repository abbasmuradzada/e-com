import { ProductRepository } from './product.repository';
import { CreateProductDto, UpdateProductDto } from './product.schema';
import { ProductResponse, ProductWithCategory } from './product.types';

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(data: CreateProductDto): Promise<ProductResponse> {
        return this.productRepository.create(data);
    }

    async findAll(): Promise<ProductResponse[]> {
        return this.productRepository.findAll();
    }

    async findOne(id: string): Promise<ProductWithCategory | null> {
        return this.productRepository.findById(id);
    }

    async update(id: string, data: UpdateProductDto): Promise<ProductResponse> {
        return this.productRepository.update(id, data);
    }

    async remove(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }

    async findByCategoryId(categoryId: string): Promise<ProductResponse[]> {
        return this.productRepository.findByCategoryId(categoryId);
    }
}

import { ProductAttributesRepository } from './product-attributes.repository';
import { CreateProductAttributeDto } from './product-attributes.schema';
import { ProductAttributesResponse } from './product-attributes.types';

export class ProductAttributesService {
    constructor(private readonly productAttributesRepository: ProductAttributesRepository) {}

    async create(data: CreateProductAttributeDto): Promise<ProductAttributesResponse> {
        return this.productAttributesRepository.create(data);
    }
}

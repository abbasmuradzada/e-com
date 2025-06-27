import { ProductSkuRepository } from './product-sku.repository';
import { CreateProductSkuDto } from './product-sku.schema';
import { ProductSkuResponse } from './product-sku.types';
import { ProductAttributesRepository } from '../product-attributes/product-attributes.repository';
import { ProductRepository } from '../product/product.repository';

export class ProductSkuService {
    constructor(
        private readonly productSkuRepository: ProductSkuRepository,
        private readonly productAttributesRepo: ProductAttributesRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async create(data: CreateProductSkuDto): Promise<ProductSkuResponse> {
        const sku = await this.generateSku(
            data.productId,
            data.colorAttributeId,
            data.sizeAttributeId,
        );
        return this.productSkuRepository.create({ ...data, sku });
    }

    private async generateSku(productId: string, colorId: string, sizeId: string): Promise<string> {
        const [product, colorAttr, sizeAttr] = await Promise.all([
            this.productRepository.findById(productId),
            this.productAttributesRepo.getById(colorId),
            this.productAttributesRepo.getById(sizeId),
        ]);

        if (!colorAttr || !sizeAttr || !product) {
            throw new Error('Invalid color or size attribute');
        }

        return `${product.name}-${colorAttr.value.toUpperCase()}-${sizeAttr.value.toUpperCase()}`;
    }
}

export interface SubCategoryResponse {
    id: string;
    name: string;
    description: string;
    parentId: string;
    createdAt: Date;
}

export interface SubCategoryWithProducts extends SubCategoryResponse {
    products: Array<{
        id: string;
        name: string;
        description: string;
    }>;
}

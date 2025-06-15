export interface ProductResponse {
    id: string;
    name: string;
    description: string;
    summary: string;
    cover: string;
    categoryId: string;
    createdAt: Date;
}

export interface ProductWithCategory extends ProductResponse {
    subCategory: {
        id: string;
        name: string;
    };
}

import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(ProductRepository: ProductRepositoryInterface) {
        this.productRepository = ProductRepository;
    }

    async execute(): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products)
    }
}

export class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map((products) => ({
                id: products.id,
                name: products.name,
                price: products.price,
            })),
        };
    };
};
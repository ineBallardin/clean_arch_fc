import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Test create product use case", () => {
    
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const product = new Product("a", "Product A", 31.50)
        await productRepository.create(product)

        const input = {
            type: "a",
            name: "Product A",
            price: 31.50
        }

        const output = {
            id: expect.any(String),
            name: "Product A",
            price: 31.50
        }

        const result = await productCreateUseCase.execute(input)

        expect(result).toEqual(output);
    });
});
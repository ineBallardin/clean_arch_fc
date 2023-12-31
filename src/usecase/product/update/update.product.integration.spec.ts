import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test for product update use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateProduct = new UpdateProductUseCase(productRepository);

        const product = new Product(
            "a",
            "Product A",
            12.90,
        );

        await productRepository.create(product);

        const updatedProductData = {
            id: product.id,
            name: "Product A Updated",
            price: 15.90
        };

        await updateProduct.execute(updatedProductData);

        const updatedProductResult = await productRepository.find(product.id);

        expect(updatedProductResult).toMatchObject({
            name: updatedProductData.name,
            price: updatedProductData.price
        });
    });
});
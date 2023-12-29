import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Test for listing customer use case", () => {
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

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const productUsecase = new ListProductUseCase(productRepository);

        const expectedProductInList = new Product(
            "a",
            "Product A",
            53.90,
        );
        
        const productForListingTest = new Product(
            "b",
            "Product B",
            106.10,
        );
        
        await productRepository.create(expectedProductInList)
        await productRepository.create(productForListingTest)

        const output = await productUsecase.execute({});

        expect(output.products[0]).toMatchObject({
            id: expectedProductInList.id,
            name: expectedProductInList.name,
            price: expectedProductInList.price
          });
          expect(output.products[1]).toMatchObject({
            id: productForListingTest.id,
            name: productForListingTest.name,
            price: productForListingTest.price
          });
    });
});
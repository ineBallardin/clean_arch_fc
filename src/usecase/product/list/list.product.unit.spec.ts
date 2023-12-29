import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase, { OutputMapper } from "./list.product.usecase";

describe("Unit test for listing products use case", () => {
    it("should list products", async () => {
        const firstProduct = ProductFactory.create(
            "a",
            "Product A",
            53.90,
        );
        
        const secondProduct = ProductFactory.create(
            "b",
            "Product B",
            106.10,
        );
        
        const MockRepository = () => {
            return {
                create: jest.fn(),
                find: jest.fn(),
                update: jest.fn(),
                findAll: jest.fn().mockReturnValue(Promise.resolve([firstProduct, secondProduct])),
            };
        };

        const productRepository = MockRepository();
        const productUsecase = new ListProductUseCase(productRepository);

        const output = await productUsecase.execute();

        expect(output.products.length).toBe(2);

        expect(output.products[0]).toMatchObject({
            id: firstProduct.id,
            name: firstProduct.name,
            price: firstProduct.price
          });
          expect(output.products[1]).toMatchObject({
            id: secondProduct.id,
            name: secondProduct.name,
            price: secondProduct.price
          });
    });
});

describe("Unit test for OutputMapper in listing products use case", () => {
    it("should throw an error when products is undefined or null", async () => {
        expect(() => OutputMapper.toOutput(undefined)).toThrow();
        expect(() => OutputMapper.toOutput(null)).toThrow();
    });
});
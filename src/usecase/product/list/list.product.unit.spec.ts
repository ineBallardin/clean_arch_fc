import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase, { OutputMapper } from "./list.product.usecase";

describe("Unit test for listing products use case", () => {
    it("should list products", async () => {
        const product1 = ProductFactory.create(
            "a",
            "Product A",
            53.90,
        );
        
        const product2 = ProductFactory.create(
            "b",
            "Product B",
            106.10,
        );
        
        const MockRepository = () => {
            return {
                create: jest.fn(),
                find: jest.fn(),
                update: jest.fn(),
                findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
            };
        };

        const repository = MockRepository();
        const productUsecase = new ListProductUseCase(repository);

        const output = await productUsecase.execute();

        expect(output.products.length).toBe(2);

        expect(output.products[0]).toMatchObject({
            id: product1.id,
            name: product1.name,
            price: product1.price
          });
          expect(output.products[1]).toMatchObject({
            id: product2.id,
            name: product2.name,
            price: product2.price
          });
    });
});

describe("Unit test for OutputMapper in listing products use case", () => {
    it("should throw an error when products is undefined or null", async () => {
        expect(() => OutputMapper.toOutput(undefined)).toThrow();
        expect(() => OutputMapper.toOutput(null)).toThrow();
    });
});
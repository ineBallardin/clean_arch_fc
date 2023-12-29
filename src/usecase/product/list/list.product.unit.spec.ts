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
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });

    it("should throw an error when products is undefined or null", async () => {
        expect(() => OutputMapper.toOutput(undefined)).toThrow();
        expect(() => OutputMapper.toOutput(null)).toThrow();
    });
});
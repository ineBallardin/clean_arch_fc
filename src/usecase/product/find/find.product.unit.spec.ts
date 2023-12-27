import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product A", 51.90)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const productUsecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 51.90
    };

    const result = await productUsecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const productUsecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return productUsecase.execute(input);
    }).rejects.toThrow("Product not found")
  });
});
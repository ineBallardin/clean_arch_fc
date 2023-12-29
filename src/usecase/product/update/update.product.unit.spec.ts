import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";


describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const product = ProductFactory.create(
            "a", "Product A", 12.90
        );
        
        const updatedProductData = {
            id: product.id,
            name: "Product A Updated",
            price: 15.90
        };
        
        const createMockProductRepository = () => {
            return {
                create: jest.fn(),
                findAll: jest.fn(),
                find: jest.fn().mockReturnValue(Promise.resolve(product)),
                update: jest.fn(),
            };
        };
        const productRepository = createMockProductRepository();
        const updateProduct = new UpdateProductUseCase(productRepository);

        const updatedProductResult = await updateProduct.execute(updatedProductData);

        expect(updatedProductResult).toEqual(updatedProductData);
        expect(productRepository.find).toHaveBeenCalledWith(updatedProductData.id);
        expect(productRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            _id: updatedProductData.id,
            _name: updatedProductData.name,
            _price: updatedProductData.price
        }));
    });
});
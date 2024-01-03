import { app, sequelize } from "../express"
import request from "supertest";
import ProductsPresenter from "../presenters/products.presenter";
import { OutputListProductsDto } from "../../../usecase/product/list/list.product.dto";

const PRODUCT_NAME_A = "Product A";
const PRODUCT_PRICE_A = 12.90;
const PRODUCT_NAME_B = "Product B";
const PRODUCT_PRICE_B = 21.90;

describe("E2E test for products functionalities", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    const createProduct = async (name: string, price: number) => {
        return await request(app)
            .post("/products")
            .send({
                name: name,
                price: price,
            });
      };

    it("should create products successfully", async () => {
        let response = await createProduct(PRODUCT_NAME_A, PRODUCT_PRICE_A);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(12.90);

        response = await createProduct(PRODUCT_NAME_B, PRODUCT_PRICE_B);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product B");
        expect(response.body.price).toBe(21.90);
    });

    it("should fails to create a product without price", async () => {
        const response = await request(app).post("/products").send({
            name: "Product A",
        });
        expect(response.status).toBe(500)
        expect(response.body.error).toBe("Price is required");
    });

    it("should return the same output in both JSON and XML formats", async () => {
        const listProductsResponse = await request(app).get("/products").send();
        expect(listProductsResponse.status).toBe(200);
        expect(listProductsResponse.body.products.length).toBe(2);
      
        const productA = listProductsResponse.body.products[0];
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(12.90);
      
        const productB = listProductsResponse.body.products[1];
        expect(productB.name).toBe("Product B");
        expect(productB.price).toBe(21.90);
      
        const mockData: OutputListProductsDto = {
            products: [
                { id: expect.anything(), name: 'Product A', price: 12.90 },
                { id: expect.anything(), name: 'Product B', price: 21.90 },
            ],
        };
        const expectedJson = mockData.products;
        const resultJson = ProductsPresenter.listJSON(mockData);
        expect(resultJson).toEqual(expectedJson);
      });
});

describe('ProductsPresenter', () => {
    it('should convert product data to XML correctly', () => {
        const mockData: OutputListProductsDto = {
            products: [
                { id: "1", name: 'Product A', price: 12.90 },
                { id: "2", name: 'Product B', price: 21.90 },
            ],
        };
        const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <id>1</id>
    <name>Product A</name>
    <price>12.9</price>
    <id>2</id>
    <name>Product B</name>
    <price>21.9</price>
  </product>
</products>`; 
        const result = ProductsPresenter.listXML(mockData);
        expect(result).toEqual(expectedXml);
    });
 });
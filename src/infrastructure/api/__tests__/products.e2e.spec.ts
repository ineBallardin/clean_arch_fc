import { app, sequelize } from "../express"
import request from "supertest";

describe("E2E test for list products", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product A",
                price: 31.50,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(31.50);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/products").send({
            name: "Product A",
        });
        expect(response.status).toBe(500)
    });

    it("should list all products", async () => {
        const responseProductA = await request(app)
            .post("/products")
            .send({
                name: "Product A",
                price: 12.90,
            });
        expect(responseProductA.status).toBe(200);

        const responseProductB = await request(app)
            .post("/products")
            .send({
                name: "Product B",
                price: 21.90,
            });
        expect(responseProductB.status).toBe(200);

        const listProductsResponse = await request(app).get("/products").send();
        expect(listProductsResponse.status).toBe(200);
        expect(listProductsResponse.body.products.length).toBe(2);

        const productA = listProductsResponse.body.products[0];
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(12.90);

        const productB = listProductsResponse.body.products[1];
        expect(productB.name).toBe("Product B");
        expect(productB.price).toBe(21.90);

        const listProductsResponseXML = await request(app)
            .get("/products")
            .set("Accept", "application/xml")
            .send();
        
        expect(listProductsResponseXML.status).toBe(200);
        expect(listProductsResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listProductsResponseXML.text).toContain(`<products>`);
        expect(listProductsResponseXML.text).toContain(`<product>`);
        expect(listProductsResponseXML.text).toContain(`<name>Product A</name>`);
        expect(listProductsResponseXML.text).toContain(`<price>12.9</price>`);
        expect(listProductsResponseXML.text).toContain(`</product>`);
        expect(listProductsResponseXML.text).toContain(`<product>`);
        expect(listProductsResponseXML.text).toContain(`<name>Product B</name>`);
        expect(listProductsResponseXML.text).toContain(`<price>21.9</price>`);
        expect(listProductsResponseXML.text).toContain(`</product>`);
        expect(listProductsResponseXML.text).toContain(`</products>`);
    });
});
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";
import ProductModel from "../product/repository/sequelize/product.model";
import { createProductsRoute } from "./routes/products.route";
import ProductRepository from "../product/repository/sequelize/product.repository";

const productRepository = new ProductRepository();

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/products", createProductsRoute(productRepository));

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}
setupDb();

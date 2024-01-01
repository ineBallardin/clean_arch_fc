import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductsPresenter from '../presenters/products.presenter';

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
    const products = new CreateProductUseCase(new ProductRepository());
    try {
        const productsDto = {
            name: req.body.name,
            price: req.body.price,
        };

        const output = await products.execute(productsDto);
        res.send(output);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    };
});

productsRoute.get("/", async (req: Request, res: Response) => {
    const listProducts = new ListProductUseCase(new ProductRepository());
    const output = await listProducts.execute();

    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(ProductsPresenter.listXML(output))
    });
});
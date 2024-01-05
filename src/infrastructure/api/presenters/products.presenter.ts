import { toXML } from "jstoxml";
import { OutputListProductsDto } from "../../../usecase/product/list/list.product.dto";

export default class ProductsPresenter {
    static listXML(data: OutputListProductsDto): string {
        const xmlOption = {
            header: true,
            indent: "  ",
            newLine: "\n",
            allowEmpty: true,
        };

        const productsJSON = {
            products: {
                product: data.products.map((products) => ({
                    id: products.id,
                    name: products.name,
                    price: products.price
                })),
            },
        }
        try {
            return toXML(productsJSON, xmlOption);
        }  catch (error) {
            console.error(`Error converting data to XML: ${error}`);
            throw error;
        }
    };
    static listJSON(data: OutputListProductsDto): any {
        return data.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price
        }));
     }
};
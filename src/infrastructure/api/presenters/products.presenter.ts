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

        return toXML(
            {
                products: {
                    product: data.products.map((products) => ({
                        id: products.id,
                        name: products.name,
                        price: products.price
                    })),
                },
            },
            xmlOption
        );
    };
};
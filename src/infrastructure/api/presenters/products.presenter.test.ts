import { OutputListProductsDto } from "../../../usecase/product/list/list.product.dto";
import ProductsPresenter from "./products.presenter";


jest.mock('jstoxml', () => ({
    toXML: jest.fn()
}));

describe('ProductsPresenter', () => {
    describe('listXML method', () => {
        it('should correctly call toXML with the right parameters and return XML', () => {
            const mockToXML = require('jstoxml').toXML;
            const testData: OutputListProductsDto = {
                products: [
                    { id: '1', name: 'Product 1', price: 100 },
                    { id: '2', name: 'Product 2', price: 200 }
                ]
            };

            const expectedXML = `<xml><products><product><id>1</id><name>Product 1</name><price>100</price></product><product><id>2</id><name>Product 2</name><price>200</price></product></products></xml>`;
            mockToXML.mockReturnValue(expectedXML);

            const result = ProductsPresenter.listXML(testData);
            
            const expectedJSONPassedToToXML = {
                products: {
                    product: [
                        { id: '1', name: 'Product 1', price: 100 },
                        { id: '2', name: 'Product 2', price: 200 }
                    ]
                }
            };

            expect(mockToXML).toHaveBeenCalledWith(expectedJSONPassedToToXML, {
                header: true,
                indent: "  ",
                newLine: "\n",
                allowEmpty: true,
            });
            
            expect(result).toBe(expectedXML);
        });

        it('should throw an error if toXML throws an error', () => {
            const mockToXML = require('jstoxml').toXML;
            const testData: OutputListProductsDto = {
                products: [
                    { id: '1', name: 'Product 1', price: 100 },
                    { id: '2', name: 'Product 2', price: 200 }
                ]
            };

            const testError = new Error('Test error');
            mockToXML.mockImplementation(() => {
                throw testError;
            });

            expect(() => {
                ProductsPresenter.listXML(testData);
            }).toThrow(testError);
        });
    });
    describe('listJSON', () => {
        it('should convert the outputListProductsDto to a JSON array of objects', () => {
          const data: OutputListProductsDto = {
            products: [
              { id: '1', name: 'Product 1', price: 100 },
              { id: '2', name: 'Product 2', price: 200 }
            ]
          };
      
          const expectedResult = [
            { id: '1', name: 'Product 1', price: 100 },
            { id: '2', name: 'Product 2', price: 200 }
          ];
      
          const actualResult = ProductsPresenter.listJSON(data);
      
          expect(actualResult).toEqual(expectedResult);
        });
      });
});

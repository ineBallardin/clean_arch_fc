import NotificationError from "../../@shared/notification/notification.error";
import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    try {
      new Product("", "Product 1", 100);
    } catch (error) {
      const notificationError = error as NotificationError;
      expect(notificationError).toBeInstanceOf(NotificationError);
      expect(notificationError.errors).toContainEqual({
        context: "product",
        message: "Id is required"
      });
    };
  });

  it("should throw error when name is empty", () => {
    try {
      new Product("123", "", 100);
    } catch (error) {
      const notificationError = error as NotificationError;
      expect(notificationError).toBeInstanceOf(NotificationError);
      expect(notificationError.errors).toContainEqual({
        context: "product",
        message: "Name is required"
      });
    }
  });

  it("should throw error when price is less than zero", () => {
    let errorThrown = false;
    try {
      new Product("123", "Name", -1);
    } catch (error) {
      errorThrown = true;
      const notificationError = error as NotificationError;
      expect(notificationError).toBeInstanceOf(NotificationError);
      expect(notificationError.errors).toContainEqual({
        context: "product",
        message: "Price must be greater than zero"
      });
    };
    expect(errorThrown).toBe(true);
  });

  it("should throw error ONLY when price is less than zero", () => {
    let errorThrown = false;
    try {
      new Product("123", "Name", 1);
    } catch (error) {
      errorThrown = true;
    }
    expect(errorThrown).toBe(false);
  });

  it("should accumulate two errors when name and price are null or undefined", () => {
    expect(() => {
      new Product("1", "", 0);
    }).toThrowError(NotificationError);

    try {
      new Product("1", "", 0);
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationError);
      const notificationError = error as NotificationError;
      const errors = notificationError.errors;
      expect(errors.length).toBe(2);

      expect(errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "Name is required",
            context: "product",
          }),
          expect.objectContaining({
            message: "Price must be greater than zero",
            context: "product",
          }),
        ])
      );
    }
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});

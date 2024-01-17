import Notification from "./notification";

describe("Unit tests for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2 = {
      message: "error message 2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message 2,"
    );

    const error3 = {
      message: "error message 3",
      context: "order",
    };
    notification.addError(error3);

    const error4 = {
      message: "error message 4",
      context: "product"
    }
    notification.addError(error4)

    const error5 = {
      message: "error message 5",
      context: "product"
    }
    notification.addError(error5)

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message 2,"
    );
    expect(notification.messages()).toBe(
      "customer: error message,customer: error message 2,order: error message 3,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});

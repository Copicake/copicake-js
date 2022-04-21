import Copicake from "./main";

describe("main", () => {
  it("should create copicake instance", () => {
    const copicake = new Copicake({
      apiKey: "test",
    });

    expect(copicake).toBeInstanceOf(Copicake);
  });
});

import { sum } from "@/app/lib/testFunc";

describe("Page", () => {
  it("renders a heading", () => {
    // expect(1).toBe(1);
    expect(sum(2, 3)).toBe(5);
  });
  it("renders a heading 2", () => {
    // expect(1).toBe(1);
    expect(sum(2, 3)).toBe(6);
  });
});

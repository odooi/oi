import { beforeEach, describe, expect, test } from "@oi/hoot";
import { getService, makeMockEnv } from "@web/../tests/web_test_helpers";

describe.current.tags("headless");

let titleService;

beforeEach(async () => {
    await makeMockEnv();
    titleService = getService("title");
});

test("simple title", () => {
    titleService.setParts({ one: "MyOi" });
    expect(titleService.current).toBe("MyOi");
});

test("add title part", () => {
    titleService.setParts({ one: "MyOi", two: null });
    expect(titleService.current).toBe("MyOi");
    titleService.setParts({ three: "Import" });
    expect(titleService.current).toBe("MyOi - Import");
});

test("modify title part", () => {
    titleService.setParts({ one: "MyOi" });
    expect(titleService.current).toBe("MyOi");
    titleService.setParts({ one: "Zoi" });
    expect(titleService.current).toBe("Zoi");
});

test("delete title part", () => {
    titleService.setParts({ one: "MyOi" });
    expect(titleService.current).toBe("MyOi");
    titleService.setParts({ one: null });
    expect(titleService.current).toBe("Oi");
});

test("all at once", () => {
    titleService.setParts({ one: "MyOi", two: "Import" });
    expect(titleService.current).toBe("MyOi - Import");
    titleService.setParts({ one: "Zoi", two: null, three: "Sauron" });
    expect(titleService.current).toBe("Zoi - Sauron");
});

test("get title parts", () => {
    expect(titleService.current).toBe("");
    titleService.setParts({ one: "MyOi", two: "Import" });
    expect(titleService.current).toBe("MyOi - Import");
    const parts = titleService.getParts();
    expect(parts).toEqual({ one: "MyOi", two: "Import" });
    parts.action = "Export";
    expect(titleService.current).toBe("MyOi - Import"); // parts is a copy!
});

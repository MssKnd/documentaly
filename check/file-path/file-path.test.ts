import { assertEquals } from "https://deno.land/std@0.175.0/testing/asserts.ts";
import { validateFilePath } from "./mod.ts";

Deno.test("validateFilePath", async (t) => {
  await t.step("valid", () => {
    // given:
    const input1 = ".";
    const input2 = "src/common";
    const input3 = "./doc/README.md";

    // when:
    const filePath1 = validateFilePath(input1);
    const filePath2 = validateFilePath(input2);
    const filePath3 = validateFilePath(input3);

    // then:
    assertEquals(filePath1, ".");
    assertEquals(filePath2, "src/common");
    assertEquals(filePath3, "./doc/README.md");
  });
});

import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { yamlParser } from "./mod.ts";

Deno.test("yamlParser", async (t) => {
  await t.step("valid", () => {
    // given:
    const input = `prop1: 1\nprop2: '2'`;

    // when:
    const target = yamlParser(input);

    // then:
    assertEquals(target, { prop1: 1, prop2: "2" });
  });

  await t.step("valid: When empty prop.", () => {
    // given:
    const input = "";

    // when:
    const target = yamlParser(input);

    // then:
    assertEquals(target, {});
  });
});

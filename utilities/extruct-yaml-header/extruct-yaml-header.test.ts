import { assertEquals } from "https://deno.land/std@0.175.0/testing/asserts.ts";
import { extructYamlHeader } from "./mod.ts";

Deno.test("extructYamlHeader", async (t) => {
  await t.step("valid", () => {
    // given:
    const input = `---
prop: 1
---
body`;

    // when:
    const { yamlHeader, body } = extructYamlHeader(input);

    // then:
    assertEquals(yamlHeader, "prop: 1");
    assertEquals(body, "body");
  });

  await t.step("valid: When empty prop.", () => {
    // given:
    const input = `body`;

    // when:
    const { yamlHeader, body } = extructYamlHeader(input);

    // then:
    assertEquals(yamlHeader, "");
    assertEquals(body, "body");
  });
});

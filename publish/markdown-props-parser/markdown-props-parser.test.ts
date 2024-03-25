import { assertEquals } from "https://deno.land/std@0.217.0/testing/asserts.ts";
import { markdownPropsParser } from "./mod.ts";

Deno.test("publish", async (t) => {
  await t.step("valid: No filePaths input.", () => {
    // given:
    const parsedProps = { prop1: "foo", prop2: "bar" };
    const body = "body";
    const markdown = `---
prop1: foo
prop2: bar
---
body`;

    // when:
    const target = markdownPropsParser(markdown);

    // then:
    assertEquals(target, {
      props: parsedProps,
      body,
    });
  });
});

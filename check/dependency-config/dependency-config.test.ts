import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import { validateDependencyConfig } from "./mod.ts";

Deno.test("validateDependencyConfig", async (t) => {
  await t.step("valid", () => {
    // given:
    const input = {
      dependentFilePaths: ["./src", "./doc"],
    };

    // when:
    const dependencyConfig = validateDependencyConfig(input);

    // then:
    assertEquals(dependencyConfig.dependentFilePaths.length, 2);
    assertEquals(dependencyConfig.dependentFilePaths[0], "./src");
    assertEquals(dependencyConfig.dependentFilePaths[1], "./doc");
  });
});

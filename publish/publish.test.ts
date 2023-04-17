import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.183.0/testing/mock.ts";
import { MarkdonwFilePath } from "../utilities/path/mod.ts";
import { publish } from "./mod.ts";

Deno.test("publish", async (t) => {
  await t.step("valid: No filePaths input.", () => {
    // given:
    const logSpy = spy(console, "info");
    const markdownFilePaths: MarkdonwFilePath[] = [];

    // when:
    publish({
      markdownFilePaths,
    });

    // then:
    assertSpyCall(logSpy, 0, {
      args: ["No change files."],
    });
  });
});

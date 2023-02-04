import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.176.0/testing/mock.ts";
import { FilePath } from "../utilities/file-path/mod.ts";
import { publish } from "./mod.ts";

Deno.test("publish", async (t) => {
  await t.step("valid: No filePaths input.", () => {
    // given:
    const logSpy = spy(console, "info");
    const filePaths: FilePath[] = [];

    // when:
    publish({
      filePaths,
    });

    // then:
    assertSpyCall(logSpy, 0, {
      args: ["No change files."],
    });
  });
});

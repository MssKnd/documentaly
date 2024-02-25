import { assertEquals } from "https://deno.land/std@0.217.0/testing/asserts.ts";
import { replaceMarkdownImagePath } from "./mod.ts";

Deno.test("replaceMarkdownImagePath", async (t) => {
  await t.step("valid", () => {
    // given:
    const newPath = "https://example.com/assets";
    const markdown = `
    [text link](./test/link)
    ![image1](./images/image1.png)
    ![](./images/image2.png)
    <img src="./images/image3.png" alt="image2" />
    <img alt="image3" src="./images/image4.png" />
    <img alt="image4" src="./images/image5.png" width="100px" />
    `;

    // when:
    const target = replaceMarkdownImagePath(markdown, newPath);

    // then:
    assertEquals(
      target,
      `
    [text link](./test/link)
    ![image1](https://example.com/assets/image1.png)
    ![](https://example.com/assets/image2.png)
    <img src="https://example.com/assets/image3.png" alt="image2" />
    <img alt="image3" src="https://example.com/assets/image4.png" />
    <img alt="image4" src="https://example.com/assets/image5.png" width="100px" />
    `,
    );
  });
});

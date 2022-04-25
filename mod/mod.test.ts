import { assertExists, assertMatch } from "./deps.ts";

import Asciidoctor from "./mod.ts";

Deno.test("Default export", () => {
  assertExists(Asciidoctor);
});

Deno.test("Convert to HTML", () => {
  const asciidoctor = Asciidoctor();
  const html = asciidoctor.convert("== TestTitle") as string;
  assertMatch(html, /TestTitle/);
});

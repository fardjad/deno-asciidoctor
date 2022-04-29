import { assertExists, assertMatch } from "./deps.ts";

import Asciidoctor from "./mod.js";

Deno.test("Default export", () => {
  assertExists(Asciidoctor);
});

Deno.test("Convert to HTML", () => {
  const asciidoctor = Asciidoctor();
  const html = asciidoctor.convert("== TestTitle") as string;
  assertMatch(html, /TestTitle/);
});

Deno.test("Stylesheet support", () => {
  const asciidoctor = Asciidoctor();
  const html = asciidoctor.convert(
    [
      ":linkcss:",
      ":stylesheet: https://cdn.jsdelivr.net/gh/asciidoctor/asciidoctor/data/stylesheets/asciidoctor-default.css",
      "== TestTitle",
    ].join("\n"),
    {
      safe: "server",
      doctype: "book",
      standalone: true,
    },
  ) as string;
  assertMatch(html, /stylesheet/);
});

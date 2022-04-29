# deno-asciidoctor
> Patched version of Asciidoctor.js to be used with Deno

## Description

This repository automatically patches the browser bundle from 
[`@asciidoctor/core`](https://www.npmjs.com/package/@asciidoctor/core) to make 
it compatible with Deno and creates a tag matching the version of the 
npm module.

For more information about the module, please visit the Asciidoctor.js 
[repository](https://github.com/asciidoctor/asciidoctor.js). 

## Usage

```typescript
import Asciidoctor from 'https://deno.land/x/asciidoctor/mod.js';

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
console.log(html);
```

## Limitations

Fetching remote resources such as stylesheets is not supported! To load stylesheets, consider setting the linkcss document attribute or embed the stylesheets in the HTML manually.
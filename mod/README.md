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
const html = asciidoctor.convert("== TestTitle");
console.log(html);
```

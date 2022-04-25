import fs from "node:fs";
import { readFileFromPackage } from "./read-file-from-package.mjs";

const types = await readFileFromPackage(
  "@asciidoctor/core/types/index.d.ts"
);

const bufferImportLine = "import {Buffer} from 'https://deno.land/std/node/buffer.ts';";
const patchedTypes = types.replace(/\/{3}.*reference.*node.*/, bufferImportLine);

fs.writeSync(process.stdout.fd, patchedTypes);

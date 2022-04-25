import fs from 'fs';
import { readFileFromPackage } from "./read-file-from-package.mjs";

const { version: asciidoctorVersion } = JSON.parse(
  await readFileFromPackage("@asciidoctor/core/package.json")
);

fs.writeSync(process.stdout.fd, asciidoctorVersion); 

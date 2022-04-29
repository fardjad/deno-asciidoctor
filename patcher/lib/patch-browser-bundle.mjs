import fs from "node:fs";
import * as astring from "astring";
import { parse } from "acorn";
import { walk } from "estree-walker";

import { readFileFromPackage } from "./read-file-from-package.mjs";

const isThisDotOpalAssignment = (node) => {
  return (
    node.left?.type === "MemberExpression" &&
    node.left?.object?.type === "ThisExpression" &&
    node.left?.property?.type === "Identifier" &&
    node.left?.property?.name === "Opal"
  );
};

const isAliasLengthAssignment = (node) => {
  return (
    node.left?.type === "MemberExpression" &&
    node.left?.object?.type === "Identifier" &&
    node.left?.object?.name === "alias" &&
    node.left?.property?.type === "Identifier" &&
    node.left?.property?.name === "length"
  );
};

const isRootAsciidoctorAssignment = (node) => {
  return (
    node.left?.type === "MemberExpression" &&
    node.left?.object?.type === "Identifier" &&
    node.left?.object?.name === "root" &&
    node.left?.property?.type === "Identifier" &&
    node.left?.property?.name === "Asciidoctor"
  );
};

const script = await readFileFromPackage(
  "@asciidoctor/core/dist/browser/asciidoctor.js"
);

const ast = parse(script, { ecmaVersion: "latest" });
walk(ast, {
  enter(node) {
    if (isThisDotOpalAssignment(node)) {
      node.left.object = {
        type: "Identifier",
        name: "globalThis",
      };
      return this.skip();
    }

    if (isAliasLengthAssignment(node)) {
      return this.replace({
        type: "BlockStatement",
        body: [],
      });
    }

    if (isRootAsciidoctorAssignment(node)) {
      node.left.object.name = "globalThis";
      return this.skip();
    }
  },
});

const code = `class XMLHttpRequest {
  constructor() {
    throw new Error("Loading remote resources is not supported! If you're trying to load a stylesheet, consider setting the linkcss document attribute");
  }
}

${astring.generate(ast)}

const Asciidoctor = globalThis.Asciidoctor;
delete globalThis.Asciidoctor;
export default Asciidoctor;
`;

fs.writeSync(process.stdout.fd, code);

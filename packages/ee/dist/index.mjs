#!/usr/bin/env node
import minimist from "minimist";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { build } from "./build.mjs";
const argv = minimist(process.argv.slice(2));
if (argv.version) {
  console.log(
    JSON.parse(
      (await fs.readFile(path.resolve(__dirname, "../package.json"))).toString(
        "utf-8"
      )
    ).version
  );
  process.exit(0);
}
const toArray = (value) => {
  return value ? typeof value === "string" ? [value] : value : [];
};
const entries = argv._;
const {
  _,
  "--": __,
  "check-types": checkTypes,
  "ts-project": tsProject = "tsconfig.json",
  format,
  external,
  "clean-outdir": cleanOutDir,
  outdir,
  target,
  ...options
} = argv;
const formats = toArray(format);
const externals = toArray(external);
await build({
  entries,
  tsProject,
  outdir,
  cleanOutDir,
  checkTypes,
  formats,
  target,
  options: {
    ...options,
    external: externals
  }
});
//# sourceMappingURL=index.mjs.map

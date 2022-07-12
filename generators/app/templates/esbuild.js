#! /usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    loader: {
      ".ts": "ts",
    },
    logLevel: "debug",
    allowOverwrite: true,
  })
  .catch(() => process.exit(1));

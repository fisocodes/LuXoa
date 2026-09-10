import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jest from "ultracite/oxlint/jest";
import nestjs from "ultracite/oxlint/nestjs";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";

export default defineConfig({
  extends: [core, react, nestjs, jest, tanstack],
  ignorePatterns: core.ignorePatterns,
});

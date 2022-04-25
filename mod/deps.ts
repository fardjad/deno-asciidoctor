// No need to re-export this; this is only here to help with caching
// dependencies in the CI environment
import type { Buffer } from "https://deno.land/std/node/buffer.ts";

export {
  assertExists,
  assertMatch,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";

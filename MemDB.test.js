import * as t from "https://deno.land/std/testing/asserts.ts";
import { MemDB } from "./MemDB.js";
import { testDB } from "./testDB.js";

const db = await new MemDB().init();
testDB(db);

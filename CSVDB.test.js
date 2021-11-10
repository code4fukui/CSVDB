import * as t from "https://deno.land/std/testing/asserts.ts";
import { CSVDB } from "./CSVDB.js";
import { testDB } from "./testDB.js";

const db = await new CSVDB().init();
testDB(db);


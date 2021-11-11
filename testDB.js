import * as t from "https://deno.land/std/testing/asserts.ts";

export const testDB = (db) => {
  const tbl = "testtable";

  Deno.test("simple", async () => {
    await db.dropTable(tbl);
    await db.createTable(tbl);
    await db.add(tbl, { a: "a", b: "12" });
    t.assertEquals(await db.list(tbl), [{ a: "a", b: "12" }]);
  });
  Deno.test("list", async () => {
    await db.add(tbl, { a: "b", b: "34" });
    const expect = [
      { a: "a", b: "12" },
      { a: "b", b: "34" },
    ];
    t.assertEquals(await db.list(tbl), expect);
  });
  Deno.test("get", async () => {
    t.assertEquals(await db.get(tbl, { a: "a" }), { a: "a", b: "12" });
    t.assertEquals(await db.get(tbl, { a: "b" }), { a: "b", b: "34" });
  });
  Deno.test("edit", async () => {
    await db.edit(tbl, { a: "a" }, { b: "123" });
    t.assertEquals(await db.list(tbl), [{ a: "a", b: "123" }, { a: "b", b: "34" }]);
  });
  Deno.test("edit", async () => {
    await db.edit(tbl, { a: "b" }, { b: "3333" });
    t.assertEquals(await db.list(tbl), [{ a: "a", b: "123" }, { a: "b", b: "3333" }]);
  });
  Deno.test("edit", async () => {
    await db.edit(tbl, { a: "b", b: "3333" }, { b: "9999" });
    t.assertEquals(await db.list(tbl), [{ a: "a", b: "123" }, { a: "b", b: "9999" }]);
  });
  Deno.test("del", async () => {
    await db.del(tbl, { a: "b" });
    t.assertEquals(await db.list(tbl), [{ a: "a", b: "123" }]);
  });
  Deno.test("addWithID", async () => {
    const tbl = "tbl2";
    await db.dropTable(tbl);
    await db.createTable(tbl);
    await db.addWithID(tbl, "id", { a: "abc", b: "1" });
    await db.addWithID(tbl, "id", { a: "def", b: "2" });
    t.assertEquals(await db.list(tbl), [{ id: "1", a: "abc", b: "1" }, { id: "2", a: "def", b: "2" }]);
  });
  Deno.test("addWithID", async () => {
    const tbl = "tbl2";
    await db.edit(tbl, { id: "1" }, { b: "9" });
    t.assertEquals(await db.list(tbl), [{ id: "1", a: "abc", b: "9" }, { id: "2", a: "def", b: "2" }]);
  });
  Deno.test("listTable", async () => {
    const tbl = "tbl2";
    t.assertEquals(await db.listTable(), ["tbl2", "testtable"]);
  });
};

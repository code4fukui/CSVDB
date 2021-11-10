import { CSV } from "https://js.sabae.cc/CSV.js";
import { MemDB } from "./MemDB.js";

class CSVDB {
  constructor() {
  }
  async init(opts) {
    this.path = opts?.database || "data";
    if (!this.path.endsWith("/")) {
      this.path += "/";
    }
    await Deno.mkdir(this.path, { recursive: true });
    return this;
  }
  async _save(tbl, json) {
    await Deno.writeTextFile(this.path + tbl + ".csv", CSV.stringify(json));
  }
  async _load(tbl) {
    try {
      return CSV.toJSON(await CSV.fetch(this.path + tbl + ".csv"));
    } catch (e) {
    }
    return [];
  }
  async add(tbl, req) {
    const t = await this._load(tbl);
    MemDB.addData(t, req);
    await this._save(tbl, t);
    return true;
  }
  async addWithID(tbl, idname, req) {
    const t = await this._load(tbl);
    MemDB.addDataWithID(t, idname, req);
    await this._save(tbl, t);
    return true;
  }
  async del(tbl, cond) {
    const t = await this._load(tbl);
    const t2 = MemDB.delData(t, cond);
    await this._save(tbl, t2);
    return true;
  }
  async edit(tbl, cond, req) {
    const t = await this._load(tbl);
    MemDB.editData(t, cond, req);
    await this._save(tbl, t);
    return true;
  }
  async clear(tbl) {
    const t = [];
    await this._save(tbl, t);
    return true;
  }
  async list(tbl, req, columns = null) {
    const t = await this._load(tbl);
    return MemDB.listData(t, req, columns);
  }
  async get(tbl, req, columns = null) { // ret copy
    const t = await this.list(tbl, req, columns);
    if (!t || t.length == 0) {
      return null;
    }
    return t[0];
  }
  async dropTable(tbl) {
    try {
      return await Deno.remove(this.path + tbl + ".csv");
    } catch (e) {
    }
  }
  async createTable(tbl) {
    return true;
  }
};

export { CSVDB };

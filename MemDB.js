import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

class MemDB {
  constructor() {
    this.db = {};
  }
  async init(opts) {
    return this;
  }
  async add(tbl, req) {
    const t = this.db[tbl];
    return MemDB.addData(t, req);
  }
  async addWithID(tbl, idname, req) {
    const t = this.db[tbl];
    return MemDB.addDataWithID(t, idname, req);
  }
  async list(tbl, req, columns = null) {
    const t = this.db[tbl];
    return MemDB.listData(t, req, columns);
  }
  async get(tbl, req, columns = null) { // ret copy
    const t = await this.list(tbl, req, columns);
    if (!t || t.length == 0) {
      return null;
    }
    const res = {};
    Object.assign(res, t[0]);
    return res;
  }
  async del(tbl, cond) {
    const t = this.db[tbl];
    this.db[tbl] = MemDB.delData(t, cond);
    return true;
  }
  async edit(tbl, cond, req) {
    const t = this.db[tbl];
    return MemDB.editData(t, cond, req);
  }
  /*
  async clear(tbl) {
    delete this.db[tbl];
    return res;
  }
  */
  async dropTable(tbl) {
    delete this.db[tbl];
  }
  async createTable(tbl, columns) {
    this.db[tbl] = [];
    return true;
  }
  async listTable() {
    return Object.keys(this.db).sort();
  }
  async getTableSchema(tbl) {
    throw new Error("not supported");
  }

  // static
  static addData(t, req) {
    if (Array.isArray(req)) {
      for (const r of req) {
        t.push(r);
      }
    } else {
      t.push(req);
    }
    return true;
  }
  static addDataWithID(t, idname, req) {
    const max = ArrayUtil.max(t, (d) => parseInt(d[idname]));
    if (!max) {
      req[idname] = "1";
    } else {
      req[idname] = (parseInt(max[idname]) + 1).toString();
    }
    //console.log("max", max, req[idname]);
    t.push(req);
    return true;
  }
  static listData(t, req, columns = null) {
    const res = t.filter(d => {
      let flg = true;
      for (const key in req) {
        if (req[key] != d[key]) {
          flg = false;
        }
      }
      return flg;
    });
    return res;
  }
  static editData(t, cond, req) {
    if (!cond) {
      throw new Error("no cond");
    }
    t.filter(d => {
      let flg = true;
      for (const key in cond) {
        if (d[key] !== cond[key]) {
          flg = false;
        }
      }
      return flg;
    }).forEach(d => {
      for (const key in req) {
        d[key] = req[key];
      }
    });
    return true;
  }
  static delData(t, cond) {
    if (!cond) {
      throw new Error("no cond");
    }
    const res = t.filter(d => {
      for (const key in cond) {
        if (d[key] !== cond[key]) {
          return true;
        }
      }
      return false;
    });
    //const res = await this.client.queryArray(`delete from ${tbl} ${makeWhere(cond)}`);
    //console.log(res);
    return res;
  }
};

export { MemDB };

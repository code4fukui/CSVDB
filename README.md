# CSVDB

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

CSVDB.js is an easy-to-use data management tool using CSV files.

## Features
- Stores data in CSV files
- Provides basic CRUD (Create, Read, Update, Delete) operations
- Supports filtering and querying data
- Allows creating and managing multiple tables

## Requirements
- Deno runtime environment

## Usage
1. Install Deno: https://deno.land/
2. Create a new Deno project and add the CSVDB.js file to it.
3. Initialize the CSVDB instance and use the provided methods to manage your data.

```javascript
import { CSVDB } from "./CSVDB.js";

const db = await new CSVDB().init();

// Add data
await db.add("users", { name: "John Doe", email: "john@example.com" });

// Retrieve data
const users = await db.list("users");
console.log(users);

// Update data
await db.edit("users", { name: "John Doe" }, { email: "updated@example.com" });

// Delete data
await db.del("users", { name: "John Doe" });
```

## License
MIT License — see [LICENSE](LICENSE).
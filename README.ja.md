# CSVDB


CSVDB.js は、CSVファイルを使用した使いやすいデータ管理ツールです。

## 機能
- CSVファイルにデータを保存
- 基本的なCRUD（作成、読み取り、更新、削除）操作を提供
- データのフィルタリングとクエリをサポート
- 複数のテーブルの作成と管理が可能

## 要件
- Denoランタイム環境

## 使用方法
1. Denoをインストールします: https://deno.land/
2. 新しいDenoプロジェクトを作成し、そこに CSVDB.js ファイルを追加します。
3. CSVDB インスタンスを初期化し、提供されているメソッドを使用してデータを管理します。

```javascript
import { CSVDB } from "./CSVDB.js";

const db = await new CSVDB().init();

// データの追加
await db.add("users", { name: "John Doe", email: "john@example.com" });

// データの取得
const users = await db.list("users");
console.log(users);

// データの更新
await db.edit("users", { name: "John Doe" }, { email: "updated@example.com" });

// データの削除
await db.del("users", { name: "John Doe" });
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。

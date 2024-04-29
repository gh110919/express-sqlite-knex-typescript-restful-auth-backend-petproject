import { db } from "./db-middleware";

(async () => {
  try {
    await db.schema.createTable("users", (table: any) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
    });

    console.log("Таблица 'users' успешно создана!");
  } catch (error) {
    console.error("Ошибка при создании таблицы 'users':", error);
  }
})();

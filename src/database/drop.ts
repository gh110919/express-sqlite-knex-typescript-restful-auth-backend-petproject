import { db } from "./db-middleware";

(async () => {
  try {
    await db.schema.dropTable("users");
    
    console.log("Таблица 'users' успешно удалена!");
  } catch (error) {
    console.error("Ошибка при удалении таблицы 'users':", error);
  }
})();

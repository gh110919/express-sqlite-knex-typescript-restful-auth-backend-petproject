import { db } from "../database/db-middleware";
import { TModel } from "./service";

const set =
  <T>(table: string) =>
  async (data?: any): Promise<T> => {
    const [id] = await db(table).insert(data);
    return { id, ...data };
  };

const get =
  <T>(table: string) =>
  async (id?: number | undefined): Promise<T | T[] | null> => {
    if (id) {
      return db(table).where({ id }).first();
    }
    return db(table).select();
  };

const put =
  <T>(table: string) =>
  async (id?: number, data?: any): Promise<T | null> => {
    await db(table).where({ id }).update(data);
    return db(table).where({ id }).first();
  };

const cut =
  <T>(table: string) =>
  async (id?: number): Promise<T | null> => {
    const item = await db(table).where({ id }).first();
    await db(table).where({ id }).delete();
    return item;
  };

export const model = <T>(table: string): TModel<T> => ({
  create: set<T>(table),
  read: get<T>(table),
  update: put<T>(table),
  delete: cut<T>(table),
});

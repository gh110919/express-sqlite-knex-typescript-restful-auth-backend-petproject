export type TModel<T> = {
  create: (data: T) => Promise<T>;
  read: (id?: number) => Promise<T | T[] | null>;
  update: (id: number, data?: T) => Promise<T | null>;
  delete: (id: number) => Promise<T | null>;
};

const set =
  <T>(model: TModel<T>) =>
  async (data: T) =>
    model.create(data);

const get =
  <T>(model: TModel<T>) =>
  async (id?: number) => {
    if (!id) {
      return model.read();
    }
    return model.read(id);
  };

const put =
  <T>(model: TModel<T>) =>
  async (id: number, data: any) => {
    return model.update(id, data);
  };

const cut =
  <T>(model: TModel<T>) =>
  async (id: number) => {
    if (!id) {
      throw new Error("не указан id");
    }
    return model.delete(id);
  };

export const service = <T>(model: TModel<T>) => ({
  create: set<T>(model),
  read: get<T>(model),
  update: put<T>(model),
  delete: cut<T>(model),
});

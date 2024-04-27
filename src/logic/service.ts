export type TModel<T> = {
  create: (data: T) => Promise<T>;
  find: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  findByIdAndUpdate: (id: string, data: T) => Promise<T | null>;
  findByIdAndDelete: (id: string) => Promise<T | null>;
};

const create =
  <T>(model: TModel<T>) =>
  async (data: T) =>
    model.create(data);

const readAll =
  <T>(model: TModel<T>) =>
  async () =>
    model.find();

const readOne =
  <T>(model: TModel<T>) =>
  async (id: string) => {
    if (!id) {
      throw new Error("не указан id");
    }
    return model.findById(id);
  };

const update =
  <T>(model: TModel<T>) =>
  async (id: string, data: any) => {
    return model.findByIdAndUpdate(id, data);
  };

const deleteOne =
  <T>(model: TModel<T>) =>
  async (id: string) => {
    if (!id) {
      throw new Error("не указан id");
    }
    return model.findByIdAndDelete(id);
  };

export const service = <T>(model: TModel<T>) => ({
  create: create(model),
  readAll: readAll(model),
  readOne: readOne(model),
  update: update(model),
  delete: deleteOne(model),
});
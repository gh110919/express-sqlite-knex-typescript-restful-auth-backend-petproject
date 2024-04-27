import { Request, Response } from "express";

export type TService<T> = {
  create: (data: T) => Promise<T>;
  readAll: () => Promise<T[]>;
  readOne: (id: string) => Promise<T | null>;
  update: (id: string, data: T) => Promise<T | null>;
  delete: (id: string) => Promise<T | null>;
};

const control = <T>(response: Response, data: Promise<T>) => {
  data
    .then((result) =>
      response.status(200).json({ success: true, message: result })
    )
    .catch((error) =>
      response.status(500).json({ success: false, message: error })
    );
};

const create =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T>(response, service.create(request.body));
  };

const readAll =
  <T>(service: TService<T>) =>
  async (_request: Request, response: Response) => {
    control<T[]>(response, service.readAll());
  };

const readOne =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(response, service.readOne(request.params.id));
  };

const update =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.update(request.body.id, request.body.data)
    );
  };

const deleteOne =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(response, service.delete(request.params.id));
  };

export const controller = <T>(service: TService<T>) => ({
  create: create(service),
  readAll: readAll(service),
  readOne: readOne(service),
  update: update(service),
  delete: deleteOne(service),
});
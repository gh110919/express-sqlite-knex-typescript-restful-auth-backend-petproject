import { Request, Response, Router } from "express";

export type TController = {
  create: (request: Request, response: Response) => Promise<void>;
  readAll: (request: Request, response: Response) => Promise<void>;
  readOne: (request: Request, response: Response) => Promise<void>;
  update: (request: Request, response: Response) => Promise<void>;
  delete: (request: Request, response: Response) => Promise<void>;
};

const routes = (router: Router, endpoint: string, controller: TController) => {
  return router
    .post(endpoint, controller.create)
    .get(endpoint, controller.readAll)
    .get(`${endpoint}/:id`, controller.readOne)
    .patch(endpoint, controller.update)
    .delete(`${endpoint}/:id`, controller.delete);
};

export const router = (endpoint: string, controller: TController) => {
  return routes(Router(), endpoint, controller);
};
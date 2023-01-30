import { GetCar, CreateCar, RemoveCar } from "./server/resolvers/car.resolver";

import {
  GetCompany,
  CreateCompany,
  RemoveCompany,
} from "./server/resolvers/company.resolver";

import { Arguments } from "./server/types/Arguments";

const resolvers = {
  Query: {
    GetCompany,
    GetCar,
  },
  Mutation: {
    async CreateCar(...[, payload]: Arguments) {
      return await CreateCar({
        name: payload.name,
        companyId: payload.companyId,
      });
    },

    async CreateCompany(...[, payload]: Arguments) {
      return await CreateCompany(payload);
    },

    async RemoveCompany(...[, payload]: Arguments) {
      return await RemoveCompany(payload);
    },

    async RemoveCar(...[, payload]: Arguments) {
      return await RemoveCar(payload.id);
    },
  },
};

export default resolvers;

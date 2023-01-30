import { PrismaClient } from "@prisma/client";
import { GetCompany } from "./company.resolver";

const prisma = new PrismaClient();
async function GetCar() {
  return await prisma.car.findMany();
}

async function CreateCar(car: { name: string; companyId: string }) {
  return await prisma.car.create({
    data: {
      name: car.name,
      companyId: car.companyId,
    },
  });
}

async function RemoveCar(carId: string) {
  return await prisma.car.delete({
    where: {
      id: carId,
    },
  });
}

export { GetCar, CreateCar, RemoveCar };

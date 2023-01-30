import { PrismaClient } from "@prisma/client";
import { Company } from "../types/Company";

const prisma = new PrismaClient();

async function CreateCompany(company: Company) {
  return prisma.company.create({
    data: {
      name: company.name,
      country: company.country,
      dateFoundation: company.dateFoundation,
    },
  });
}

async function GetCompany() {
  return await prisma.company.findMany();
}

async function RemoveCompany(company: { id: string }) {
  return prisma.company.delete({
    where: {
      id: company.id,
    },
  });
}

export { GetCompany, CreateCompany, RemoveCompany };

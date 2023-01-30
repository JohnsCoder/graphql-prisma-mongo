import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    GetCompany: [Company]!
    GetCar: [Car]!
    SelectCompany(name: String!): Company!
  }

  type test {
    saudacao: String!
  }

  type Company {
    id: String!
    name: String!
    country: String!
    dateFoundation: String!
  }

  type Car {
    id: String
    name: String!
    companyId: String
  }

  type Mutation {
    CreateCompany(
      name: String!
      country: String!
      dateFoundation: String!
    ): Company!
    UpdateCompany(
      id: String!
      name: String!
      country: String!
      dateFoundation: String!
    ): Company!
    RemoveCompany(id: String!): Company!
    CreateCar(name: String!, companyId: String!): Car!
    RemoveCar(id: String!): Car!
  }
`;

export default typeDefs;

import { ApolloServer, gql } from "apollo-server";
import resolvers from "../resolvers";
import typeDefs from "../schemas";
import { Arguments } from "../server/types/Arguments";
describe("testing server operation routes", () => {
  const serverTest = new ApolloServer({
    resolvers,
    typeDefs,
  });

  test("test create company route", async () => {
    const executeTest = await serverTest.executeOperation({
      query:
        "mutation CreateCompany ($name: String!, $country: String!, $dateFoundation: String!) {CreateCompany (name: $name, country: $country, dateFoundation: $dateFoundation) {name country dateFoundation}}",
      variables: {
        name: "value1",
        country: "value2",
        dateFoundation: "value3",
      },
    });
    expect(executeTest.errors).toBeUndefined();
    expect(executeTest.data?.CreateCompany).toEqual({
      name: "value1",
      country: "value2",
      dateFoundation: "value3",
    });
  });


  
  let companyId: string;
  test("test get company route", async () => {
    const executeTest = await serverTest.executeOperation({
      query:
        "query CompaniesAndCars { GetCompany { id name country dateFoundation}}",
    });

    expect(executeTest.errors).toBeUndefined();

    expect(
      executeTest.data?.GetCompany[executeTest.data.GetCompany.length - 1]
    ).toEqual({
      id: executeTest.data?.GetCompany[executeTest.data.GetCompany.length - 1]
        .id,
      name: "value1",
      country: "value2",
      dateFoundation: "value3",
    });
    return (companyId =
      executeTest.data?.GetCompany[executeTest.data.GetCompany.length - 1].id);
  });

  test("test create car route", async () => {
    const executeTest = await serverTest.executeOperation({
      query:
        "mutation CreateCar($name: String!, $companyId: String!) { CreateCar (name: $name, companyId: $companyId) { name companyId }}",
      variables: {
        name: "value1",
        companyId: companyId,
      },
    });
    expect(executeTest.errors).toBeUndefined();
    expect(executeTest.data?.CreateCar).toEqual({
      name: "value1",
      companyId: companyId,
    });
  });
  let carId: string;
  test("test get car route", async () => {
    const executeTest = await serverTest.executeOperation({
      query: "query CompaniesAndCars { GetCar { id name companyId}}",
    });

    expect(executeTest.errors).toBeUndefined();

    expect(
      executeTest.data?.GetCar[executeTest.data.GetCar.length - 1]
    ).toMatchObject({
      id: executeTest.data?.GetCar[executeTest.data.GetCar.length - 1].id,
      name: "value1",
      companyId: companyId,
    });

    return (carId =
      executeTest.data?.GetCar[executeTest.data.GetCar.length - 1].id);
  });

  test("test delete car route", async () => {
    const executeTest = await serverTest.executeOperation({
      query:
        "mutation RemoveCar($id: String!) { RemoveCar(id: $id) {id name companyId}}",
      variables: {
        id: carId,
      },
    });

    expect(executeTest.errors).toBeUndefined();

    expect(executeTest.data?.RemoveCar).toMatchObject({
      id: executeTest.data?.RemoveCar.id,
      name: "value1",
      companyId: companyId,
    });
  });

  test("test delete company route", async () => {
    const executeTest = await serverTest.executeOperation({
      query:
        "mutation RemoveCompany($id: String!) { RemoveCompany(id: $id) {id name country dateFoundation}}",
      variables: {
        id: companyId,
      },
    });

    expect(executeTest.errors).toBeUndefined();

    expect(executeTest.data?.RemoveCompany).toMatchObject({
      id: executeTest.data?.RemoveCompany.id,
      name: "value1",
      country: "value2",
      dateFoundation: "value3",
    });
  });
});

import { ApolloServer } from "apollo-server";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schemas";

(async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server
    .listen()
    .then(({ url }) => console.log(`Server running on ${url}`));
})();

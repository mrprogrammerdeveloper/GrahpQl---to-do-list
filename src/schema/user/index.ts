import { ApolloServer } from "@apollo/server" ;
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./typeDefs/user";
import { resolvers } from "./resolvers/user";
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
    schema : buildSubgraphSchema([
        {typeDefs , resolvers}
    ])  
})
// const url =  startStandaloneServer(server ,{listen : {port :4001 }})
// console.log(url)

const main = async()=>{
    const url = await startStandaloneServer(server ,{listen : {port :4001 }})
    console.log(url)
}

main()
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./typeDefs/taskTypeDefs";
import { resolvers } from "./resolvers/taskResolver";
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
    schema : buildSubgraphSchema([
        { typeDefs, resolvers}
    ]),
    
})

const main = async()=>{
    const url = await startStandaloneServer(server , {listen : {port :4003 } , context :async({req})=>{
        const auth = req.headers.authorization || ''
        const token = auth?.replace('Bearer' , '')
        return {token}
    }  })
    console.log(url)
}
main()
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, GatewayConfig, GraphQLDataSourceProcessOptions, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { configDotenv } from "dotenv";
interface GatewayContext{
    token ?: String
}

class authorization extends RemoteGraphQLDataSource<GatewayContext>{
    willSendRequest({request , context}:{request : any , context:GatewayContext}): void | Promise<void> {
        if(context.token){
            request.http.headers.set('authorization' , context.token)
        }
    }
}


const gateway = new ApolloGateway({
    supergraphSdl:new IntrospectAndCompose({
        subgraphs:[
            {name : 'task' , url : "http://localhost:4003"},
            {name : 'user' , url : "http://localhost:4001"}
            
        ]
        
    }),
    buildService({name , url}){
        return new authorization({url})
    }
})
const server = new ApolloServer({gateway})
const main = async()=>{
    const url = await startStandaloneServer(server , {listen : {port :4000 } , context :async({req})=>{
            const auth = req.headers.authorization || ''
            const token = auth?.replace('Bearer' , '')
            return {token}
        }  })
        console.log(url)
}
main()


import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";


async function startServer(){
    const app = express();

    const typeDefs = `

    type User {
    id: ID!
    name:String!
    username:String!
    email:String!
    phone:String!
    website:String!
    todos:[Todo]
    }

    type Todo {
    id: ID!
    title:String!
    completed:Boolean
    user:User
    }

    type Query {
    getTodos:[Todo]
    getAllUsers:[User]
    getUserById(id:ID!):User
    }

    type Mutation {
    
    createTodo(title:String! , userId:ID!): Todo
    }
    `
    const resolvers = {
        Query:{
            getTodos:async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

            getAllUsers:async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
            getUserById :async (_, { id }) => {
                const user = (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data;
                const todos = (await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)).data;
                return { ...user, todos };
            }
        },
        Mutation:{
            createTodo:async (_ , {title , userId})=>{
                const response = await axios.post("https://jsonplaceholder.typicode.com/todos" , {
                    title,
                    userId,
                    completed:false
                })
                return response.data;
            }
        }
    }
    const server = new ApolloServer({typeDefs , resolvers}) 



  await server.start()
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/graphql" , expressMiddleware(server))
    app.listen(8000 , ()=>{
        console.log(`Server is running at port number http://localhost:8000/graphql`)
    })
}

startServer()
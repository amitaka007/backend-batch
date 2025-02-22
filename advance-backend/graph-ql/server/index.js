import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

async function startServer() {
    const app = express();

    const typeDefs = `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
            todos: [Todo]
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }

        type Mutation {
            createTodo(title: String!, userId: ID!): Todo
            updateTodo(id: ID!, title: String, completed: Boolean): Todo
            deleteTodo(id: ID!): String
        }
    `;

    const resolvers = {
        Query: {
            getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
            getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
            getUser: async (_, { id }) => {
                const user = (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data;
                const todos = (await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)).data;
                return { ...user, todos };
            }
        },
        Mutation: {
            createTodo: async (_, { title, userId }) => {
                const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                    title,
                    userId,
                    completed: false
                });
                return response.data;
            },
            updateTodo: async (_, { id, title, completed }) => {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    title,
                    completed
                });
                return response.data;
            },
            deleteTodo: async (_, { id }) => {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
                return `Todo with ID ${id} deleted successfully.`;
            }
        },
        User: {
            todos: async (parent) => (await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${parent.id}`)).data,
        }
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started at http://localhost:8000/graphql");
    });
}

startServer();

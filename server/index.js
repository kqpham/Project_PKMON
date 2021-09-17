const connectDB = require('./db');
const express = require("express");
const path = require("path");
const http = require("http");
require('dotenv').config()
const { join } = require("path");


const pubsub = new PubSub ();
const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req })=> ({req, pubsub}) 
});
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err =>{
    console.error(err);
  });

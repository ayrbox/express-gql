const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const postSchema = require('./postSchema');

const PORT = 3030;

const app = express();


app.use('/graphql', graphqlHTTP({
    schema: postSchema,
    graphiql: true,
}))


app.listen(PORT, () => {
    console.log(`App is listenning to port ${PORT}`);
});


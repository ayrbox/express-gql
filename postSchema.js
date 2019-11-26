const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Flavio'
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Roger'
  }
]

const authors = {
  'Flavio': {
    name: 'Flavio',
    age: 36
  },
  'Roger': {
    name: 'Roger',
    age: 7
  }
}

const postAuthorType =  new GraphQLObjectType({
  name: 'PostAuthor',
  fields: {
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
  }
})


const authorType =  new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    posts: {
        type: new GraphQLList(postAuthorType),
        resolve: (source, params) => {
            return posts.filter(post => post.author === source.name)
        }
    }
  }
})

const postType =  new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    author: {
      type: authorType,
      resolve: (source, params) => {
        return authors[source.author]
      }
    }
  }
})


const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
        return posts[id]
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      }
    },
    authors: {
        type: new GraphQLList(authorType),
        resolve: () => {
            return Object.keys(authors).map(name => authors[name]);
        }
    }
  }
})


const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema
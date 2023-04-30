module.exports = {
    components: {
        securitySchemes: {
            ApiKeyAuth: {
              type: "apiKey",
              name: "Authorization",
              in: "header"
            }
        },      
        schemas: {  //Schemas can be models but also e.g. recycling ID
            post: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "Unique id",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    title: {
                        type: 'string',
                        description: "The title of the post. Required.",
                        example: "Morning coffee"
                    },
                    body: {
                        type: 'string',
                        description: 'The body of the post. Required.',
                        example: 'Isn\'t it wonderful to wake up to the smell of fresh coffee in the morning!'
                    },
                    image: {
                        type: 'string',
                        description: 'Image URL to go with the post.',
                        example: 'coffee.jpg'
                    },
                    likes: {
                        type: 'array',
                        description: 'Document array that stores the unique id of the person who liked the post and a reference to user collection in objects',
                        example: '["64463b390c94b93e17bea623", "644a60c9b0528ff6aedef37a"]'
                    },
                    userId: {
                        type: 'object',
                        description: 'Stores the unique id of the post\'s author and a reference to user collection',
                        example: '6448f89564e3345d4c84a314'
                    },
                    commentIds: {
                        type: 'array',
                        description: 'Document array that stores the unique id of each comment on the post  and a reference to comment collection in objects',
                        example: '6449329631f153e2c86aacad'
                    }
                },

            },

            PostInput: {   //Whatever must be posted through req.body or form data
                type: 'object',
                properties: {
                    // userID: {
                    //     type: 'objectId'
                    //     description: ''
                    // }
                    title: {
                        type: 'string',
                        description: "The title of the post",
                        example: "Morning coffee"
                    },
                    body: {
                        type: 'string',
                        description: 'The body of the post.',
                        example: 'Isn\'t it wonderful to wake up to the smell of fresh coffee in the morning!'
                    },
                    image: {
                        type:'file',
                        description: 'Image URL to go with the post.',
                        example: 'coffee.jpg'
                    }

                }
            },
            _id:{
                type:'objectId',
                description:"Unique id of the post",
                example: "6444f9a6c138bf091c8ae17b"
            },

        }

    }

}
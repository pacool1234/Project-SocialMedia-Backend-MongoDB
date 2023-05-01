module.exports = {
    paths: {
        '/posts/getAll': {  //FULL path after port (from index + endpoint)
            get: {  //CRUD
                tags: {
                    Posts: 'Get Tasks',
                },
                description: 'Get tasks populated with Usernames and Comments from their respective collections',
                operationId: 'getTasks',   //Copy of “Tasks” but together
                parameters: [],
                responses: {
                    200: {
                        description: 'All posts populated with username and comments',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/posts/getAllWithLikesAndComments': {  //FULL path after port (from index + endpoint)
            get: {  //CRUD
                tags: {
                    Posts: 'Get all the information',
                },
                description: 'Get tasks with all relevant information from other collections too.',
                operationId: 'getAllTheInformation',   
                parameters: [],
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },

        '/posts/getAndLimit': {
            get: {
                tags: {
                    Posts: 'Get ten tasks',
                },
                description: 'Shows 10 tasks at a time. Query parameters can be used to change the number of tasks returned and number of tasks skipped.',
                operationId: 'getTenTasks',
                parameters: [{
                    in: 'query',
                    name: 'page',
                    schema: {
                        type: 'integer'
                    },
                    description: 'Default 0. Number of sets to skip.',
                },
                {
                    in: 'query',
                    name: 'limit',
                    schema: {
                        type: 'integer'
                    },
                    description: 'Default 10. Number of items to return.',
                }
                ],
                responses: {
                    200: {
                        description: 'You are on page (xxx) of posts.',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },

        '/posts/getById/{_id}': {  
            get: {  
                tags: {
                    Posts: 'Get By Id',
                },
                description: 'Get post with specific id',
                operationId: 'getById',  
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/_id',
                            type: 'string'
                        },
                        description: 'Id of the post',
                    },

                ],
                responses: {
                    200: {
                        description: 'One post populated with information from Users and Comments collections',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },

        '/posts/getByTitle/{title}': {  
            get: {
                tags: {
                    Posts: 'Get By Title',
                },
                description: 'Search posts by title',
                operationId: 'getByTitle',
                parameters: [
                    {
                        name: 'title',
                        in: 'query',
                        schema: {
                            $ref: '#/components/schemas/PostInput/properties/title',
                            type: 'string'
                        },
                        description: 'Title or partial title of the post',
                    },

                ],
                responses: {
                    200: {
                        description: 'All posts that match the search',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },

        '/posts/getUsersPosts': { 
            get: {
                security: [{
                    ApiKeyAuth: []
                  }],    
                tags: {
                    Posts: 'Posts by User',
                },
                description: 'Gets the posts of the user currently logged in. Requires authentication',
                operationId: 'PostsByUser',   
                parameters: [
                        {
                            name: '_id',
                            in: 'path',
                            schema: {
                                $ref: '#/components/schemas/_id',
                                type: 'string'
                            },
                            description: 'Id of the post',
                        },
                ],
                responses: {
                    200: {
                        description: 'All posts populated with information from Users and Comments collections. Sorted from newest to oldest.',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/posts/FriendsPosts': { 
            get: {
                security: [{
                    ApiKeyAuth: []
                  }],    
                tags: {
                    Posts: 'Friends posts',
                },
                description: 'Gets the posts of the people the user is following. User must be logged in',
                operationId: 'friendsPosts',   
                responses: {
                    200: {
                        description: 'Posts from people the user follows',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/posts/create': {
            post: {
                tags: {
                    Posts: 'Create post',
                },

                description: 'Create post',
                operationId: 'createPost',   //Copy of “Tasks” but together
                parameters: [],
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                $ref: '#/components/schemas/PostInput',
                            },
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'All posts populated with username and comments',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },

            }
        },
        '/posts/update/{_id}': {
            put: {
                security: [{
                ApiKeyAuth: []
              }],      
                tags: {
                    Posts: 'Update by Id',
                },

                description: 'Update post by Id - Note that a middleware is used to check if the user\'s id matches the post\'s creator\'s id (isAuthor).',
                operationId: 'updateById',   
                parameters:  [
                    {
                        name: '_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/_id',
                            type: 'string'
                        },
                        description: 'Id of the post',
                    },

                ],
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                $ref: '#/components/schemas/PostInput',
                            },
                        },
                    }
                },
                responses: {
                    200: {
                        description: 'Post updated',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },

            }
        },
        '/posts/likePost/{_id}': {
            put: {
                security: [{
                ApiKeyAuth: []
              }],      
                tags: {
                    Posts: 'Like a Post',
                },

                description: 'Like a post. Authentication required.',
                operationId: 'likeAPost',   
                parameters:  [
                    {
                        name: '_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/_id',
                            type: 'string'
                        },
                        description: 'Id of the post',
                    },

                ],
                responses: {
                    200: {
                        description: 'You have liked this post',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },
            }
        },
        '/posts/unlikePost/{_id}': {
            put: {
                security: [{
                ApiKeyAuth: []
              }],      
                tags: {
                    Posts: 'Unike a Post',
                },

                description: 'Removes your like from a post. Authentication required.',
                operationId: 'unlikeAPost',   
                parameters:  [
                    {
                        name: '_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/_id',
                            type: 'string'
                        },
                        description: 'Id of the post',
                    },

                ],
                responses: {
                    200: {
                        description: 'You\'ve unliked the post.',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                  400: {
                    description: 'Cannot unlike a post you haven\'t liked'
                  }  
                },
            }
        },

        '/posts/delete/{_id}': {
            put: {
                security: [{
                ApiKeyAuth: []
              }],      
                tags: {
                    Posts: 'Delete by Id',
                },

                description: 'Delete post by Id - Note that a middleware is used to check if the user\'s id matches the post\'s creator\'s id (isAuthor).',
                operationId: 'deleteById',  
                parameters:  [
                    {
                        name: '_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/_id',
                            type: 'string'
                        },
                        description: 'Id of the post',
                    },

                ],
                responses: {
                    200: {
                        description: 'Post deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/post',
                                },
                            },
                        },
                    },
                },

            }
        }
    }
}

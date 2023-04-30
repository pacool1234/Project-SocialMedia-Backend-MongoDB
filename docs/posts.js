module.exports = {
    paths: {
        "/posts/getAll": {  //FULL path after port (from index + endpoint)
          get: {  //CRUD
            tags: {
              Posts: "Get Tasks",
            },
            description: "Get tasks",
            operationId: "getTasks",   //Copy of “Tasks” but together
            parameters: [],
            responses: {
              200: {
                description: "All posts populated with username and comments",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/post",
                    },
                  },
                },
              },
            },
          }
        //   {   }  MORE GETS HERE
        },
        '/posts/create': {
            post: {
                tags: {
                    Posts: "Create post",
                },
            
                  description: "Create post",
                  operationId: "createPost",   //Copy of “Tasks” but together
                  parameters: [],
                  requestBody: {
                    content:  {
                        'multipart/form-data': {
                            schema: {
                                $ref: "#/components/schemas/PostInput",
                              },
                        }
                    }
                  },
                  responses: {
                    200: {
                      description: "All posts populated with username and comments",
                      content: {
                        "application/json": {
                          schema: {
                            $ref: "#/components/schemas/post",
                          },
                        },
                      },
                    },
                  },
            
            }
        }
    }
}

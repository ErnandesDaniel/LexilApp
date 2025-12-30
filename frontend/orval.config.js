module.exports = {
    'ai-graph-chat':{
        input:"../docs/modules/api/attachments/openapi.yaml",
        output:{
            client:"react-query",
            mock:true,
            override:{
                mutator:{
                    name:'customInstance',
                    path: './src/api/axiosClient.ts'
                }
            },
            schemas:'./src/api/dto',
            target:'./src/api/index.ts',
        }
    }
}
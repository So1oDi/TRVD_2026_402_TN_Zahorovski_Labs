import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'D&D Character Manager API',
            version: '1.0.0',
            description: 'API для керування персонажами, сесіями та homebrew-контентом D&D',
        },
        servers: [{ url: 'http://localhost:5000/api' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                CharacterResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        level: { type: 'number' },
                        current_hp: { type: 'number' },
                        max_hp: { type: 'number' },
                        armor_class: { type: 'number' },
                        stats: { type: 'object' },
                        experience_points: { type: 'number' },
                        race_name: { type: 'string' },
                        class_name: { type: 'string' },
                        user_id: { type: 'string' },
                        session_id: { type: 'string' },
                    },
                },
                SessionResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        invite_code: { type: 'string' },
                        is_active: { type: 'boolean' },
                        dm_id: { type: 'string' },
                        dm_name: { type: 'string' },
                        participants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    display_name: { type: 'string' },
                                },
                            },
                        },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                RaceResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        speed: { type: 'number' },
                        traits: { type: 'object' },
                        is_homebrew: { type: 'boolean' },
                        creator_id: { type: 'string' },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);
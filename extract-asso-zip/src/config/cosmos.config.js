import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.COSMOS_ENDPOINT);

export const cosmosConfig = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    database: process.env.COSMOS_DATABASE,
    container: process.env.COSMOS_CONTAINER
};
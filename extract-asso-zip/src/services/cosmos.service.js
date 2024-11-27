import { CosmosClient } from '@azure/cosmos';
import { cosmosConfig } from '../config/cosmos.config.js';
import { logger } from '../utils/logger.js';

class CosmosService {
    constructor() {
        this.client = new CosmosClient({
            endpoint: cosmosConfig.endpoint,
            key: cosmosConfig.key
        });
        this.database = this.client.database(cosmosConfig.database);
        this.container = this.database.container(cosmosConfig.container);
    }

    async upsertItem(item) {
        try {
            const { resource } = await this.container.items.upsert(item);
            logger.info(`Upserted item with id: ${resource.id}`);
            return resource;
        } catch (error) {
            logger.error(`Error upserting item: ${error.message}`);
            throw error;
        }
    }

    async deleteItem(id, partitionKey) {
        try {
            await this.container.item(id, partitionKey).delete();
            logger.info(`Deleted item with id: ${id}`);
        } catch (error) {
            logger.error(`Error deleting item: ${error.message}`);
        }
    }

    async getItemByWin(win) {
        try {
            const querySpec = {
                query: "SELECT * FROM c WHERE c.win = @win",
                parameters: [
                    {
                        name: "@win",
                        value: win
                    }
                ]
            };

            const { resources: existingItem } =  await this.container.items.query(querySpec)
                .fetchAll();
            logger.info(`Get item with id: ${win}`);
            return existingItem
        } catch (error) {
            logger.error(`Error getting item: ${error.message}`);
            throw error;
        }
    }

    async getAllWinIDs() {
        try {
            logger.info(`Get all win id's`);
            const querySpec = {
                query: "SELECT * FROM c"
            };

            return await this.container.items.query(querySpec)
                .fetchAll();
        } catch (error) {
            logger.error(`Error getting item: ${error.message}`);
            throw error;
        }
    }

}

export const cosmosService = new CosmosService();
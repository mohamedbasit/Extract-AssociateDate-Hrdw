import { cosmosService } from '../services/cosmos.service.js';
import { logger } from '../utils/logger.js';
import { errorUtils } from '../utils/error.utils.js';
import { appConfig } from '../config/app.config.js';

class BatchProcessor {
    async processBatch(batch, batchNumber) {
        logger.info(`Processing batch ${batchNumber} with ${batch.length} records`);

        const operationGroups = this.groupByOperation(batch);

        await Promise.all([
            this.processInsertUpdates(operationGroups.i),
            this.processInsertUpdates(operationGroups.u),
            this.processDeletes(operationGroups.d)
        ]);
    }

    groupByOperation(batch) {
        return batch.reduce((groups, record) => {
            const operation = record.indicator.toLowerCase();
            if (['i', 'u', 'd'].includes(operation)) {
                groups[operation].push(record);
            }
            return groups;
        }, { i: [], u: [], d: [] });
    }

    async processInsertUpdates(records) {
        if (records.length === 0) return;

        for (let i = 0; i < records.length; i += appConfig.chunkSize) {
            const chunk = records.slice(i, i + appConfig.chunkSize);
            await Promise.all(
                chunk.map(record =>{
                    logger.info(`Insert/ Update ----------------> ${record.win}`);
                    cosmosService.upsertItem(record)
                       .catch(error => errorUtils.handleOperationError(record, error))
                }
                )
            );
        }
    }

    async processDeletes(records) {
        if (records.length === 0) return;

        for (let i = 0; i < records.length; i += appConfig.chunkSize) {
            const chunk = records.slice(i, i + appConfig.chunkSize);
            await Promise.all(
                chunk.map(async record => {
                    logger.info(`Delete ----------------> ${record.win}`)

                    const existingItem = await cosmosService.getItemByWin(record.id);
                    if (existingItem && existingItem.length) {
                        return cosmosService.deleteItem(existingItem[0].id, record.win)
                            .catch(error => errorUtils.handleOperationError(record, error))

                    } else {
                        logger.info(`Item does not exist ${record.id} in cosmos db`);
                        return Promise.resolve(false);
                    }

                }
                )
            );
        }
    }
}

export const batchProcessor = new BatchProcessor();
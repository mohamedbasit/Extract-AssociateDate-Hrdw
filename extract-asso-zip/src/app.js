import { csvService } from './services/csv.service.js';
import { errorUtils } from './utils/error.utils.js';
import { logger } from './utils/logger.js';
import { appConfig } from './config/app.config.js';
import { cosmosService } from './services/cosmos.service.js';

async function startApplication() {
    try {
        await csvService.processFile(appConfig.csvFilePath);
        logger.info('Application started successfully');
    } catch (error) {
        logger.error('Error starting application:', error);
        process.exit(1);
    }
}


//If you want to clear the whole container
async function deleteAllDataInContainer() {

    const { resources: items }  = await cosmosService.getAllWinIDs();
    logger.info(`Items to be deleted : ${items?.length}`)
    items.forEach(async item => {
        const res = await cosmosService.deleteItem(item.id, item.win);
    });
    
    
}

startApplication();
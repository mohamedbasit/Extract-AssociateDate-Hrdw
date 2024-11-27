import { cosmosService } from './services/cosmos.service.js';

//If you want to clear the whole container
async function deleteAllDataInContainer() {

    const { resources: items }  = await cosmosService.getAllWinIDs();
    logger.info(`Items to be deleted : ${items?.length}`)
    items.forEach(async item => {
        const res = await cosmosService.deleteItem(item.id, item.win);
    });
    
    
}

deleteAllDataInContainer();
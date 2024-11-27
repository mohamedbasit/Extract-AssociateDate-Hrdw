import { logger } from './logger.js';
import { appConfig } from '../config/app.config.js';
import fs from 'fs';

class ErrorUtils {
    handleOperationError(record, error) {
        logger.error(`Operation failed for record ${record.id}:`, error);
        this.logFailedRecord(record, error);
    }

    logFailedRecord(record, error) {
        const failedRecord = {
            timestamp: new Date().toISOString(),
            record: record,
            error: error.message
        };

        if(appConfig.enableFileLogForFailedRecords){
        fs.appendFileSync(
            'failed_records.log',
            JSON.stringify(failedRecord) + '\n'
        );
    }
    }

    async retryFailedRecords() {
        // Implementation of retry logic
    }
}

export const errorUtils = new ErrorUtils();
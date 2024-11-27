console.log(typeof process.env.ENABLE_FILE_LOG_FOR_FAILED_RECORDS );

export const appConfig = {
    batchSize: process.env.BATCH_SIZE,
    retryAttempts: 3,
    chunkSize: process.env.CHUNK_SIZE,
    csvFilePath: process.env.CSV_FILE_PATH,
    enableFileLogForFailedRecords: process.env.ENABLE_FILE_LOG_FOR_FAILED_RECORDS === "true" ? true : false
};
import fs from 'fs';
import csv from 'csv-parser';
import { Transform } from 'stream';
import { Employee } from '../models/employee.model.js';
import { batchProcessor } from '../processors/batch.processor.js';
import { logger } from '../utils/logger.js';
import { appConfig } from '../config/app.config.js';

class CSVService {
    async processFile(filePath) {
        try {
            logger.info('Starting CSV processing');
            console.time('Processing Time');

            const batchTransform = this.createBatchTransform();
            await this.streamCSV(filePath, batchTransform);

            console.timeEnd('Processing Time');
            logger.info('CSV processing completed');
        } catch (error) {
            logger.error('Error processing CSV:', error);
            throw error;
        }
    }

    createBatchTransform() {
        let currentBatch = [];
        let totalProcessed = 0;
        let batchNumber = 0;

        return new Transform({
            objectMode: true,
            transform: async (chunk, encoding, callback) => {
                try {
                    currentBatch.push(new Employee(chunk));

                    if (currentBatch.length >= appConfig.batchSize) {
                        await batchProcessor.processBatch(currentBatch, ++batchNumber);
                        totalProcessed += currentBatch.length;
                        currentBatch = [];
                        logger.info(`Processed ${totalProcessed} records`);
                    }
                    callback();
                } catch (error) {
                    callback(error);
                }
            },
            flush: async (callback) => {
                try {
                    if (currentBatch.length > 0) {
                        await batchProcessor.processBatch(currentBatch, ++batchNumber);
                        totalProcessed += currentBatch.length;
                        logger.info(`Processed ${totalProcessed} records`);
                    }
                    callback();
                } catch (error) {
                    callback(error);
                }
            }
        });
    }

    async streamCSV(filePath, transform) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .pipe(transform)
                .on('error', reject)
                .on('finish', resolve);
        });
    }
}

export const csvService = new CSVService();
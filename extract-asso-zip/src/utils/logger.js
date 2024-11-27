import winston from 'winston';
const { combine, timestamp, printf, colorize, align, errors } = winston.format;

// Custom colors configuration
const customColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'cyan'
};
// Add colors to winston
winston.addColors(customColors);

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
    // Handle errors with stack traces
    if (stack) {
        return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    
    // Format metadata if present
    const meta = Object.keys(metadata).length ? 
        `\n${JSON.stringify(metadata, null, 2)}` : '';

    // Format objects in message
    const formattedMessage = typeof message === 'object' ? 
        JSON.stringify(message, null, 2) : message;

    return `${timestamp} ${level}: ${formattedMessage}${meta}`;
});


export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    },
    format: combine(
        errors({ stack: true }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        align(),
        logFormat
    ),
    transports: [
        // Console Transport with colors
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss.SSS'
                }),
                align(),
                logFormat
            )
        }),
    ],
     // Prevent logger from exiting on error
     exitOnError: false
});

// Development logging helper
if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logger initialized in development mode');
}
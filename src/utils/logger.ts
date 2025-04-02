import chalk from 'chalk';

/**
 * Log levels
 */
export const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SUCCESS: 4,
  NONE: 5
} as const

type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

/**
 * Logger configuration
 */
export type LoggerConfig = {
  level: LogLevel;
  timestamps: boolean;
  colors: boolean;
}

/**
 * Simple logger utility
 */
class Logger {
  private config: LoggerConfig = {
    level: LOG_LEVEL.INFO,
    timestamps: true,
    colors: true
  };

  /**
   * Configure the logger
   * 
   * @param config Logger configuration
   */
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Format a log message
   * 
   * @param level Log level
   * @param message Message to log
   * @param args Additional arguments
   * @returns Formatted log message
   */
  private format(level: LogLevel, message: string, args: any[]): string {
    let prefix = '';
    
    if (this.config.timestamps) {
      prefix += `[${new Date().toISOString()}] `;
    }
    
    switch (level) {
      case LOG_LEVEL.DEBUG:
        prefix += this.config.colors ? chalk.gray('[DEBUG] ') : '[DEBUG] ';
        break;
      case LOG_LEVEL.INFO:
        prefix += this.config.colors ? chalk.blue('[INFO] ') : '[INFO] ';
        break;
      case LOG_LEVEL.WARN:
        prefix += this.config.colors ? chalk.yellow('[WARN] ') : '[WARN] ';
        break;
      case LOG_LEVEL.ERROR:
        prefix += this.config.colors ? chalk.red('[ERROR] ') : '[ERROR] ';
        break;
      case LOG_LEVEL.SUCCESS:
        prefix += this.config.colors ? chalk.green('[SUCCESS] ') : '[SUCCESS] ';
        break;
    }
    
    let formattedMessage = prefix + message;
    
    if (args.length > 0) {
      formattedMessage += ' ' + args.map(arg => {
        if (arg instanceof Error) {
          return arg.stack || arg.message;
        } else if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        } else {
          return String(arg);
        }
      }).join(' ');
    }
    
    return formattedMessage;
  }

  /**
   * Log a debug message
   * 
   * @param message Message to log
   * @param args Additional arguments
   */
  debug(message: string, ...args: any[]): void {
    if (this.config.level <= LOG_LEVEL.DEBUG) {
      console.debug(this.format(LOG_LEVEL.DEBUG, message, args));
    }
  }

  /**
   * Log an info message
   * 
   * @param message Message to log
   * @param args Additional arguments
   */
  info(message: string, ...args: any[]): void {
    if (this.config.level <= LOG_LEVEL.INFO) {
      console.info(this.format(LOG_LEVEL.INFO, message, args));
    }
  }

  /**
   * Log a warning message
   * 
   * @param message Message to log
   * @param args Additional arguments
   */
  warn(message: string, ...args: any[]): void {
    if (this.config.level <= LOG_LEVEL.WARN) {
      console.warn(this.format(LOG_LEVEL.WARN, message, args));
    }
  }

  /**
   * Log an error message
   * 
   * @param message Message to log
   * @param args Additional arguments
   */
  error(message: string, ...args: any[]): void {
    if (this.config.level <= LOG_LEVEL.ERROR) {
      console.error(this.format(LOG_LEVEL.ERROR, message, args));
    }
  }

  /**
   * Log a success message
   * 
   * @param message Message to log
   * @param args Additional arguments
   */
  success(message: string, ...args: any[]): void {
    if (this.config.level <= LOG_LEVEL.SUCCESS) {
      console.log(this.format(LOG_LEVEL.SUCCESS, message, args));
    }
  }
}

export const logger = new Logger();

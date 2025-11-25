import * as FileSystem from 'expo-file-system/legacy';

const LOG_FILE_URI = (FileSystem.documentDirectory || '') + 'logs.txt';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

class Logger {
  private static instance: Logger;

  private constructor() {
    // call async initializer without leaving a floating promise
    void this.ensureLogFileExists();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async ensureLogFileExists() {
    const fileInfo = await FileSystem.getInfoAsync(LOG_FILE_URI);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(LOG_FILE_URI, '');
    }
  }

  private async appendLog(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;

    console.log(logEntry.trim()); // Also log to console for development

    try {
      await this.ensureLogFileExists();
      const currentContent = await FileSystem.readAsStringAsync(LOG_FILE_URI);
      await FileSystem.writeAsStringAsync(LOG_FILE_URI, currentContent + logEntry);
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  public async debug(message: string): Promise<void> {
    await this.appendLog('DEBUG', message);
  }

  public async info(message: string): Promise<void> {
    await this.appendLog('INFO', message);
  }

  public async warn(message: string): Promise<void> {
    await this.appendLog('WARN', message);
  }

  public async error(message: string): Promise<void> {
    await this.appendLog('ERROR', message);
  }

  public async getLogs(): Promise<string> {
    try {
      await this.ensureLogFileExists();
      return await FileSystem.readAsStringAsync(LOG_FILE_URI);
    } catch (error) {
      console.error('Failed to read logs:', error);
      return '';
    }
  }

  public async clearLogs() {
    try {
      await FileSystem.writeAsStringAsync(LOG_FILE_URI, '');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }
}

export default Logger.getInstance();

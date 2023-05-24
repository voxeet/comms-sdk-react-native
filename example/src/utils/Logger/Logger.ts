// Logger.ts

class Logger {
  private logs: string[];
  private logNumber: number;
  public onUpdate?: (logs: string[]) => void;

  private static _instance: Logger;

  constructor() {
    this.logs = [];
    this.logNumber = 0;
  }

  public static getInstance(): Logger
  {
      if (Logger._instance == null)
      {
        Logger._instance = new Logger();
      }
      return this._instance;
  }

  public getLogs(): string[]
  {
      return this.logs;
  }

  public static log(message: string, other?: string): void {
    Logger.getInstance().log(message, other);
  }

  public log(message: string, other: string = ''): void {
       console.log(`[LOG ${this.logNumber}] ${message}\n${other}`);
       this.addLog(`[LOG ${this.logNumber}] ${message}\n${other}`);
       this.logNumber++;
   }

  private addLog(log: string): void {
    const logs = this.getLogs()
    logs.unshift(log);
    if (this.onUpdate != undefined) {
        this.onUpdate([...logs]);
    }
  }
}

export default Logger;
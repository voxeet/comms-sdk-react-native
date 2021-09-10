export default class Logger {
  static info(message: string) {
    console.log(`[INFO] DolbyIAPI SDK ${message}`);
  }
  static error(message: string) {
    console.log(`[ERROR]] DolbyIAPI SDK ${message}`);
  }
  static warning(message: string) {
    console.log(`[WARNING]] DolbyIAPI SDK ${message}`);
  }
}

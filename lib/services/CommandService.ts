import { Conference } from "./conference";

export default class CommandService {
  
  public async send(conference: Conference, message: string): Promise<boolean> {
    throw "not implemented";
  }
}
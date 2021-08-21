import { Conference } from "./conference";
export default class CommandService {
    send(conference: Conference, message: string): Promise<boolean>;
}

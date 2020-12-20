import ConferenceUser from "../types/ConferenceUser";
export default class SessionService {
    open: (participant: ConferenceUser) => Promise<boolean>;
    close: () => Promise<boolean>;
}

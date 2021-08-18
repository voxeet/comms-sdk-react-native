export default class NotificationService {
  

  public async subscribe(subscriptions: Subscription[]): Promise<boolean> {
    throw "not implemented";
  }

  public async unsubscribe(subscriptions: Subscription[]): Promise<boolean> {
    throw "not implemented";
  }

  public async invite(conference: Conference, participants: ParticipantInfo): Promise<boolean> {
    throw "not implemented";
  }

  public async inviteWithPermissions(conference: Conference, participants: ParticipantInvited): Promise<boolean> {
    throw "not implemented";
  }

  public async decline(conference: Conference): Promise<boolean> {
    throw "not implemented";
  }
}
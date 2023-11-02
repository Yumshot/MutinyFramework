import { INotification } from "config/interfaces/INotification";

export class CreateNotification {
  constructor(notification: INotification) {
    emit("clientNotify", notification);
  }
}

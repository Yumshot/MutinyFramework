export type NotificationPositionType =
  | "bottom-right"
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-left"
  | "bottom-center";

export type NotificationColorType =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "dark";

export type NotificationColorRGBType = [number, number, number];
export type NotificationColorHexType = string;

export interface INotification {
  title: string;
  text: string;
  position?: NotificationPositionType;
  color?:
    | NotificationColorType
    | NotificationColorRGBType
    | NotificationColorHexType;
  border?: boolean;
  icon?: any; // TODO: add icon type
  duration?: number;
  flat?: boolean;
  sticky?: boolean;
  square?: boolean;
  width?: string;
  progress?: number | string;
  notPadding?: boolean;
}

export class Notification implements INotification {
  title: string;
  text: string;
  position?: NotificationPositionType;
  color?:
    | NotificationColorType
    | NotificationColorRGBType
    | NotificationColorHexType;
  border?: boolean;
  icon?: any;
  duration?: number;
  flat?: boolean;
  sticky?: boolean;
  square?: boolean;
  width?: string;
  progress?: number | string;
  notPadding?: boolean;

  constructor(
    title: string,
    text: string,
    position?: NotificationPositionType,
    color?:
      | NotificationColorType
      | NotificationColorRGBType
      | NotificationColorHexType,
    border?: boolean,
    icon?: any,
    duration?: number,
    flat?: boolean,
    sticky?: boolean,
    square?: boolean,
    width?: string,
    progress?: number | string,
    notPadding?: boolean
  ) {
    this.title = title;
    this.text = text;
    this.position = position;
    this.color = color;
    this.border = border;
    this.icon = icon;
    this.duration = duration;
    this.flat = flat;
    this.sticky = sticky;
    this.square = square;
    this.width = width;
    this.progress = progress;
    this.notPadding = notPadding;
  }

  static createNotification(
    title: string,
    text: string,
    position?: NotificationPositionType,
    color?:
      | NotificationColorType
      | NotificationColorRGBType
      | NotificationColorHexType,
    border?: boolean,
    icon?: any,
    duration?: number,
    flat?: boolean,
    sticky?: boolean,
    square?: boolean,
    width?: string,
    progress?: number | string,
    notPadding?: boolean
  ): Notification {
    return new Notification(
      title,
      text,
      position,
      color,
      border,
      icon,
      duration,
      flat,
      sticky,
      square,
      width,
      progress,
      notPadding
    );
  }
}

on("MUTINY:NOTIFY:CREATE_NOTIFY", (data: INotification) => {
  console.log("SOME DATA ", data);
  const notify = new Notification(
    data.title,
    data.text,
    data.position,
    data.color,
    data.border,
    data.icon,
    data.duration,
    data.flat,
    data.sticky,
    data.square,
    data.width,
    data.progress,
    data.notPadding
  );
  console.log(notify);
  SendNUIMessage({
    type: "notification",
    data: notify,
  });
});

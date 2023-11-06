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

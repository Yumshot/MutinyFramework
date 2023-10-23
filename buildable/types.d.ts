/**
 * Serves as a wrapper for the native emitNet function.
 *Use emitNet function when you want to trigger an event from the server to a client or to all clients.
You need to declare the event on the client with onNet first.
 * @param eventName 
 * @param callback 
 */
declare function onNet(
  eventName: string,
  callback: (...args: any[]) => void
): void;

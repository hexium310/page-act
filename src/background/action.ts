export type ActionEventListenerCallback = (tab: browser.tabs.Tab, info: browser.pageAction.OnClickData | undefined) => void | Promise<void>;

export const listenActionEvents = (callback: ActionEventListenerCallback): void => {
  browser.action.onClicked.addListener((tab, info) => {
    void callback(tab, info);
  });
};

export const setupAction = (callback: ActionEventListenerCallback): void => {
  listenActionEvents(callback);
};

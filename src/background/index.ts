import { pageMatchList } from "@/pageScripts";
import { pageMatch } from "@/pageScripts/pageMatch";

import { setupAction } from "./action";
import { inject } from "./scripting";

import type { ActionEventListenerCallback } from "./action";

export const handleActionEvent: ActionEventListenerCallback = async (tab): Promise<void> => {
  if (tab.id === undefined || tab.url === undefined) {
    return;
  }

  const matched = pageMatch(pageMatchList, tab.url);

  if (matched === undefined) {
    return;
  }

  const result = await inject(tab.id, matched.injection, matched.data);

  void matched.handle(tab, result, matched.data);
};

setupAction(handleActionEvent);

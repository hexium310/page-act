import type { ArrayLikeToObject } from "@/utils";

import type { Injection, InjectionHandler } from "./injection";

export type RegExpExecObject = ArrayLikeToObject<RegExpExecArray>;

export interface PageMatchItem {
  name: string;
  regexp: RegExp;
  handlers: {
    injection: Injection;
    handle: InjectionHandler;
  };
}

interface Matched {
  injection: Injection;
  handle: InjectionHandler;
  data: RegExpExecObject;
}

export const regExpExecResult = (result: RegExpExecArray): RegExpExecObject => {
  // eslint-disable-next-line @typescript-eslint/no-misused-spread -- tes
  return { ...result };
};

export const pageMatch = (list: PageMatchItem[], url: string): Matched | undefined => {
  for (const item of list) {
    const result = item.regexp.exec(url);

    if (result === null) {
      continue;
    }

    return {
      ...item.handlers,
      data: regExpExecResult(result),
    };
  }
};

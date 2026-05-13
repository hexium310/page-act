import type { Injection, InjectionHandler } from "./injection";

export interface PageMatchItem {
  name: string;
  urlPatterns: URLPattern[];
  handlers: {
    injection: Injection;
    handle: InjectionHandler;
  };
}

interface Matched {
  injection: Injection;
  handle: InjectionHandler;
  data: URLPatternResult;
}

export const pageMatch = (list: PageMatchItem[], url: string): Matched | undefined => {
  for (const item of list) {
    const result = item
      .urlPatterns
      .values()
      .map((urlPattern) => urlPattern.exec(url))
      .find((urlPatternResult) => urlPatternResult);

    if (result == null) {
      continue;
    }

    return {
      ...item.handlers,
      data: result,
    };
  }
};

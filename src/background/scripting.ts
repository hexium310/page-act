import type { Injection } from "@/pageScripts/injection";

export const inject = (tabId: number, inject: Injection, data: URLPatternResult): Promise<browser.scripting.InjectionResult[]> => {
  return browser.scripting.executeScript({
    target: { tabId },
    args: [data] as unknown as [],
    func: inject as () => undefined,
  });
};

import type { Injection } from "@/pageScripts/injection";

export const inject = (tabId: number, inject: Injection, data: RegExpExecArray): Promise<browser.scripting.InjectionResult[]> => {
  return browser.scripting.executeScript({
    target: { tabId },
    args: [data] as unknown as undefined,
    func: inject as () => undefined,
  });
};

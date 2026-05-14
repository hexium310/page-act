import type { StructuredCloneable } from "type-fest";

export type Injection = (data: RegExpExecArray) => StructuredCloneable;

export type InjectionHandler = (tab: browser.tabs.Tab, values: browser.scripting.InjectionResult[], data: URLPatternResult) => void | Promise<void>;

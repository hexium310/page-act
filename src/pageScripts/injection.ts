import type { StructuredCloneable } from "type-fest";

export type Injection = (data: RegExpExecArray) => StructuredCloneable;

export type InjectionHandler = (values: browser.scripting.InjectionResult[], data: RegExpExecArray) => void | Promise<void>;

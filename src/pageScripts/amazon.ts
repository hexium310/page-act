import type { Injection, InjectionHandler } from "./injection";
import type { PageMatchItem } from "./pageMatch";

export const injection: Injection = () => {
  return;
};

export const handle: InjectionHandler = (tab, _values, data) => {
  if (tab.url === undefined) {
    return;
  }

  const { asin } = data.pathname.groups;

  if (asin === undefined) {
    console.error("no named groups:", data);
    return;
  }

  const url = new URL(`/dp/${asin}`, tab.url).toString();
  void browser
    .tabs
    .update({ url })
    .catch((reason: unknown) => {
      console.error("faield to update tab:", reason);
    });
};

const ASIN = ":asin([a-zA-Z0-9]{10})";

export const pageMatchItem = {
  name: "AmazonUrlNormalizer",
  urlPatterns: [
    new URLPattern({
      hostname: "{*.}?amazon.*",
      pathname: `{/*}?/dp/${ASIN}{/*}?`,
    }),
    new URLPattern({
      hostname: "{*.}?amazon.*",
      pathname: `/gp/product/${ASIN}{/*}?`,
    }),
    new URLPattern({
      hostname: "{*.}?amazon.*",
      pathname: `/exec/obidos/ASIN/${ASIN}{/*}?`,
    }),
    new URLPattern({
      hostname: "{*.}?amazon.*",
      pathname: `/o/ASIN/${ASIN}{/*}?`,
    }),
  ],
  handlers: {
    injection: injection,
    handle: handle,
  },
} satisfies PageMatchItem;

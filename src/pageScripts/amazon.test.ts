import { describe, expect, test } from "vitest";

import { pageMatchItem } from "./amazon";

const BASE_SLD = "https://amazon.co.jp";
const BASE_SLD_SUBDOMAIN = "https://www.amazon.co.jp";
const BASE_TLD = "https://amazon.jp";
const BASE_TLD_SUBDOMAIN = "https://www.amazon.jp";

const DP = "/dp/4488167098";
const DP_PREFIX = "/%E9%BB%92%E5%BE%8C%E5%AE%B6%E8%9C%98%E8%9B%9B%E3%81%AE%E4%BC%9A1%E3%80%90%E6%96%B0%E7%89%88%E3%80%91-%E5%89%B5%E5%85%83%E6%8E%A8%E7%90%86%E6%96%87%E5%BA%AB-%E3%82%A2%E3%82%A4%E3%82%B6%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A2%E3%82%B7%E3%83%A2%E3%83%95/dp/4488167098";
const DP_SUFFIX = "/dp/4488167098/357-9181802-9210601";
const DP_PREFIX_SUFFIX = "/%E9%BB%92%E5%BE%8C%E5%AE%B6%E8%9C%98%E8%9B%9B%E3%81%AE%E4%BC%9A1%E3%80%90%E6%96%B0%E7%89%88%E3%80%91-%E5%89%B5%E5%85%83%E6%8E%A8%E7%90%86%E6%96%87%E5%BA%AB-%E3%82%A2%E3%82%A4%E3%82%B6%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A2%E3%82%B7%E3%83%A2%E3%83%95/dp/4488167098/357-9181802-9210601";
const GP_PRODUCT = "/gp/product/4488167098";
const GP_PRODUCT_SUFFIX = "/gp/product/4488167098/%E9%BB%92%E5%BE%8C%E5%AE%B6%E8%9C%98%E8%9B%9B%E3%81%AE%E4%BC%9A1%E3%80%90%E6%96%B0%E7%89%88%E3%80%91-%E5%89%B5%E5%85%83%E6%8E%A8%E7%90%86%E6%96%87%E5%BA%AB-%E3%82%A2%E3%82%A4%E3%82%B6%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A2%E3%82%B7%E3%83%A2%E3%83%95";
const EXEC_OBIDOS_ASIN = "/exec/obidos/ASIN/4488167098";
const EXEC_OBIDOS_ASIN_SUFFIX = "/exec/obidos/ASIN/4488167098/%E9%BB%92%E5%BE%8C%E5%AE%B6%E8%9C%98%E8%9B%9B%E3%81%AE%E4%BC%9A1%E3%80%90%E6%96%B0%E7%89%88%E3%80%91-%E5%89%B5%E5%85%83%E6%8E%A8%E7%90%86%E6%96%87%E5%BA%AB-%E3%82%A2%E3%82%A4%E3%82%B6%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A2%E3%82%B7%E3%83%A2%E3%83%95";
const O_ASIN = "/o/ASIN/4488167098";
const O_ASIN_SUFFIX = "/o/ASIN/4488167098/%E9%BB%92%E5%BE%8C%E5%AE%B6%E8%9C%98%E8%9B%9B%E3%81%AE%E4%BC%9A1%E3%80%90%E6%96%B0%E7%89%88%E3%80%91-%E5%89%B5%E5%85%83%E6%8E%A8%E7%90%86%E6%96%87%E5%BA%AB-%E3%82%A2%E3%82%A4%E3%82%B6%E3%83%83%E3%82%AF%E3%83%BB%E3%82%A2%E3%82%B7%E3%83%A2%E3%83%95";

const bases = [
  { base: BASE_SLD, text: "second-level domain" },
  { base: BASE_SLD_SUBDOMAIN, text: "second-level domain with subdomain" },
  { base: BASE_TLD, text: "top-level domain" },
  { base: BASE_TLD_SUBDOMAIN, text: "top-level domain with subdomain" },
];

const dp = [
  { pathname: DP, text: "only ASIN" },
  { pathname: DP_PREFIX, text: "ASIN with prefix" },
  { pathname: DP_SUFFIX, text: "ASIN with suffix" },
  { pathname: DP_PREFIX_SUFFIX, text: "ASIN with prefix and suffix" },
];

const gpProduct = [
  { pathname: GP_PRODUCT, text: "only ASIN" },
  { pathname: GP_PRODUCT_SUFFIX, text: "ASIN with suffix" },
];

const execObidosAsin = [
  { pathname: EXEC_OBIDOS_ASIN, text: "only ASIN" },
  { pathname: EXEC_OBIDOS_ASIN_SUFFIX, text: "ASIN with suffix" },
];

const oAsin = [
  { pathname: O_ASIN, text: "only ASIN" },
  { pathname: O_ASIN_SUFFIX, text: "ASIN with suffix" },
];

const pathnameGroups = [
  { pathnames: dp, text: "/dp/:asin" },
  { pathnames: gpProduct, text: "/gp/product/:asin" },
  { pathnames: execObidosAsin, text: "/exec/obidos/ASIN/:asin" },
  { pathnames: oAsin, text: "/o/ASIN/:asin" },
];

describe.each(bases)("$text", ({ base }) => {
  describe.each(pathnameGroups)("$text", ({ pathnames }) => {
    test.each(pathnames)("$text should be match pattern", ({ pathname }) => {
      const { urlPatterns } = pageMatchItem;
      const actual = urlPatterns
        .values()
        .some((urlPattern) => urlPattern.test(new URL(pathname, base)));
      expect(actual).toBe(true);
    });
  });
});

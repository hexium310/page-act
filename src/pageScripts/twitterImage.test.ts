import { expect, test } from "vitest";

import { pageMatchItem } from "./twitterImage";

const HOME_URL = "https://x.com/home";
const TWEET_URL = "https://x.com/X/status/1736847455566577806";
const TWEET_PHOTO_URL = "https://x.com/X/status/1736847455566577806/photo/1";
const ARTICLE_URL = "https://x.com/XCreators/article/2011957172821737574";
const ARTICLE_MEDIA_URL = "https://x.com/XCreators/article/2011957172821737574/media/2011948757902905344";

test("URL of home should not be match patterns", () => {
  const { urlPatterns } = pageMatchItem;
  const actual = urlPatterns
    .values()
    .some((urlPattern) => urlPattern.test(HOME_URL));
  expect(actual).toBe(false);
});

test("URL of tweet should not be match patterns", () => {
  const { urlPatterns } = pageMatchItem;
  const actual = urlPatterns
    .values()
    .some((urlPattern) => urlPattern.test(TWEET_URL));
  expect(actual).toBe(false);
});

test("URL of tweet photo should be match patterns", () => {
  const { urlPatterns } = pageMatchItem;
  const actual = urlPatterns
    .values()
    .some((urlPattern) => urlPattern.test(TWEET_PHOTO_URL));
  expect(actual).toBe(true);
});

test("URL of article should not be match patterns", () => {
  const { urlPatterns } = pageMatchItem;
  const actual = urlPatterns
    .values()
    .some((urlPattern) => urlPattern.test(ARTICLE_URL));
  expect(actual).toBe(false);
});

test("URL of article media should be match patterns", () => {
  const { urlPatterns } = pageMatchItem;
  const actual = urlPatterns
    .values()
    .some((urlPattern) => urlPattern.test(ARTICLE_MEDIA_URL));
  expect(actual).toBe(true);
});

import * as twitterImage from "./twitterImage";

import type { PageMatchItem } from "./pageMatch";

export const pageMatchList = [
  {
    name: "twitterImage",
    regexp: /https?:\/\/x\.com\/\w+\/(?:status\/(?<tweetId>\d+)\/photo\/(?<mediaId>\d+)|article\/(?<tweetId>\d+)\/media\/(?<mediaId>\d+))/,
    handlers: {
      injection: twitterImage.injection,
      handle: twitterImage.handle,
    },
  },
] satisfies PageMatchItem[];

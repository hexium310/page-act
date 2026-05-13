import * as twitterImage from "./twitterImage";

import type { PageMatchItem } from "./pageMatch";

export const pageMatchList = [
  {
    name: "twitterImage",
    urlPatterns: [
      new URLPattern({
        hostname: "x.com",
        pathname: "/(\\w+)/status/:tweetId(\\d+)/photo/:mediaId(\\d+)",
      }),
      new URLPattern({
        hostname: "x.com",
        pathname: "/(\\w+)/article/:tweetId(\\d+)/media/:mediaId(\\d+)",
      }),
    ],
    handlers: {
      injection: twitterImage.injection,
      handle: twitterImage.handle,
    },
  },
] satisfies PageMatchItem[];

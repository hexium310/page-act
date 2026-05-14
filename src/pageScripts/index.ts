import { pageMatchItem as amazonUrlPageMatchItem } from "./amazon";
import { pageMatchItem as twitterImagePageMatchItem } from "./twitterImage";

import type { PageMatchItem } from "./pageMatch";

export const pageMatchList = [
  twitterImagePageMatchItem,
  amazonUrlPageMatchItem,
] satisfies PageMatchItem[];

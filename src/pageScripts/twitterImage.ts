import type { Injection, InjectionHandler } from "./injection";

type InjectionResult = string | undefined;

interface RegExpGroups {
  tweetId: string;
  mediaId: string;
}

export const injection: Injection = (): InjectionResult => {
  const modal = document.querySelector("[style*=\"transition-duration:\"][style*=\"background-color:\"]");

  if (modal === null) {
    return undefined;
  }

  const modalWidth = modal.getBoundingClientRect().width;

  const img = modal
    .querySelectorAll<HTMLImageElement>("img[src^=\"https://pbs.twimg.com/media/\"]")
    .values()
    .find((element) => {
      const { left, right } = element.getBoundingClientRect();
      return left < modalWidth / 2 && right > modalWidth / 2;
    });

  const src = img?.src;

  return src;
};

export const handle: InjectionHandler = async (values, data) => {
  if (data.groups === undefined) {
    console.error("no capture groups");
    return;
  }

  const { tweetId, mediaId } = data.groups as unknown as RegExpGroups;
  const src = values[0].result as InjectionResult;

  if (src === undefined) {
    console.error(`image src is undefined. tweetId: ${tweetId}, nth: ${mediaId}`);
    return;
  }

  const url = new URL(src);
  const format = url.searchParams.get("format") ?? "";

  await browser.downloads.download({
    url: src,
    filename: `twitter_${tweetId}_${mediaId}.${format}`,
  });
};

export type ArrayLikeToObject<T extends ArrayLike<unknown>> = {
  [K in keyof T]: T[K];
};

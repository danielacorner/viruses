import { EffectCallback, useEffect } from "react";
import { Variant } from "../types";

export const PADDING = 6;

export type MediaItem = {
  variants: Variant[];
  src: string;
  poster?: string;
  type: string;
  id_str: string;
  sizes: {
    large: { w: number; h: number; resize: string };
    medium: { w: number; h: number; resize: string };
    small: { w: number; h: number; resize: string };
    thumb: { w: number; h: number; resize: string };
  };
};

export function getMediaArr(tweet: any): MediaItem[] {
  return (
    tweet.extended_entities?.media.map((media) => ({
      ...media,
      variants: media.video_info?.variants.filter(
        ({ content_type }) => content_type === "video/mp4"
      ),
      src:
        media?.type === "video"
          ? media.video_info?.variants.filter(
              ({ content_type }) => content_type === "video/mp4"
            )
          : media.media_url_https,
      poster: media.media_url_https,
    })) || []
  );
}

export function useMount(cb: EffectCallback) {
  return useEffect(cb, []);
}

export function randBetween(min: number, max: number): number {
  // randBetween(0,2)
  // randBetween(-2,2)
  return Math.random() * (max - min) + min;
}

export const COLOR_BY = {
  mediaType: "mediaType",
  media: "media",
  textLength: "textLength",
  sentiment: "sentiment",
  profilePhoto: "profilePhoto",
};
export const FILTER_LEVELS = {
  medium: "medium",
  low: "low",
  none: "none",
};
export const CONTROLS_WIDTH = 220;
export const TABS_HEIGHT = 48;

export const SERVER_URL =
  process.env.NODE_ENV !== "production"
    ? ""
    : "https://twit-viz-api.herokuapp.com";

export const CONTROLS_PADDING_INNER = 14;
export const FORM_HEIGHT = 36;

export const TAB_INDICES = {
  NETWORKGRAPH: 0,
  WORDCLOUD: 1,
  GALLERY: 2,
};

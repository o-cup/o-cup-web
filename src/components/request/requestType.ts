export type ItemsType = {
  id: number;
  text: string;
}

export type RequestArtistType = {
  id: number;
  peopleId: number;
  bias: string;
  team: string;
}

export type RequestPlaceType = {
  place: string;
  district: string;
  address: string;
}

export type RequestPosterType = {
  id: number;
  publicUrl: string;
}

export type RequestDateRangeType = {
  startAt: string;
  endAt: string;
}

export type FcfsDataType = {
  key?: string;
  day?: number;
  items: ItemsType[];
}

export type RequestFcfsType = {
  type: "A" | "B" | "C";
  data: FcfsDataType[];
}

export type RequestExtraGoodsType = {
  index: number;
  title: string;
  items: ItemsType[];
}

export type RequestGoodsType = {
  all?: ItemsType[];
  random?: ItemsType[];
  dDay?: ItemsType[];
  firstCome?: RequestFcfsType;
  lucky?: ItemsType[];
  extra?: RequestExtraGoodsType[];
}

export type RequestType = {
  place: RequestPlaceType;
  artist: RequestArtistType[];
  organizer: string;
  snsId: string;
  link: string;
  posterUrls: RequestPosterType[];
  hashTags: ItemsType[];
  dateRange: RequestDateRangeType;
  goods: RequestGoodsType;
}

export default {};
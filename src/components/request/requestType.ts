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

export type RequestBasicType = {
  organizer: string;
  snsId: string;
  link: string;
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

export default {};
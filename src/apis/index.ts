import { ITEMS_PER_PAGE } from "../shared/constants";
import { isOpenToday } from "../shared/utils/dateHandlers";
import { supabase } from "../supabaseClient";
import { EventType, DetailType, FetchEventParams } from "../types";

const fetchEvents = async ({ pageParam = 1, infinite = false, keyword, date }: FetchEventParams) => {
  let query = supabase.from("random_sort").select("*");

  if (infinite) {
    const endAt = pageParam * ITEMS_PER_PAGE;
    const startAt = endAt - ITEMS_PER_PAGE === 0 ? endAt - ITEMS_PER_PAGE : endAt - ITEMS_PER_PAGE + 1;
    query = query.range(startAt, endAt);
  }

  if (keyword) {
    const { data: events } = await query;
    const data = events?.filter((event) => {
      const { bias, place, organizer, district } = event;
      if (
        bias.includes(keyword) ||
        place.includes(keyword) ||
        organizer.includes(keyword) ||
        district.includes(keyword)
      ) {
        return true;
      }
      return false;
    });
    return data;
  }

  if (date) {
    const { data: events } = await query;
    const filteredData = events?.filter((event) => {
      const { startAt, endAt } = event;
      if (isOpenToday(date, startAt, endAt)) {
        return true;
      }
      return false;
    });
    return filteredData;
  }

  const { data } = await query;
  return data;
};

/**
 * 아이디가 일치하는 event 데이터 반환
 * @param {string} id
 * @returns {EventType}
 */
const fetchEvent = async ({ id }: { id?: string }) => {
  const { data, error } = await supabase.from("events").select("*").eq("id", id);
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return data?.[0];
};

/**
 * 아이디가 일치하는 detail 데이터 반환
 * @param {string} id
 * @returns {DetailType}
 */
const fetchDetail = async ({ id }: { id?: string }) => {
  const { data, error } = await supabase.from("detail").select("*").eq("id", id);
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return data?.[0];
};

/**
 * 아이디가 일치하는 { ...event, ...detail } 데이터 통합하여 반환
 * @param {string} id
 * @returns {EventType & DetailType}
 */
const fetchEventDetail = async ({ id }: { id?: string }) => {
  const event = await fetchEvent({ id });
  const detail = await fetchDetail({ id });

  return { ...event, ...detail };
};

/**
 * 인물 데이터 반환
 * @returns {PeopleType}
 */
const fetchPeople = async () => {
  const { data, error } = await supabase.from("people").select("*");
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return data;
};

const insertEvent = async (eventData: Partial<EventType>) => {
  const { data, error } = await supabase.from("events").insert([{ ...eventData }]);
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return data;
};

const insertDetail = async (detailData: Partial<DetailType>) => {
  const { data, error } = await supabase.from("detail").insert([{ ...detailData }]);
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return data;
};

/**
 * events의 bias ["이름1", "이름2"] 에 맞춰 biasId [13, 4] 입력
 * 로직 개선 필요
 */
const updateBiasesIds = async () => {
  const { data: events } = await supabase.from("events").select("*");
  const people = await fetchPeople();

  events?.map(async (event) => {
    const biasesId: any[] = [];
    event.bias.forEach((b: any) => {
      const peopleObj = people?.find((p) => p.name === b);
      if (peopleObj) {
        biasesId.push(peopleObj.id);
      } else {
        biasesId.push(0);
      }
    });

    const { data, error } = await supabase.from("events").update({ biasesId }).match({ id: event.id });
    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    console.log(data);
  });
};

const fetchBiases = async ({ id }: { id: number }) => {
  const { data: bias } = await supabase.from("people").select("name").eq("id", id).single();
  return bias?.name;
};

/**
 * poster storage에 파일 업로드 후 publicURL 받아오기
 * @param file event.target.files[0]
 * @returns publicURL
 */
const uploadPoster = async (file: any) => {
  const fileName = `public/image${Date.now()}.png`;
  const { data, error } = await supabase.storage.from("posters")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    });

  const { publicURL } = supabase.storage.from("posters").getPublicUrl(fileName);
  return publicURL;
};

export {
  fetchEvents,
  fetchEventDetail,
  fetchPeople,
  insertEvent,
  insertDetail,
  updateBiasesIds,
  fetchBiases,
  uploadPoster
};
export default {};

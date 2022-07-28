import React, { ChangeEvent, useState } from "react";
import Layout from "../components/layout";
import { StyledAdmin } from "../styles/adminStyle";
import { insertEvent, insertDetail } from "../apis";

function Admin() {

  const [events, setEvents] = useState({
    place: "",
    bias: "", // 배열로 변환 후 전송
    organizer: "",
    snsId: "",
    district: "",
    startAt: "",
    endAt: "",
    images: "" // 배열로 변환 후 전송
  });

  const [detail, setDetail] = useState({
    hashTags: "", // 배열로 변환 후 전송
    // goods: "",
    address: ""
  });
  const [goods, setGoods] = useState([] as any[]);
  const [item, setItem] = useState({
    type: "AND",
    items: "", // 배열로 변환 후 전송
    title: ""
  });

  const handleChangeEvents = (e: ChangeEvent<HTMLInputElement>) => setEvents({
    ...events,
    [e.target.name]: e.target.value
  });

  const handleChangeDetail = (e: ChangeEvent<HTMLInputElement>) => setDetail({
    ...detail,
    [e.target.name]: e.target.value
  });

  // 특전 추가 함수
  const handleSubmitGoods = () => {
    const tempArr = [...goods];
    tempArr.push({
      type: item.type,
      items: item.items.split(", "),
      title: item.title
    });
    setGoods(tempArr);
    setItem({
      type: "AND",
      items: "",
      title: ""
    });
  };

  const handleSubmit = async () => {
    if (!events.place || !events.bias || !events.district || !events.startAt || !events.endAt || !detail.address) {
      alert("필수값 채워주세요!");
      return;
    }

    const eventData = await insertEvent({
      ...events,
      bias: events.bias.split(", "),
      images: events.images.split(", ")
    });

    if (eventData) {
      await insertDetail({
        id: eventData[0].id,
        hashTags: detail.hashTags.split(", "),
        goods,
        address: detail.address
      });
    }

    /* reset */
    setEvents({
      place: "",
      bias: "",
      organizer: "",
      snsId: "",
      district: "",
      startAt: "",
      endAt: "",
      images: ""
    });
    setDetail({
      hashTags: "",
      address: ""
    });
    setGoods([]);
  };

  return (
    <Layout>
      <StyledAdmin>
        <div className="adminContainer">
          <h1>o-cup admin</h1>

          <label htmlFor="place">
            <h4 className="required">카페 이름</h4>
            <input type="text" id="place" name="place"
                   placeholder="예: 카페 밤비 망원 1호점"
                   value={events.place}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="bias">
            <h4 className="required">연예인 이름</h4>
            <span className="help">⚠️ 한명 이상인 경우 &quot;, &quot;(쉼표 후 띄어쓰기)로 구분해주세요</span>
            <input type="text" id="bias" name="bias"
                   placeholder="예: 에스쿱스, 정한"
                   value={events.bias}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="organizer">
            <h4>주최자 이름</h4>
            <input type="text" id="organizer" name="organizer"
                   placeholder="예: 캐럿"
                   value={events.organizer}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="snsId">
            <h4>주최자 트위터 계정</h4>
            <span className="help">⚠️ @ 제외 입력</span>
            <input type="text" id="snsId" name="snsId"
                   placeholder="예: carat_account"
                   value={events.snsId}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="district">
            <h4 className="required">카페 지역</h4>
            <input type="text" id="district" name="district"
                   placeholder="예: 서울시 마포구"
                   value={events.district}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="startAt">
            <h4 className="required">이벤트 시작 날짜</h4>
            <input type="text" id="startAt" name="startAt"
                   placeholder="예: 20220801"
                   value={events.startAt}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="endAt">
            <h4 className="required">이벤트 종료 날짜</h4>
            <input type="text" id="endAt" name="endAt"
                   placeholder="예: 20220802"
                   value={events.endAt}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="images">
            <h4>이벤트 포스터 이미지</h4>
            <span className="help">⚠️ 여러개 입력 가능, 한개 이상인 경우 &quot;, &quot;(쉼표 후 띄어쓰기)로 구분해주세요</span>
            <input type="text" id="images" name="images"
                   placeholder="예: https://pbs.twimg.com/media/abc, https://pbs.twimg.com/media/def"
                   value={events.images}
                   onChange={handleChangeEvents} />
          </label>

          <label htmlFor="hashTags">
            <h4>해시태그</h4>
            <span
              className="help">⚠️ 여러개 입력 가능, 한개 이상인 경우 &quot;, &quot;(쉼표 후 띄어쓰기)로 구분해주세요<br />     #를 제외하고 입력해주세요!</span>
            <input type="text" id="hashTags" name="hashTags"
                   placeholder="예: happy_o-cup_day, 8월을_축하해"
                   value={detail.hashTags}
                   onChange={handleChangeDetail} />
          </label>

          <label htmlFor="goods">
            <h4>특전</h4>
            <span className="help">⚠️ 한가지 종류의 특전을 입력 후 &quot;특전등록 ✓&quot; 버튼을 눌러주세요</span>
            <div className="goodsPreview">
              <p>입력값 preview:</p>
              <pre>{JSON.stringify(goods, null, 4)}</pre>
            </div>

            <div className="goodsContainer">
              <label htmlFor="title">
                특전 종류:
                <input type="text" id="title" name="title"
                       placeholder="예: 선착특전"
                       value={item.title}
                       onChange={(e) => setItem({ ...item, title: e.target.value })} />
              </label>

              <label htmlFor="goods-type" className="radioContainer">
                type:
                <input id="AND" value="AND" name="goods-type"
                       type="radio" checked={item.type === "AND"}
                       onChange={() => setItem({ ...item, type: "AND" })}
                />AND(모두 증정)
                <input id="OR" value="OR" name="goods-type"
                       type="radio" checked={item.type === "OR"}
                       onChange={() => setItem({ ...item, type: "OR" })}
                />OR(택 1)
              </label>

              <label htmlFor="items">
                특전 목록:
                <span className="help">⚠️ 여러개 입력 가능, 한개 이상인 경우 &quot;, &quot;(쉼표 후 띄어쓰기)로 구분해주세요</span>
                <input type="text" id="items" name="items"
                       value={item.items}
                       onChange={(e) => setItem({ ...item, items: e.target.value })} />
              </label>
              <button className="goodsSubmitBtn" type="button" onClick={handleSubmitGoods}>특전등록 ✓</button>
            </div>
          </label>

          <label htmlFor="address">
            <h4 className="required">상세주소</h4>
            <input type="text" id="address" name="address"
                   placeholder="예: 서울시 마포구 동교로9길 36 1층"
                   value={detail.address}
                   onChange={handleChangeDetail} />
          </label>

          <button className="submitBtn" type="submit" onClick={handleSubmit}>등록</button>
        </div>
      </StyledAdmin>
    </Layout>
  );
}

export default Admin;

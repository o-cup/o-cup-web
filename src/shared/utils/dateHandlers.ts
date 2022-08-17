/**
 * 날짜 문자열을 Date 객체로 변환
 * @param {string} dateString YYYYMMDD 형식
 * @returns {Date} Date 객체
 */
export const convertStringToDate = (dateString: string) => {
	let year = 0;
	let month = 0;
	let date = 0;
	if (dateString.length === 8) {
		year = parseInt(dateString.slice(0, 4), 10);
		month = parseInt(dateString.slice(4, 6), 10);
		date = parseInt(dateString.slice(6, 8), 10);
	}
	return new Date(year, month - 1, date);
};

/**
 * 숫자가 한자리수인 경우 앞에 0을 붙여 반환
 * @param {number} num
 * @returns {string}
 */
export const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

/**
 * Date 객체를 YYYYMMDD 문자열로 변환
 * @param {Date} dateObj 객체
 * @returns {string} YYYYMMDD 형식
 */
export const convertDateToString = (dateObj: Date) => {
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth();
	const date = dateObj.getDate();

	return `${year}${addZero(month + 1)}${addZero(date)}`;
};

/**
 * 해당 날짜의 이벤트 개최 여부
 * @param {string} today 열렸는지 체크할 날짜
 * @param {string} startAt 이벤트 오픈일
 * @param {string} endAt 이벤트 종료일
 * @returns {boolean}
 */
export const isOpenToday = (today: string, startAt: string, endAt: string) => {
	if (
		today === startAt ||
		today === endAt ||
		(convertStringToDate(startAt) < convertStringToDate(today) &&
			convertStringToDate(today) < convertStringToDate(endAt))
	) {
		return true;
	}
	return false;
};

/**
 * YYYY.MM.DD 형식으로 변환
 * @param {string} dateString YYYYMMDD 형식
 * @return {string} YYYY.MM.DD 형식
 */
export const convertDateWithDots = (dateString: string) => {
	if (dateString.length === 8) {
		return `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`;
	}
	return dateString;
};

export default {};
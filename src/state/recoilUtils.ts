import { recoilPersist } from "recoil-persist";

const { persistAtom: localAtom } = recoilPersist({
	key: "localStore",
	storage: typeof window === "undefined" ? undefined : localStorage,
});

const { persistAtom: sessionAtom } = recoilPersist({
	key: "sessionContentsStore",
	storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export { localAtom, sessionAtom };

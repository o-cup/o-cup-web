export const copyToClipboard = (copyText: string) => {
	const el = document.createElement("textarea");
	el.value = copyText;
	el.style.opacity = "0";
	document.body.appendChild(el);

	el.select();

	document.execCommand("copy");
	document.body.removeChild(el);
};

export default {};

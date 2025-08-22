function replaceKeys(text, keys) {
	if (!text) return;
	keys.forEach((e) => {
		if (!e.tag || !e.value) return;
		let reg = new RegExp(e.tag, "ig");
		text = text.replace(reg, e.value);
	});
	return text;
}

module.exports = replaceKeys;

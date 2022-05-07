/** @format */

const passcode = "SK_j_1hj7595_1bgyklery1719" + "@(*&@#%*&%^@&@@!()_%^&@*&!238&!@#^&%!*(&#%@#";
export const encryptCodes = content => {
	let result = [];
	let passLen = passcode.length;
	for (let i = 0; i < content.length; i++) {
		let passOffset = i % passLen;
		let calAscii = content.charCodeAt(i) + passcode.charCodeAt(passOffset);
		result.push(calAscii);
	}
	return JSON.stringify(result);
};
export const decryptCodes = content => {
	let result = [];
	let str = '';
	let codesArr = JSON.parse(content);
	let passLen = passcode.length;
	for (let i = 0; i < codesArr.length; i++) {
		let passOffset = i % passLen;
		let calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
		result.push(calAscii);
	}
	for (let i = 0; i < result.length; i++) {
		let ch = String.fromCharCode(result[i]);
		str += ch;
	}
	return str;
};

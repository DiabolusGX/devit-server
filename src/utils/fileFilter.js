/**
 * Validate incoming data uri and return image buffer
 *
 * @param {String} dataURI Base64 encoded image data
 * @return {Buffer} Returns image buffer
 * @throws {Error} If invalid data uri
 */
const imageFilter = (dataURI) => {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;

	// Regex to get file type and data
	const regex = /^data:.+\/(.+);base64,(.*)$/;

	const matches = dataURI.match(regex);
	const ext = matches[1];
	const data = matches[2];

	// Check valid ext
	const valid = filetypes.test(ext);

	if (!valid || !ext) throw Error("Invalid Image type!");

	return Buffer.from(data, "base64");
};

module.exports = {
	imageFilter,
};

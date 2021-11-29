/**
 * Removes empty fields from given object and returns cleaned object.
 *
 * @param {Object} obj Target object to be cleaned
 *
 * @return {Object} Returns cleaned object.
 */
const clean = (obj) => {
	// remove empty fields
	Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
	return obj;
};

module.exports = clean;

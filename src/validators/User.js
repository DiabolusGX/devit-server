module.exports = {
	/**
	 * Validate and format experience object
	 * @param {Object} exp User's experience data
	 * @returns {Object} Formatted exp data
	 */
	addExperience: (exp) => {
		let startDate = "",
			endDate = "";

		if (exp.startDate) startDate = new Date(exp.startDate);
		else startDate = Date.now;

		if (exp.endDate) endDate = new Date(exp.endDate);
		else exp.isCurrent = true;

		return {
			title: exp.title || "",
			company: exp.company || "",
			isCurrent: exp.isCurrent || false,
			startDate: startDate,
			endDate: endDate,
		};
	},
};

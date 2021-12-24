module.exports = {
	/**
	 * Clean rooms object and return only required data.
	 * @param {[Object]} rooms Rooms from DB
	 * @returns {[Object]} Returns cleaned rooms
	 */
	allActiveRooms: (rooms) => {
		const cleannedRooms = [];
		rooms.forEach((room) => {
			cleannedRooms.push({
				id: room._id,
				icon: room.icon,
				name: room.name,
				topic: room.topic,
				memberCount: room.memberCount,
			});
		});
		return cleannedRooms;
	},
	newRoom: (room) => {
		return {
			icon: room.icon,
			name: room.name,
			topic: room.topic,
		};
	},
};

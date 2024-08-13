const { DatabaseContext } = require('../connections')

module.exports.getRoomBiomeByRoomId = async (roomId) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            roomId,
            earth,
            clay,
            sand,
            rock,
            iron,
            silver,
            gold,
            mithril,
            gems,
            lava,
            water
        FROM
            roomBiome
        WHERE
            roomId = @roomId;
    `)
    return await stmt.get({
        '@roomId': roomId
    })
}
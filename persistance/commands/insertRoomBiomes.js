const { DatabaseContext } = require('../connections')
module.exports.insertRumor = async (roomBiome) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO roomBiome (
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
    ) 
    VALUES
    (
        @id,
        @roomId,
        @earth,
        @clay,
        @sand,
        @rock,
        @iron,
        @silver,
        @gold,
        @mithril,
        @gems,
        @lava,
        @water
    );`)
    await stmt.bind({
        '@id': roomBiome.id,
        '@roomId': roomBiome.roomId,
        '@earth': roomBiome.earth,
        '@clay': roomBiome.clay,
        '@sand': roomBiome.sand,
        '@rock': roomBiome.rock,
        '@iron': roomBiome.iron,
        '@silver': roomBiome.silver,
        '@gold': roomBiome.gold,
        '@mithril': roomBiome.mithril,
        '@gems': roomBiome.gems,
        '@lava': roomBiome.lava,
        '@water': roomBiome.water
    })
    await stmt.run()
}
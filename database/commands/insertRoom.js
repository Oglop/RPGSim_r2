const { DatabaseContext } = require('../connections')

/**
 * 
 * @param {room: {
        id: undefined,
        worldId: string
        x: 0,
        y:0,
        magicWind: 0,
        elevation: 0,
        temprature: 0,
        biome: undefined,
        dwelling: undefined,
        description: undefined,
        exploreStatus: ENUM_EXPLORE_STATUS.empty,
    }} room 
 */
module.exports.insertRoom = async (room) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO room (
            x, 
            y, 
            worldId,
            magicWind,
            elevation,
            temprature,
            biome,
            dwelling,
            description,
            exploreStatus
        ) 
    VALUES
        (
            @x, 
            @y, 
            @worldId,
            @magicWind,
            @elevation,
            @temprature,
            @biome,
            @dwelling,
            @description,
            @exploreStatus
        );`)
    await stmt.bind({
        '@x': room.x, 
        '@y': room.y, 
        '@worldId': room.worldId,
        '@magicWind': room.magicWind,
        '@elevation': room.elevation,
        '@temprature': room.temprature,
        '@biome': room.biome,
        '@dwelling': room.dwelling,
        '@description': room.description,
        '@exploreStatus': room.exploreStatus
    })
    await stmt.run()
}
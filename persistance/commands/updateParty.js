//const { partyMembersToIdString } = require('../../models/party')
const { DatabaseContext } = require('../connections')
module.exports.updateParty = async (party) => {
    const stmt = await DatabaseContext.db.prepare(`UPDATE party SET
            name = @name,
            karma = @karma,
            path = @path,
            state = @state,
            x = @x,
            y = @y,
            questId = @questId,
            questStatus = @questStatus,
            questGoalX = @questGoalX,
            questGoalY = @questGoalY,
            crowns = @crowns,
            food = @food,
            members = @members
        WHERE
            id = @id;`)
    await stmt.bind({
        '@id': party.id,
        '@name': party.name,
        '@karma': party.karma,
        '@path': party.path,
        '@state': party.state,
        '@x': party.position.x,
        '@y': party.position.y,
        '@questId': party.questId,
        '@questStatus': party.questStatus,
        '@questGoalX': party.questGoal.x,
        '@questGoalY': party.questGoal.y,
        '@crowns': party.crowns,
        '@food': party.food,
    })
    await stmt.run()
}
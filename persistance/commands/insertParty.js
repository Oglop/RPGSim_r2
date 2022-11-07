const { DatabaseContext } = require('../connections')
//const { partyMembersToIdString } = require('../../models/party')
module.exports.insertParty = async (party) => {
    const stmt = await DatabaseContext.db.prepare(`INSERT INTO party (
        id,
        name,
        karma,
        path,
        state,
        x,
        y,
        questId,
        questStatus,
        questGoalX,
        questGoalY,
        crowns,
        food,
        members
    ) 
    VALUES
    (
        @id,
        @name,
        @karma,
        @path,
        @state,
        @x,
        @y,
        @questId,
        @questStatus,
        @questGoalX,
        @questGoalY,
        @crowns,
        @food,
        @members
    );`)
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
        //'@members': partyMembersToIdString(party.members)
    })
    try {
        await stmt.run()
    } catch(e) {
        console.log(e.message)
    }
    
}
const { DatabaseContext } = require('../connections')

module.exports.getPartyById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
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
        FROM
            party
        WHERE
            id = @id;
    `)

    const tmp = await stmt.get({
        '@id': id,
    })
    if (tmp != undefined) {
        tmp.questGoal = {
            x: tmp.questGoalX,
            y: tmp.questGoalY
        }
        tmp.position = {
            x: tmp.x,
            y: tmp.y
        }
    }
    return tmp
}


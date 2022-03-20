const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')
const { textToDate } = require('../../lib/time')

module.exports.getCharacterById = () => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            name,
            description,
            gender,
            marriedTo,
            mother,
            father,
            pregnant
            pregnantTime,
            job,
            race,
            birthDate,
            trait,
            age,
            health,
            maxHealth,
            stamina,
            maxStamina,
            religion,
            personality,
            isAlive,
            diedFrom,
            head,
            weaponHand,
            shieldHand,
            body
            str,
            vit,
            agi,
            wis,
            int,
            cha,
            luc
        FROM 
            character
        WHERE
            id = @id;
    `)
    await stmt.bind({
        '@id': dwelling.id
    })
    const tmp = await stmt.get()
    const character = copyObject(objects.character)
    return { ...character, ...tmp, birthDate: textToDate(tmp.birthDate) }
}

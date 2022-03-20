const { DatabaseContext } = require('../connections')
const { character } = require('../../generic/objects')

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
    const obj = await stmt.get()
    return { character, ...obj }
}

const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')
const { copyObject } = require('../../lib/utils')
const { textToDate } = require('../../lib/time')

module.exports.getCharacterById = async (id) => {
    const stmt = await DatabaseContext.db.prepare(`
        SELECT
            id,
            name,
            family,
            coatOfArms,
            title,
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
            body,
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
        '@id': id
    })
    const tmp = await stmt.get()
    const character = copyObject(objects.character)
    return tmp ? { 
        ...character, 
        ...tmp, 
        birthDate: textToDate(tmp.birthDate), 
        isAlive: (tmp.isAlive == 1) ? true : false, 
            stats: {
            str: tmp.str, 
            vit: tmp.vit,
            agi: tmp.agi,
            wis: tmp.wis,
            int: tmp.int,
            cha: tmp.cha,
            luc: tmp.luc
        }   
    }:{}
}

const { DatabaseContext } = require('../connections')
const objects = require('../../generic/objects')


module.exports.updateCharacter = async (character) => {
    const stmt = await DatabaseContext.db.prepare(`UPDATE charachter SET
            name = @name,
            description = @description,
            gender = @gender,
            marriedTo = @marriedTo,
            mother = @mother,
            father = @father,
            pregnant = @pregnant,
            pregnantTime = @pregnantTime,
            job = @job,
            race = @race,
            birthDate = @birthDate,
            trait = @trait,
            age = @age,
            health = @health,
            maxHealth = @maxHealth,
            stamina = @stamina,
            maxStamina = @maxStamina,
            religion = @religion,
            personality = @personality,
            isAlive = @isAlive,
            diedFrom = @diedFrom,
            head = @head,
            weaponHand = @weaponHand,
            shieldHand = @shieldHand,
            body = @body,
            str = @str,
            vit = @vit,
            agi = @agi,
            wis = @wis,
            int = @int,
            cha = @cha,
            luc = @luc
        WHERE
            id = @id;`)
    await stmt.bind({
        '@name': character.name,
        '@description': character.description,
        '@gender': character.gender,
        '@marriedTo': character.marriedTo,
        '@mother': character.mother,
        '@father': character.father,
        '@pregnant': character.pregnant,
        '@pregnantTime': character.pregnantTime,
        '@job': character.job,
        '@race': character.race,
        '@birthDate': character.birthDate,
        '@trait': character.trait,
        '@age': character.age,
        '@health': character.health,
        '@maxHealth': character.maxHealth,
        '@stamina': character.stamina,
        '@maxStamina': character.maxStamina,
        '@religion': character.religion,
        '@personality': character.personality,
        '@isAlive': (character.isAlive) ? 1 : 0,
        '@diedFrom': character.diedFrom,
        '@head': character.equipment.head,
        '@weaponHand': character.equipment.weaponHand,
        '@shieldHand': character.equipment.shieldHand,
        '@body': character.equipment.body,
        '@str': character.stats.str,
        '@vit': character.stats.vit,
        '@agi': character.stats.agi,
        '@wis': character.stats.wis,
        '@int': character.stats.int,
        '@cha': character.stats.cha,
        '@luc': character.stats.luc
    })
    await stmt.run()
}
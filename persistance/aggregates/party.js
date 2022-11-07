const { getPartyById } = require('../queries/getPartyById')
const { getPartyMembersByPartyId } = require('../queries/getPartyMembersByPartyId')
const { getPartyMemberByCharacterId } = require('../queries/getPartyMemberByCharacterId')
const { getCharacterById } = require('../queries/getCharacterById')

const { insertParty } = require('../commands/insertParty')
const { updateParty } = require('../commands/updateParty')
const { insertPartyMember } = require('../commands/insertPartyMember')
const { insertCharacter } = require('../commands/insertCharacter')
const { updateCharacter } = require('../commands/updateCharacter')

const { generateID } = require('../../lib/utils')

const saveMember = async (partyId, character) => {
    const memberExists = await getPartyMemberByCharacterId(character.id)
    if (!!memberExists) {
        const id = generateID()
        await insertPartyMember({ id, partyId, characterId: character.id })
    }
    
    const characterExists = await getCharacterById(character.id)
    if (!!characterExists) {
        await insertCharacter(character)
    } else {
        await updateCharacter({ ...characterExists, ...character })
    }
    
}

const saveParty = async party => {

    const partyExists = await getPartyById(party.id)
    if(!!partyExists) {
        await insertParty(party)
    } else {
        await updateParty({ ...partyExists, ...party })
    }
    for (member of party.members) {
        await saveMember(member)
    }
}


const loadParty = async id => {
    const party = await getPartyById(id)
    const partyMembers = await getPartyMembersByPartyId(party.id)
    
    for (member of partyMembers) {
        party.members.push( await getCharacterById(member.partyId) )
    }
    
    return party
}

module.exports = {
    saveParty, loadParty
}



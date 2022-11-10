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
        await updateCharacter({ ...characterExists, ...character })
    }
    const characterExists = await getCharacterById(character.id)
    if (!!characterExists) {
        const id = generateID()
        await insertPartyMember({ id, partyId, characterId: character.id })
    } else {
        await insertCharacter(character)
    }
    
}

const saveParty = async party => {
    const partyExists = await getPartyById(party.id)
    if(!!partyExists) {
        await updateParty({ ...partyExists, ...party })
    } else {
        await insertParty(party)
    }
    for (member of party.members) {
        await saveMember(party.id, member)
    }
}


const loadParty = async id => {
    let party = {
        ...await getPartyById(id),
        members: []
    }
    const partyMembers = await getPartyMembersByPartyId(id)
    for (member of partyMembers) {
        party.members.push( await getCharacterById(member.partyId) )
    }
    return party
}

module.exports = {
    saveParty, loadParty
}



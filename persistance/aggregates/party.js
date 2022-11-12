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
    console.log(`character - ${JSON.stringify(character)}`)
    const memberExists = await getPartyMemberByCharacterId(character.id)
    console.log(`!(!!memberExists) - ${!(!!memberExists)}`)
    if (!(!!memberExists)) {
        const id = generateID()
        await insertPartyMember({ id, partyId, characterId: character.id })
    }
    const characterExists = await getCharacterById(character.id)
    console.log(`!!characterExists) - ${!!characterExists}`)
    if (!!characterExists) {
        console.log(`await updateCharacter({ ...characterExists, ...character })`)
        await updateCharacter({ ...characterExists, ...character })
    } else {
        console.log(`await insertCharacter(character)`)
        
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
    console.log(`party.members - ${party.members.length}`)
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
    console.log(`partyMembers - ${partyMembers.length}`)
    for (member of partyMembers) {
        party.members.push( await getCharacterById(member.partyId) )
    }
    return party
}

module.exports = {
    saveParty, loadParty
}



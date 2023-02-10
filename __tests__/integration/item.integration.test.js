const { migrate } = require('../../persistance/infrastructure/migrate')
const { ENUM_COMMANDS, ENUM_ITEM_TYPE, ENUM_SKILL_NAMES } = require('../../generic/enums')
const { executeCommands } = require('../../persistance/commandQueue')
const { getItemById } = require('../../persistance').queries

const item = {
    id: '111',
    type: ENUM_ITEM_TYPE.HELMET,
    name: 'MOCK_ITEM',
    use: '',
    effect: '',
    min: 2,
    max: 6,
    value: 4,
    skillRequired: ENUM_SKILL_NAMES.hunting
}

describe('item integration', () => {
    test('item crud', async () => {
        
        await migrate()
        await executeCommands([ { command: ENUM_COMMANDS.INSERT_ITEM, data: item } ])
        
        const loadedItem = await getItemById('111')

        expect(loadedItem.name).toBe('MOCK_ITEM')
        expect(loadedItem.min).toBe(2)
        expect(loadedItem.max).toBe(6)
        expect(loadedItem.value).toBe(4)
        expect(loadedItem.skillRequired).toBe(ENUM_SKILL_NAMES.hunting)

        loadedItem.min = 5
        loadedItem.skillRequired = ENUM_SKILL_NAMES.cooking

        await executeCommands([ { command: ENUM_COMMANDS.UPDATE_ITEM, data: loadedItem } ])
        const updatedItem = await getItemById('111')
        expect(updatedItem.name).toBe('MOCK_ITEM')
        expect(updatedItem.min).toBe(5)
        expect(updatedItem.max).toBe(6)
        expect(updatedItem.value).toBe(4)
        expect(updatedItem.skillRequired).toBe(ENUM_SKILL_NAMES.cooking)

        await executeCommands([ { command: ENUM_COMMANDS.DELETE_ITEM, data: '111' } ])
        const deletedItem = await getItemById('111')
        expect(deletedItem).toBeFalsy()

    })
})

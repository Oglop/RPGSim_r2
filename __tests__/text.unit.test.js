const text = require('../localization')

describe('language text', () => {
    it('should return a text based on id test1 when language is en', () => {
        jest.mock('../config', () => ('en'))
        const expected = 'hello world'
        const actual = text.get('test1', ['world'])
        expect(actual).toBe(expected)
    })

    it('should return a text based on id test1 when language is se', () => {
        jest.mock('../config', () => ({ // does not work
            language: 'se'
        }))
        const expected = 'one two three'
        const actual = text.get('test2', ['two', 'three'])
        expect(actual).toBe(expected)
    })

    it('should return empty string when id does not exist', () => {
        jest.mock('../config', () => ('en'))
        const expected = ''
        const actual = text.get('test3', [])
        expect(actual).toBe(expected)
    })

})



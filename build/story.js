// STANDARD IMPORTS
const { get } = require('../localization')
const { logError } = require('../data/errorFile')
const objects = require('../generic/objects')
const { 
    ENUM_COMMANDS,
    ENUM_STORY_TYPE,
    ENUM_STORY_SUB_TYPE,
    ENUM_STORY_TAGS
} = require('../generic/enums')
const { 
    copyObject, 
    generateID
} = require('../lib/utils')

// STANDARD IMPORTS

module.exports.getStoryEntry = (message, aboutId, type, options) => {
    const s = copyObject(objects.story)
    s.id = generateID()
    s.message = message
    s.type = type
    s.subType = (options.subType) ? options.subType : ENUM_STORY_SUB_TYPE.NONE
    s.aboutId = aboutId
    s.date = '1-1-1'
    s.tag = (options.tag) ? options.tag : ENUM_STORY_TAGS.PARAGRAPH
    return s
}
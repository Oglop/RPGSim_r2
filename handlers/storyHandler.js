const { getStory } = require('../persistance').queries
const { Output } = require('../output/output')

const tellWholeStory = async () => {
    const story = await getStory()
    for (let item of story) {
        Output.print(item.message)
    }
}

const tellStoryOf = async (id) => {

}


module.exports = {
    tellWholeStory
}
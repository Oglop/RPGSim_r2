const { ENUM_FILE_TYPE }= require('../generic/enums')
const { save } = require('../data/fileStorage')

const htmlPage = (data) => {
    
    return `<!DOCTYPE html><html><head>
    <script>
    const data = { "map": ${JSON.stringify(data)} }

    const drawMap = () => {
        const colors = {
            plainsGreen: '#B4DF3E',
            swampGreen: '#378640',
            lakeBlue: '#49A6DC',
            forestGreen: '#0C6E32',
            hillsGreen: '#C0E5A8',
            mountainsBrown: '#E2E2E2',
            dessertYellow: '#F2FF81',
            badlandsRed: '#F79F62',
            farmlandsYellow: '#F0E158',
        }
        const canvas = document.getElementById('map');
        const context = canvas.getContext('2d');
        let squareSize = 16;
        for (let y = 0; y < data.map.length; y++) {
            for (let x = 0; x < data.map.length; x++) {
                if (data.map[x][y].biome === 'P') {
                    context.fillStyle = colors.plainsGreen;
                } else if (data.map[x][y].biome === 'L') {
                    context.fillStyle = colors.lakeBlue;
                } else if (data.map[x][y].biome === 'F') {
                    context.fillStyle = colors.forestGreen;
                } else if (data.map[x][y].biome === 'H') {
                    context.fillStyle = colors.hillsGreen;
                } else if (data.map[x][y].biome === 'S') {
                    context.fillStyle = colors.swampGreen;
                } else if (data.map[x][y].biome === 'M') {
                    context.fillStyle = colors.mountainsBrown;
                } else if (data.map[x][y].biome === 'D') {
                    context.fillStyle = colors.dessertYellow;
                } else if (data.map[x][y].biome === 'B') {
                    context.fillStyle = colors.badlandsRed;
                } else if (data.map[x][y].biome === 'A') {
                    context.fillStyle = colors.farmlandsYellow;
                }
                context.fillRect(x * squareSize, y * squareSize, x * squareSize + squareSize, y * squareSize + squareSize);
        }}} 
        document.addEventListener('DOMContentLoaded', () => {drawMap()}, false);
        </script>
        </head>
        <body>
        <canvas id="map" width="480" height="480"></canvas>
        </body>
        </html>`
    }


    const writeMap = (map, id) => {
        try {
            const data = htmlPage(map)
            save(data, {
                id,
                fileType: ENUM_FILE_TYPE.VISUALIZATION,

            })
        } catch (e) {
            console.log(e.message)
        }
    }

    module.exports = { writeMap }
const { ENUM_FILE_TYPE }= require('../generic/enums')
const { save } = require('../data/fileStorage')

const htmlPage = (data) => {
    
    return  `<!DOCTYPE html>
        <html>
            <head>
                <script>
                    const data = { "map": ${JSON.stringify(data)} }
                    const drawMap = (type = 'biome') => {
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
                            deep: '#a100db',
                            shallow: '#0900b8',
                            level: '#00d9ff',
                            ground: '#00ed10',
                            high: '#ffff00',
                            peek: '#ff1900',
                            freezing: '#c300ff',
                            cold: '#053eeb',
                            temprate: '#05eb68',
                            warm: '#ebe705',
                            hot: '#ff3014',
                            black: '#000000',
                            lowMagic: '#140078',
                            medMagic: '#9000c4',
                            highMagic: '#ff00fb'
                        }
                        const canvas = document.getElementById('map');
                        const context = canvas.getContext('2d');
                        let squareSize = 8;
                        for (let y = 0; y < data.map.length; y++) {
                            for (let x = 0; x < data.map.length; x++) {
                                if ( type == 'biome' || type == 'biomeWithDwelling' ) {
                                    if ( type == 'biomeWithDwelling' && data.map[x][y].dwellingId != undefined ) {
                                        context.fillStyle = colors.black;
                                    } else {
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
                                    }
                                } else if ( type == 'elevation' ) {
                                    if (data.map[x][y].elevation < -1) {
                                        context.fillStyle = colors.deep;
                                    } else if ( data.map[x][y].elevation == -1 ) {
                                        context.fillStyle = colors.shallow;
                                    } else if ( data.map[x][y].elevation == 0) {
                                        context.fillStyle = colors.level;
                                    } else if ( data.map[x][y].elevation == 1 || data.map[x][y].elevation == 2 ) {
                                        context.fillStyle = colors.ground;
                                    } else if ( data.map[x][y].elevation == 3 || data.map[x][y].elevation == 4 ) {
                                        context.fillStyle = colors.high;
                                    } else if (data.map[x][y].elevation > 4) {
                                        context.fillStyle = colors.peek;
                                    }
                                } else if ( type == 'temprature' ) {
                                    if ( data.map[x][y].temprature <= 0 ) {
                                        context.fillStyle = colors.freezing;
                                    } else if ( data.map[x][y].temprature == 1 ) {
                                        context.fillStyle = colors.cold;
                                    } else if ( data.map[x][y].temprature == 2 ) {
                                        context.fillStyle = colors.temprate;
                                    } else if ( data.map[x][y].temprature == 3  || data.map[x][y].temprature == 4 ) {
                                        context.fillStyle = colors.warm;
                                    } else if ( data.map[x][y].temprature >= 5 ) {
                                        context.fillStyle = colors.hot;
                                    }
                                }  else if ( type == 'magicWinds' ) {
                                    if ( data.map[x][y].magicWind == 0 ) {
                                        context.fillStyle = colors.lowMagic;
                                    } else if ( data.map[x][y].magicWind == 1 ) {
                                        context.fillStyle = colors.medMagic;
                                    } else if ( data.map[x][y].magicWind >= 2 ) {
                                        context.fillStyle = colors.highMagic;
                                    }
                                }
                                context.fillRect(x * squareSize, y * squareSize, x * squareSize + squareSize, y * squareSize + squareSize);
                            }
                        }
                    }
                    document.addEventListener('DOMContentLoaded', () => {
                        drawMap()
                    }, false);
                </script>
            </head>
            <body>
                <div>
                    <button onclick="drawMap('biome')">Biome</button></br>
                    <button onclick="drawMap('biomeWithDwelling')">Biome+</button></br>
                    <button onclick="drawMap('elevation')">Elevation</button></br>
                    <button onclick="drawMap('temprature')">Temprature</button></br>
                    <button onclick="drawMap('magicWinds')">Winds of magic</button>
                </div>
                <canvas id="map" width="800" height="800"></canvas>
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
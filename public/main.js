function MovementHandler() {

    this.positions = []

    this.reloadPositions = function(player) {

        this.positions = movementPositions(player)
    }

    this.reloadMap = function(index) {

        buildMap(
            this,
            this.getPositionByIndex(index),
            this.getVectorByIndex(index)
        )
    }

    this.getPositionByIndex = function(index) {

        return [this.positions[index][0], this.positions[index][1]]
    }

    this.getVectorByIndex = function(index) {

        return [this.positions[index][2], this.positions[index][3]]
    }
}

function movementPositions(player) {

    // Get player position + size + previous vector
    // See if player at start point
      // If true, player can stay still or
      // move 1 accel forward, 1 accel left or 1 accel right
      // else
      // player's previous vector dictates "princpal point"
      // eight surrounding points are also options
    // nb. all points/vectors are based on coord + player size

    var x = player.position[0]
    var y = player.position[1]
    var vecX = player.previousVector[0]
    var vecY = player.previousVector[1]
    var size = player.size

    var positions = []

    if (player.position[0] === player.start[0] && player.position[1] === player.start[1]) {

        // 4 options
        // principal (stay)
        // forward accel vec (pos.x + 1)
        // left accel vec (pos.x + 1, pos.y - 1)
        // right accel vec (pos.x + 1, pos.y + 1)

        positions = [
            [x, y, 0, 0],
            [x, y, 0, 0],
            [x + size, y - size, 1, -1],
            [x, y, 0, 0],
            [x, y, 0, 0],
            [x + size, y, 1, 0],
            [x, y, 0, 0],
            [x, y, 0, 0],
            [x + size, y + size, 1, 1]
        ]
    }
    else {

        // 9 options
        // previous vector (principal)
        // 8 surrounding, from top left to bottom right:
        // prev vec x - 1, y - 1
        // prev vec x, y - 1
        // prev vec x + 1, y - 1
        // prev vec x - 1, y
        // prev vec x + 1, y
        // prev vec x - 1, y + 1
        // prev vec x, y + 1
        // prev vec x + 1, y + 1
        
        positions = [
            [
                x + ((vecX - 1) * size),
                y + ((vecY - 1) * size),
                vecX - 1,
                vecY - 1
            ],
            [
                x + (vecX * size),
                y + ((vecY - 1) * size),
                vecX,
                vecY - 1
            ],
            [
                x + ((vecX + 1) * size),
                y + ((vecY - 1) * size),
                vecX + 1,
                vecY - 1
            ],
            [
                x + ((vecX - 1) * size),
                y + (vecY * size),
                vecX - 1,
                vecY
            ],
            [
                x + (vecX * size),
                y + (vecY * size),
                vecX,
                vecY
            ],
            [
                x + ((vecX + 1) * size),
                y + (vecY * size),
                vecX + 1,
                vecY
            ],
            [
                x + ((vecX - 1) * size),
                y + ((vecY + 1) * size),
                vecX - 1,
                vecY + 1
            ],
            [
                x + (vecX * size),
                y + ((vecY + 1) * size),
                vecX,
                vecY + 1
            ],
            [
                x + ((vecX + 1) * size),
                y + ((vecY + 1) * size),
                vecX + 1,
                vecY + 1
            ]
        ]
    }

    return positions
}

function detectPlayerCollision(map, object) {

    // For each column, in each row
    // Get the value from the map data
    // And return true if collision (1)

    // Get row
    for (var i = 0; i < object.size; i++) {

        // Row is the number of columns...
        // multiplied by the (object's y position...
        // plus the size or length of the object)
        var row = (object.position[1] + i) * map.dimensions[0]
        
        // Get column
        for (var j = 0; j < object.size; j++) {

            // Column is the row "value"..
            // plus (object's x position...
            // plus the size or height of the object)
            var column = row + (object.position[0] + j)

            // Check if collision
            if (map.data[column] === 1) {

                // console.log("collision!")
                return true
            }
        }
    }
    
    return false
}

function square(x) { return x * x }

function buildMap(movementHandler, playerPosition, previousVector) {

    var container =  document.getElementById('container')

    if(!container) return

    // Width of race map 200
    var ROWS = 140
    // height of race map 200
    var COLUMNS = ROWS

    // origin point of circle
    var mid = Math.round(ROWS * 0.5)

    // size of circle by radius
    var radius = square(ROWS * 0.4)

    var boundaryWidth = 4

    // data (for collision detection later...)
    var data = []

    var playerSize = 2
    var playerStart = [Math.round(COLUMNS / 2), ROWS - boundaryWidth - playerSize]
    var player = playerPosition && playerPosition.length === 2 ? playerPosition : playerStart
    var playerVector = previousVector && previousVector.length === 2 ? previousVector : [0, 0]


    var text = ""

    for (var i = 0; i < ROWS; i++) {

        for (var j = 0; j < COLUMNS; j++) {

            // Player position
            var playerMark = false
            if ((j === player[0] || j === player[0] + (playerSize - 1)) && 
                (i === player[1] || i === player[1] + (playerSize - 1))) {
                
                text += "<span>█</span>"
                playerMark = true
            }

            // Drawing the race course
            // d (distance) square = 
            // (point x minus center point x) square
            // plus
            // (point y minus center point y) square
            // if d square <= radius square of circle, point inside

            var d = square(j - mid) + square(i - mid)

            // Boundary check
            if (i < boundaryWidth 
                || j < boundaryWidth 
                || i >= ROWS - boundaryWidth 
                || j >= COLUMNS - boundaryWidth) {

                if (playerMark !== true)
                    text += "•"

                data.push(1)
            }
            else {

                if (playerMark !== true)
                    text += (d > radius) ? "#" : "•"

                data.push((d > radius) ? 0 : 1)
            }
        }

        text += "<br>"
    }

    container.innerHTML = text

    // Detect if there was a collision
    var collision = detectPlayerCollision(
        {data: data, dimensions: [COLUMNS, ROWS]}, 
        {position: player, size: playerSize})

    document.body.className = collision === true ? "collision" : ""

    // Get movement datas
    var playerInfo = {
        position: player,
        start: playerStart,
        size: playerSize,
        previousVector: playerVector
    }

    movementHandler.reloadPositions(playerInfo)
}

document.body.onload = function() {

    var movementHandler = new MovementHandler()
    buildMap(movementHandler)

    document.body.addEventListener('click', function(e) {

        var dataId = e.target.getAttribute('data-id')
        var id = dataId ? dataId === "0" ? 0 : parseInt(dataId) : null
        if (id > -1 && id < 9) {

            movementHandler.reloadMap(id)
        }
    })
}
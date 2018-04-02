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

function buildMap(collide) {

    var container =  document.getElementById('container')

    if(!container) return

    // Width of race map 200
    var ROWS = 201
    // height of race map 200
    var COLUMNS = ROWS

    // origin point of circle
    var mid = Math.round(ROWS * 0.5)

    // size of circle by radius
    var radius = square(ROWS * 0.4)

    // data (for collision detection later...)
    var data = []

    var player = [100, 190]
    if (collide && collide === true) {

        player = [101, 181]
        // player = [0, 0]
    }
    var playerSize = 2

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
            if (i <= 3 || j <= 3 || i > ROWS - 5 || j > COLUMNS - 5) {

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

    if (collide && collide === true) {

        document.body.removeEventListener("click", collideMap)
        document.body.addEventListener("click", buildMap)
    }
    else {

        document.body.removeEventListener("click", buildMap)
        document.body.addEventListener("click", collideMap)
    }
}

function collideMap() {

    buildMap(true)
}

document.body.onload = buildMap
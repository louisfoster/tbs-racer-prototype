import IRacer, { RacerMove } from "../Racer"
import IPoint from "../Point"
import IVector from "../Vector"
import EventSystem, { EventType } from "../../Systems/Events"

class Player0 implements IRacer {

    position: IPoint
    principalVector: IVector
    neighbourVectors: Array<IVector>
    size: number
    start: IPoint
    nextPrincipalPoint: IPoint
    nextNeighbourPoints: Array<IPoint>
    previousPositions: Array<IPoint>
    previousVectors: Array<IVector>
    draw: boolean

    constructor(start: IPoint, size: number = 2) {

        this.draw = true

        this.start = start
        this.position = start
        this.size = size

        this.principalVector = {x: 1, y: 0}

        this.neighbourVectors = [
            {x: -1, y: -1},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: -1, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: 1},
            {x: 1, y: 1},
        ]

        this.setNextPositions()
    }

    updatePositionAndVectorData(move: RacerMove) {

        this.previousPositions.push(this.position)
        this.previousVectors.push(this.principalVector)

        this.position = (move === RacerMove.Principal) ? this.nextPrincipalPoint : 
                                                         this.nextNeighbourPoints[move]
        
        if (move !== RacerMove.Principal) {

            this.principalVector.x += this.neighbourVectors[move].x
            this.principalVector.y += this.neighbourVectors[move].y
        }

        this.setNextPositions()
        this.updated()
    }

    setNextPositions() {

        const x = this.position.x
        const y = this.position.y
        const vecX = this.principalVector.x
        const vecY = this.principalVector.y
        const size = this.size

        let positions: Array<IPoint> = []

        if (x === this.start.x && y === this.start.y) {

            this.nextPrincipalPoint = {x: x, y: y}
    
            this.nextNeighbourPoints = [
                {x: x, y: y},
                {x: x, y: y},
                {x: x + size, y: y - size},
                {x: x, y: y},
                {x: x + size, y: y},
                {x: x, y: y},
                {x: x, y: y},
                {x: x + size, y: y + size}
            ]
        }
        else {

            this.nextPrincipalPoint = {
                x: x + (vecX * size),
                y: y + (vecY * size)
            }

            this.nextNeighbourPoints = []
            this.neighbourVectors.forEach(element => {

                this.nextNeighbourPoints.push({
                    x: x + ((vecX + element.x) * size),
                    y: y + ((vecY + element.y) * size)
                })
            })
        }
    }

    updated() {

        EventSystem.push(EventType.DrawableUpdated)
    }
}


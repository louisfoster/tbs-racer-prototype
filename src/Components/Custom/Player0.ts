import IRacer from "../Racer"
import IPoint from "../Point"
import IVector from "../Vector"
import EventSystem, { EventType } from "../../Systems/Events"
import { DrawableType } from "../Drawable";
import { IInteractive, InputType } from "../../Systems/InputIntent";

export default class Player0 implements IRacer, IInteractive {

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
    type: DrawableType.PositionAndSize
    collided: boolean
    collisionWith: number

    inputTypes: Array<InputType>
    interactive: boolean

    constructor(start: IPoint, size: number = 2) {

        this.interactive = true
        this.inputTypes = [
            InputType.UpLeft,
            InputType.Up,
            InputType.UpRight,
            InputType.Left,
            InputType.Principal,
            InputType.Right,
            InputType.DownLeft,
            InputType.Down,
            InputType.DownRight
        ]

        this.draw = true
        this.type = DrawableType.PositionAndSize

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
        
        this.previousPositions = []
        this.previousVectors = []

        this.setNextPositions()
    }

    updatePositionAndVectorData(move: InputType) {

        this.previousPositions.push(this.position)
        this.previousVectors.push(this.principalVector)

        if (move === InputType.Principal) {
            
            this.position = this.nextPrincipalPoint
        }
        else {

            let index = (move > 4) ? move - 1 : move

            this.position = this.nextNeighbourPoints[index]

            this.principalVector.x += this.neighbourVectors[index].x
            this.principalVector.y += this.neighbourVectors[index].y
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

    collision(id: number) {

        this.collided = true
        this.collisionWith = id
        this.updated()
    }

    onInput(input: InputType) {

        this.updatePositionAndVectorData(input)
    }
}


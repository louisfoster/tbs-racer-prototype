import IDrawable, { DrawableType } from "./Drawable"
import EventSystem, { EventType } from "../Systems/Events"

export interface IMap extends IDrawable {

    data: Array<number>
    size: number

    mapData(): Array<number>
    buildMapData()
}

export class BaseMap implements IMap {

    // Properties
    data: Array<number>
    size: number
    id: number
    draw: boolean
    type: DrawableType
    collided: boolean
    collisionWith: number

    constructor(size: number = 200) {

        this.data = []
        this.size = size
        this.draw = true
        this.type = DrawableType.Data
        this.collided = false
    }

    buildMapData() {

    }

    mapData() {

        return this.data
    }

    updated() {

        EventSystem.push(EventType.DrawableUpdated)
    }

    collision(id: number) {

        this.collided = true
        this.collisionWith = id
        this.updated()
    }
}
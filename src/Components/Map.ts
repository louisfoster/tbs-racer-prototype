import IDrawable from "./Drawable"
import EventSystem, { EventType } from "../Systems/Events"

export interface IMap extends IDrawable {

    rows: number
    columns: number
    data: Array<number>

    mapData(): Array<number>
    buildMapData()
}

export class BaseMap implements IMap {

    // Properties
    rows: number
    columns: number
    data: Array<number>
    id: number
    draw: boolean

    constructor(rows: number = 200, columns: number = rows) {

        this.rows = rows
        this.columns = columns

        this.data = []
        this.draw = true
    }

    buildMapData() {

    }

    mapData() {

        return this.data
    }

    updated() {

        EventSystem.push(EventType.DrawableUpdated)
    }
}
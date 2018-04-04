import { generateId } from "./MathUtil"

interface IEntity {

    id: number
    object: any
}

export default class Entities {

    list: Array<IEntity>
    dict: {IEntity?}

    constructor() {

        this.list = []
        this.dict = {}
    }

    addEntity(object) {

        const id = generateId()

        this.dict[id] = object
        this.list.push({id: id, object: object})
    }
}
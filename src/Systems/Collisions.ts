import Entities from "../Utils/Entity"
import EventSystem, { EventType } from "./Events"
import { DrawableType } from "../Components/Drawable"
import IPoint from "../Components/Point"

interface PType {

    position: IPoint
    size: number
}

interface DType {

    data: Array<number>
    size: number
}

export default class Collisions {

    entitySystem: Entities

    constructor(entitySystem: Entities) {

        this.entitySystem = entitySystem

        addEventListener(EventType.DrawableUpdated, () => {
            
            this.checkCollisions(this.entitySystem)
        })
    }

    checkCollisions(entities: Entities) {

        const drawables = entities.list.filter(entity => { return entity.object.draw })

        let collisions: {ids?: [number]} = {}

        drawables.forEach(entity0 => {

            drawables.forEach(entity1 => {

                // Can't compare with self
                if (entity0.id === entity1.id) { return }

                // If entities have already collided
                if (collisions[entity1.id] && collisions[entity1.id].ids.includes(entity0.id)) { return }

                // Can't compare stationary objects
                if (entity0.object.type === DrawableType.Data && 
                    entity1.object.type === DrawableType.Data) { return }

                let collision = false

                // If both entities have position + size
                if (entity0.object.type === entity1.object.type) {

                    collision = this.comparePTypes(entity0.object, entity1.object)
                }
                else if (entity0.object.type === DrawableType.Data) {

                    collision = this.compareDTypeAndPType(entity0.object, entity1.object)
                }
                else {

                    collision = this.compareDTypeAndPType(entity1.object, entity0.object)
                }

                if (collision === true) {

                    entity0.object.collision(entity1.id)
                    entity1.object.collision(entity0.id)
                    EventSystem.push(EventType.Collision)

                    if (collisions[entity1.id] && collisions[entity1.id].ids) {

                        collisions[entity1.id].ids.push(entity0.id)
                    }
                    else {

                        collisions[entity1.id] = {ids: [entity0.id]}
                    }
                    
                }
            })
        })
    }

    comparePTypes<T extends PType, U extends PType>(x: T, y: U): boolean {

        const xPoints = this.getPTypePoints(x)
        const yPoints = this.getPTypePoints(y)

        xPoints[0].forEach((element0, index0) => {

            yPoints[0].forEach((element1, index1) => {

                if (element0 === element1 && xPoints[1][index0] === yPoints[1][index1]) {

                    return true
                }
            })
        })

        return false
    }

    compareDTypeAndPType<T extends DType, U extends PType>(x: T, y: U) {

        for (var i = 0; i < y.size; i++) {

            var row = (y.position.y + i) * x.size
            
            for (var j = 0; j < y.size; j++) {

                var column = row + (y.position.x + j)

                if (x.data[column] === 1) {

                    return true
                }
            }
        }
        
        return false
    }

    getPTypePoints<T extends PType>(object: T): Array<Array<number>> {

        let xValues = []
        let yValues = []
        
        for (var i = 0; i < object.size; i++) {

            for (var j = 0; j < object.size; j++) {

                xValues.push(object.position.x + i)
                yValues.push(object.position.y + j)
            }
        }

        return [xValues, yValues]
    }
}
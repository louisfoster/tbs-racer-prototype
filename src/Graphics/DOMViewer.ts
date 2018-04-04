import Entities from "../Utils/Entity"
import IDrawable, { DrawableType } from "../Components/Drawable"
import { EventType } from "../Systems/Events"
import IPoint from "../Components/Point"
import IRacer from "../Components/Racer";

interface IDOMViewer {

    entitySystem: Entities
    size: number

    draw(entities: Entities)
}

export default class DOMViewer implements IDOMViewer {

    entitySystem: Entities
    size: number

    constructor(size: number = 200, entitySystem: Entities) {

        this.size = size
        this.entitySystem = entitySystem

        addEventListener(EventType.DrawableUpdated, () => {

            this.draw(this.entitySystem)
        })

        this.draw(this.entitySystem)
    }

    draw(entities: Entities) {

        const container =  document.getElementById('container')
        if(!container) return

        const drawables = entities.list.filter(entity => { return entity.object.draw })
        const dType = drawables.filter(entity => { return entity.object.type === DrawableType.Data })
        const pType = drawables.filter(entity => { return entity.object.type === DrawableType.PositionAndSize})

        let text: string = ""
        var test = false

        for (var i = 0; i < this.size; i++) {

            for (var j = 0; j < this.size; j++) {

                var playerMark = false
                
                pType.forEach(element => {

                    const o = element.object

                    for (var k = 0; k < o.size; k++) {

                        for (var l = 0; l < o.size; l++) {

                            let next = this.checkPosition(o, k, l, j, i)

                            if (next.length === 0) {

                                next = this.checkNextMoves(o, k, l, j, i)
                            }

                            if (next.length === 0) {

                                next = this.checkPreviousPoints(o, k, l, j, i)
                            }

                            if (next.length > 0) {
                            
                                text += next
                                playerMark = true
                            }
                        }
                    }
                })

                if(!playerMark) {

                    dType.forEach(element => {

                        const pointValue = element.object.data[i * this.size + j]
                        text += pointValue === 0 ? "#" : "•"

                        return
                    })
                }
            }

            text += "<br>"
        }

        container.innerHTML = text
    }

    checkPosition<T extends IDrawable>(racer: T, offsetX: number, offsetY: number, x: number, y: number): string {

        let text = ""

        if(racer.position) {

            const rX = racer.position.x + offsetX
            const rY = racer.position.y + offsetY

            if (rX === x && rY === y) {

                if (racer.collided) {

                    text = "<span class=\"object object--state-collided\">█</span>"
                }
                else {

                    text = "<span class=\"object object--state-normal\">█</span>"
                }
            }
        }

        return text
    }

    checkNextMoves<T extends IRacer>(racer: T, offsetX: number, offsetY: number, x: number, y: number): string {

        let text = ""

        if (racer.nextPrincipalPoint && !(racer.position.x === racer.nextPrincipalPoint.x && racer.position.y === racer.nextPrincipalPoint.y)) {

            const rX = racer.nextPrincipalPoint.x + offsetX
            const rY = racer.nextPrincipalPoint.y + offsetY

            if (rX === x && rY === y) {

                text = "<span class=\"nextMove nextMove--move-principal\">█</span>"
            }
        }
        
        if (text.length === 0 && racer.nextNeighbourPoints) {

            racer.nextNeighbourPoints.forEach(element => {

                const rX = element.x + offsetX
                const rY = element.y + offsetY
                
                if (rX === x && rY === y) {
    
                    text = "<span class=\"nextMove nextMove--move-neighbour\">█</span>"
                    return
                }
            })
        }

        return text
    }

    checkPreviousPoints<T extends IRacer>(racer: T, offsetX: number, offsetY: number, x: number, y: number): string {

        let text = ""

        if (racer.previousPositions) {

            racer.previousPositions.forEach(element => {

                const rX = element.x + offsetX
                const rY = element.y + offsetY
                
                if (rX === x && rY === y) {
    
                    text = "<span class=\"previousPoint\">█</span>"
                    return
                }
            })
        }

        return text
    }
}
import { BaseMap } from "../Map";
import { square } from "../../Utils/MathUtil"
import IPoint from "../Point";

interface ITestMap {

    boundaryWidth: number
    circleRadius: number
}

export default class TestMap extends BaseMap implements ITestMap {

    boundaryWidth: number
    circleRadius: number

    constructor(boundaryWidth: number = 4) {
        
        super()

        this.boundaryWidth = boundaryWidth
        this.circleRadius = square(this.size * 0.4)

        this.buildMapData()
    }

    buildMapData() {

        const mid = Math.round(this.size * 0.5)

        for (var i = 0; i < this.size; i++) {

            for (var j = 0; j < this.size; j++) {

                const distance = square(j - mid) + square(i - mid)

                if (i < this.boundaryWidth 
                    || j < this.boundaryWidth 
                    || i >= this.size - this.boundaryWidth 
                    || j >= this.size - this.boundaryWidth) {
    
                    this.data.push(1)
                }
                else {
    
                    this.data.push((distance > this.circleRadius) ? 0 : 1)
                }
            }
        }
    }

    getStartPoint(): IPoint {

        return {
            x: Math.round(this.size / 2),
            y: this.size - (this.boundaryWidth * 2)
        }
    }
}
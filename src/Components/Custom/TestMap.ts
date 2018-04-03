import { BaseMap } from "../Map";
import { square } from "../../Utils/MathUtil"

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
        this.circleRadius

        this.buildMapData()
    }

    buildMapData() {

        const mid = Math.round(this.rows * 0.5)

        for (var i = 0; i < this.rows; i++) {

            for (var j = 0; j < this.columns; j++) {

                const distance = square(j - mid) + square(i - mid)

                if (i < this.boundaryWidth 
                    || j < this.boundaryWidth 
                    || i >= this.rows - this.boundaryWidth 
                    || j >= this.columns - this.boundaryWidth) {
    
                    this.data.push(1)
                }
                else {
    
                    this.data.push((distance > this.circleRadius) ? 0 : 1)
                }
            }
        }
    }
}
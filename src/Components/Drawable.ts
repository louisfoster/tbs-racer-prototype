import IPoint from './Point'

export enum DrawableType {

    PositionAndSize,
    Data
}

export default interface IDrawable {

    // Type Position And Size
    position?: IPoint

    // Type Data
    data?: Array<number>

    // Number of points per position or,
    // Dimensions of data
    size: number 

    type: DrawableType
    draw: boolean

    collided: boolean
    collisionWith: number

    updated()
    collision(id: number)
}
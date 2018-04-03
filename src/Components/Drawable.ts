import IPoint from './Point'

export default interface IDrawable {

    position?: IPoint
    data?: Array<number>
    size?: number // Number of points per position
    draw: boolean

    updated()
}
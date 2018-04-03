import IVector from './Vector'
import IPoint from './Point'
import IDrawable from './Drawable'
import EventSystem, { EventType } from "../Systems/Events"

export enum RacerMove {

    UpLeft = 0,
    Up,
    UpRight,
    Left,
    Principal,
    Right,
    DownLeft,
    Down,
    DownRight
}

export default interface IRacer extends IDrawable {

    position: IPoint
    principalVector: IVector
    neighbourVectors: Array<IVector>
    size: number
    start: IPoint
    nextPrincipalPoint: IPoint
    nextNeighbourPoints: Array<IPoint>
    previousPositions: Array<IPoint>
    previousVectors: Array<IVector>

    updatePositionAndVectorData(move: RacerMove)

    setNextPositions()
}
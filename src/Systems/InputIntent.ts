import Entities from "../Utils/Entity";
import { EventType } from "./Events";

export enum InputType {

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

export interface IInteractive {

    interactive: boolean
    inputTypes: Array<InputType>

    onInput(input: InputType)
}

export default class InputIntent {

    entitySystem: Entities

    constructor(entitySystem: Entities) {

        this.entitySystem = entitySystem

        this.addListeners()
    }

    addListeners() {

        addEventListener(EventType.IntentUpLeft, () => this.handleInput(InputType.UpLeft))
        addEventListener(EventType.IntentUp, () => this.handleInput(InputType.Up))
        addEventListener(EventType.IntentUpRight, () => this.handleInput(InputType.UpRight))
        addEventListener(EventType.IntentLeft, () => this.handleInput(InputType.Left))
        addEventListener(EventType.IntentPrincipal, () => this.handleInput(InputType.Principal))
        addEventListener(EventType.IntentRight, () => this.handleInput(InputType.Right))
        addEventListener(EventType.IntentDownLeft, () => this.handleInput(InputType.DownLeft))
        addEventListener(EventType.IntentDown, () => this.handleInput(InputType.Down))
        addEventListener(EventType.IntentDownRight, () => this.handleInput(InputType.DownRight))
    }

    handleInput(input: InputType) {

        const interactive = this.entitySystem.list.filter(entity => entity.object.interactive)

        interactive.forEach(entity => {
            
            if (entity.object.inputTypes.includes(input)) {

                entity.object.onInput(input)
            }
        })
    }
}
export enum EventType {

    DrawableUpdated = "DrawableUpdated",
    Collision = "Collision",
    
    IntentUpLeft = "IntentUpLeft",
    IntentUp = "IntentUp",
    IntentUpRight = "IntentUpRight",
    IntentLeft = "IntentLeft",
    IntentPrincipal = "IntentPrincipal",
    IntentRight = "IntentRight",
    IntentDownLeft = "IntentDownLeft",
    IntentDown = "IntentDown",
    IntentDownRight = "IntentDownRight"
}

class EventSystem {

    eventTypes: Array<EventType>
    events: { EventType?: Event }
    dispatching: Array<EventType>

    constructor() {

        this.eventTypes = [
            EventType.DrawableUpdated,
            EventType.Collision,

            EventType.IntentUpLeft,
            EventType.IntentUp,
            EventType.IntentUpRight,
            EventType.IntentLeft,
            EventType.IntentPrincipal,
            EventType.IntentRight,
            EventType.IntentDownLeft,
            EventType.IntentDown,
            EventType.IntentDownRight
        ]

        this.setup()

        this.dispatching = []
    }

    setup() {

        this.events = {}

        this.eventTypes.forEach(element => {

            this.events[element] = new Event(element)
        })
    }

    push(event: EventType) {

        if (this.dispatching.indexOf(event) > -1) { return }

        let index = this.dispatching.length
        this.dispatching.push(event)
        setTimeout(() => this.nullDispatching(index), 500)

        dispatchEvent(this.events[event])
    }

    nullDispatching(index) {

        this.dispatching[index] = null

        if (this.dispatching.filter(el => el !== null).length > 0) {

            this.dispatching = []
        }
    }
}

const eventSystem = new EventSystem()
export default eventSystem
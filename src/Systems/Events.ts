export enum EventType {

    DrawableUpdated = "DrawableUpdated"
}

class EventSystem {

    eventTypes: Array<EventType>
    events: { EventType: Event }

    constructor() {

        this.eventTypes = [
            EventType.DrawableUpdated
        ]

        this.setup()
    }

    setup() {

        this.eventTypes.forEach(element => {

            this.events[EventType.DrawableUpdated] = new Event(element)
        })
    }

    push(EventType) {

        dispatchEvent(this.events[EventType])
    }
}

const eventSystem = new EventSystem()
export default eventSystem
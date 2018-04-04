import eventSystem, { EventType } from "../Systems/Events";

export default class ButtonGrid {

    constructor() {

        this.addListeners()
    }

    addListeners() {

        document.body.addEventListener('click', this.handleEvent)
    }

    handleEvent(event: Event) {

        const button = <HTMLButtonElement>event.target

        var dataId = button.getAttribute('data-id')
        var id = dataId ? dataId === "0" ? 0 : parseInt(dataId) : null
        if (id > -1 && id < 9) {

            switch(id) {

            case 0:
                eventSystem.push(EventType.IntentUpLeft)
                break
            case 1:
                eventSystem.push(EventType.IntentUp)
                break
            case 2:
                eventSystem.push(EventType.IntentUpRight)
                break
            case 3:
                eventSystem.push(EventType.IntentLeft)
                break
            case 4:
                eventSystem.push(EventType.IntentPrincipal)
                break
            case 5:
                eventSystem.push(EventType.IntentRight)
                break
            case 6:
                eventSystem.push(EventType.IntentDownLeft)
                break
            case 7:
                eventSystem.push(EventType.IntentDown)
                break
            case 8:
                eventSystem.push(EventType.IntentDownRight)
                break
            }
        }
    }
}
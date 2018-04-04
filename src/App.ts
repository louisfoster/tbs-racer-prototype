import Player0 from "./Components/Custom/Player0"
import TestMap from "./Components/Custom/TestMap"
import Collisions from "./Systems/Collisions"
import DOMViewer from "./Graphics/DOMViewer"
import IPoint from "./Components/Point";
import Entities from "./Utils/Entity";
import InputIntent from "./Systems/InputIntent";
import ButtonGrid from "./Interface/ButtonGrid";

interface AppInterface {

    player: Player0
    map: TestMap
    collisionSystem: Collisions
    viewer: DOMViewer
    entities: Entities
    inputIntent: InputIntent
    buttonInterface: ButtonGrid

    start: IPoint
}

class App implements AppInterface {

    player: Player0
    map: TestMap
    collisionSystem: Collisions
    viewer: DOMViewer
    entities: Entities
    inputIntent: InputIntent
    buttonInterface: ButtonGrid

    start: IPoint

    constructor() {

        this.map = new TestMap()

        this.start = this.map.getStartPoint()

        this.player = new Player0(this.start)

        this.entities = new Entities()
        this.entities.addEntity(this.player)
        this.entities.addEntity(this.map)

        this.collisionSystem = new Collisions(this.entities)

        this.viewer = new DOMViewer(this.map.size, this.entities)

        this.inputIntent = new InputIntent(this.entities)
        this.buttonInterface = new ButtonGrid()
    }

    public static main(): void {

        let app = new App

        console.log('starting app')
    }
}

App.main()
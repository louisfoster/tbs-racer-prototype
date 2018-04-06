import Camera from "./Camera"
import Level from "./Level"
import Scene from "./Scene"
import Canvas from "./Canvas"
import Entities from "../../Utils/Entity";
import { DrawableType } from "../../Components/Drawable";
import * as THREE from 'three'
import { OrbitControls } from "./OC"


interface IThreeDViewer {

    container: HTMLElement
    camera: Camera
    level: Level
    scene: Scene
    canvas: Canvas
    controls: any

    entitySystem: Entities
    mapSize: number
}

export default class ThreeDViewer implements IThreeDViewer {

    container: HTMLElement
    camera: Camera
    level: Level
    scene: Scene
    canvas: Canvas
    controls: any

    entitySystem: Entities
    mapSize: number

    constructor(mapSize: number, entitySystem: Entities) {

        this.entitySystem = entitySystem
        this.mapSize = mapSize

        this.container = document.getElementById('threeDContainer')
        this.camera = new Camera(this.container)
        
        this.level = new Level(this.mapSize, this.getActiveMapTypeEntity(this.entitySystem))
        let nodes = [this.level]
        this.scene = new Scene(nodes)
        this.canvas = new Canvas(this.container,
                                 this.camera,
                                 this.scene)
        
        this.controls = new OrbitControls(this.camera, this.canvas.renderer.domElement)
    }

    getActiveMapTypeEntity(entities: Entities): Array<number> {

        const drawables = entities.list.filter(entity => { return entity.object.draw })
        const map = drawables.find(entity => { return entity.object.type === DrawableType.Data })

        return map.object.data
    }
}
import * as THREE from 'three'
import Camera from './Camera'
import Scene from './Scene'

interface ICanvas {

    container: HTMLElement
    camera: Camera
    renderer: THREE.WebGLRenderer
    scene: Scene

    init: Function
    animate: Function
}

export default class Canvas implements ICanvas {

    container: HTMLElement
    camera: Camera
    renderer: THREE.WebGLRenderer
    scene: Scene

    constructor(container: HTMLElement, camera: Camera, scene: Scene) {

        this.container = container
        this.camera = camera

        this.renderer = new THREE.WebGLRenderer( { antialias: false } )

        this.scene = scene

        this.init()
        this.animate()
    }

    init() {

        this.renderer.setSize(this.container.clientWidth, 
                              this.container.clientHeight)
        this.container.appendChild(this.renderer.domElement)
    }

    animate() {

        requestAnimationFrame(this.animate.bind(this))
        this.scene.update()
        this.renderer.render(this.scene, this.camera)
    }
}
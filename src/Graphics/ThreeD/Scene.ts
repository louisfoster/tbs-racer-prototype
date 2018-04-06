import * as THREE from 'three'

interface Updatable extends THREE.Object3D {

    update: Function
}

interface IScene {

    scene: THREE.Scene
    children: Updatable[]
    update: Function
}

export default class Scene extends THREE.Scene implements IScene {

    scene: THREE.Scene
    children: Updatable[]

    constructor(children: Updatable[]) {

        super()

        children.forEach((child) => {

            this.add( child )
        })
    }

    public update() {

        this.children.forEach((node) => {

            node.update()
        })
    }
}
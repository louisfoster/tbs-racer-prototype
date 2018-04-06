import * as THREE from 'three'

interface ICamera {

    container: HTMLElement

    fieldOfView: number
    near: number
    far: number
}

export default class Camera extends THREE.PerspectiveCamera implements ICamera {
    
    container: HTMLElement

    fieldOfView: number
    near: number
    far: number

    constructor(container: HTMLElement, fieldOfView: number = 70, near: number = 0.1, far: number = 101) {

        super(fieldOfView, 
              container.clientWidth / container.clientHeight, 
              near, 
              far)

        this.container = container
        this.fieldOfView = fieldOfView
        this.near = near
        this.far = far

        // this.position.z = 20
    }
}
import * as THREE from 'three'

interface ILevel {

    mapData: Array<number>
    update: Function
}

export default class Level extends THREE.Mesh implements ILevel {

    mapData: Array<number>

    constructor(mapSize: number, mapData: Array<number>) {

        // Data.length === square(size)
        const data = mapData
        const size = mapSize

        let quad_vertices = []
        let quad_indices = []
        let quad_uvs = []

        for (var i = 0; i < size; i++) {

            for (var j = 0; j < size; j++) {

                let index = i * size + j
                let depth = data[index] * -2
                let lastDepth = (index > 0 ? data[index - 1] : depth) * -2

                let offsetX = j * 2.0
                let offsetY = i * 2.0

                quad_vertices.push(-1.0 + offsetX,  1.0 + offsetY, j === 0 ? depth : lastDepth)
                quad_vertices.push(1.0 + offsetX,  1.0 + offsetY, depth)
                quad_vertices.push(1.0 + offsetX, -1.0 + offsetY, i === 0 ? depth : lastDepth)
                quad_vertices.push(-1.0 + offsetX, -1.0 + offsetY, i === 0 && j === 0 ? depth : lastDepth)

                let iOffset = index * 4

                // Use the four vertices to draw the two triangles that make up the square.
                quad_indices = quad_indices.concat([
                    0 + iOffset, 
                    2 + iOffset, 
                    1 + iOffset, 
                    0 + iOffset, 
                    3 + iOffset, 
                    2 + iOffset
                ])

                // Each vertex has one uv coordinate for texture mapping
                quad_uvs = quad_uvs.concat([
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ])
            }
        }

        const geometry = new THREE.BufferGeometry()

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(quad_vertices), 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(quad_uvs), 2))
        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(quad_indices), 1))
        
        var material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load( 'noise.jpg' ),
            side: THREE.DoubleSide
        })
        
        super(geometry, material)
    }

    public update() {

        // this.rotation.y += 0.01
    }
}
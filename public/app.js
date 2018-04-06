define("Components/Vector", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Components/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Components/Drawable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DrawableType;
    (function (DrawableType) {
        DrawableType[DrawableType["PositionAndSize"] = 0] = "PositionAndSize";
        DrawableType[DrawableType["Data"] = 1] = "Data";
    })(DrawableType = exports.DrawableType || (exports.DrawableType = {}));
});
define("Systems/Events", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventType;
    (function (EventType) {
        EventType["DrawableUpdated"] = "DrawableUpdated";
        EventType["Collision"] = "Collision";
        EventType["IntentUpLeft"] = "IntentUpLeft";
        EventType["IntentUp"] = "IntentUp";
        EventType["IntentUpRight"] = "IntentUpRight";
        EventType["IntentLeft"] = "IntentLeft";
        EventType["IntentPrincipal"] = "IntentPrincipal";
        EventType["IntentRight"] = "IntentRight";
        EventType["IntentDownLeft"] = "IntentDownLeft";
        EventType["IntentDown"] = "IntentDown";
        EventType["IntentDownRight"] = "IntentDownRight";
    })(EventType = exports.EventType || (exports.EventType = {}));
    class EventSystem {
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
            ];
            this.setup();
            this.dispatching = [];
        }
        setup() {
            this.events = {};
            this.eventTypes.forEach(element => {
                this.events[element] = new Event(element);
            });
        }
        push(event) {
            if (this.dispatching.indexOf(event) > -1) {
                return;
            }
            let index = this.dispatching.length;
            this.dispatching.push(event);
            setTimeout(() => this.nullDispatching(index), 500);
            dispatchEvent(this.events[event]);
        }
        nullDispatching(index) {
            this.dispatching[index] = null;
            if (this.dispatching.filter(el => el !== null).length > 0) {
                this.dispatching = [];
            }
        }
    }
    const eventSystem = new EventSystem();
    exports.default = eventSystem;
});
define("Utils/MathUtil", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function square(x) {
        return x * x;
    }
    exports.square = square;
    function generateId() {
        return Math.floor((Math.random() * 100000) + 1);
    }
    exports.generateId = generateId;
});
define("Utils/Entity", ["require", "exports", "Utils/MathUtil"], function (require, exports, MathUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entities {
        constructor() {
            this.list = [];
            this.dict = {};
        }
        addEntity(object) {
            const id = MathUtil_1.generateId();
            this.dict[id] = object;
            this.list.push({ id: id, object: object });
        }
    }
    exports.default = Entities;
});
define("Systems/InputIntent", ["require", "exports", "Systems/Events"], function (require, exports, Events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputType;
    (function (InputType) {
        InputType[InputType["UpLeft"] = 0] = "UpLeft";
        InputType[InputType["Up"] = 1] = "Up";
        InputType[InputType["UpRight"] = 2] = "UpRight";
        InputType[InputType["Left"] = 3] = "Left";
        InputType[InputType["Principal"] = 4] = "Principal";
        InputType[InputType["Right"] = 5] = "Right";
        InputType[InputType["DownLeft"] = 6] = "DownLeft";
        InputType[InputType["Down"] = 7] = "Down";
        InputType[InputType["DownRight"] = 8] = "DownRight";
    })(InputType = exports.InputType || (exports.InputType = {}));
    class InputIntent {
        constructor(entitySystem) {
            this.entitySystem = entitySystem;
            this.addListeners();
        }
        addListeners() {
            addEventListener(Events_1.EventType.IntentUpLeft, () => this.handleInput(InputType.UpLeft));
            addEventListener(Events_1.EventType.IntentUp, () => this.handleInput(InputType.Up));
            addEventListener(Events_1.EventType.IntentUpRight, () => this.handleInput(InputType.UpRight));
            addEventListener(Events_1.EventType.IntentLeft, () => this.handleInput(InputType.Left));
            addEventListener(Events_1.EventType.IntentPrincipal, () => this.handleInput(InputType.Principal));
            addEventListener(Events_1.EventType.IntentRight, () => this.handleInput(InputType.Right));
            addEventListener(Events_1.EventType.IntentDownLeft, () => this.handleInput(InputType.DownLeft));
            addEventListener(Events_1.EventType.IntentDown, () => this.handleInput(InputType.Down));
            addEventListener(Events_1.EventType.IntentDownRight, () => this.handleInput(InputType.DownRight));
        }
        handleInput(input) {
            const interactive = this.entitySystem.list.filter(entity => entity.object.interactive);
            interactive.forEach(entity => {
                if (entity.object.inputTypes.includes(input)) {
                    entity.object.onInput(input);
                }
            });
        }
    }
    exports.default = InputIntent;
});
define("Components/Racer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Components/Custom/Player0", ["require", "exports", "Systems/Events", "Components/Drawable", "Systems/InputIntent"], function (require, exports, Events_2, Drawable_1, InputIntent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player0 {
        constructor(start, size = 2) {
            this.interactive = true;
            this.inputTypes = [
                InputIntent_1.InputType.UpLeft,
                InputIntent_1.InputType.Up,
                InputIntent_1.InputType.UpRight,
                InputIntent_1.InputType.Left,
                InputIntent_1.InputType.Principal,
                InputIntent_1.InputType.Right,
                InputIntent_1.InputType.DownLeft,
                InputIntent_1.InputType.Down,
                InputIntent_1.InputType.DownRight
            ];
            this.draw = true;
            this.type = Drawable_1.DrawableType.PositionAndSize;
            this.start = start;
            this.position = start;
            this.size = size;
            this.principalVector = { x: 1, y: 0 };
            this.neighbourVectors = [
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: -1, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: 1 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
            ];
            this.previousPositions = [];
            this.previousVectors = [];
            this.setNextPositions();
        }
        updatePositionAndVectorData(move) {
            this.previousPositions.push(this.position);
            this.previousVectors.push(this.principalVector);
            if (move === InputIntent_1.InputType.Principal) {
                this.position = this.nextPrincipalPoint;
            }
            else {
                let index = (move > 4) ? move - 1 : move;
                this.position = this.nextNeighbourPoints[index];
                this.principalVector.x += this.neighbourVectors[index].x;
                this.principalVector.y += this.neighbourVectors[index].y;
            }
            this.setNextPositions();
            this.updated();
        }
        setNextPositions() {
            const x = this.position.x;
            const y = this.position.y;
            const vecX = this.principalVector.x;
            const vecY = this.principalVector.y;
            const size = this.size;
            let positions = [];
            if (x === this.start.x && y === this.start.y) {
                this.nextPrincipalPoint = { x: x, y: y };
                this.nextNeighbourPoints = [
                    { x: x, y: y },
                    { x: x, y: y },
                    { x: x + size, y: y - size },
                    { x: x, y: y },
                    { x: x + size, y: y },
                    { x: x, y: y },
                    { x: x, y: y },
                    { x: x + size, y: y + size }
                ];
            }
            else {
                this.nextPrincipalPoint = {
                    x: x + (vecX * size),
                    y: y + (vecY * size)
                };
                this.nextNeighbourPoints = [];
                this.neighbourVectors.forEach(element => {
                    this.nextNeighbourPoints.push({
                        x: x + ((vecX + element.x) * size),
                        y: y + ((vecY + element.y) * size)
                    });
                });
            }
        }
        updated() {
            Events_2.default.push(Events_2.EventType.DrawableUpdated);
        }
        collision(id) {
            this.collided = true;
            this.collisionWith = id;
            this.updated();
        }
        onInput(input) {
            this.updatePositionAndVectorData(input);
        }
    }
    exports.default = Player0;
});
define("Components/Map", ["require", "exports", "Components/Drawable", "Systems/Events"], function (require, exports, Drawable_2, Events_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseMap {
        constructor(size = 200) {
            this.data = [];
            this.size = size;
            this.draw = true;
            this.type = Drawable_2.DrawableType.Data;
            this.collided = false;
        }
        buildMapData() {
        }
        mapData() {
            return this.data;
        }
        updated() {
            Events_3.default.push(Events_3.EventType.DrawableUpdated);
        }
        collision(id) {
            this.collided = true;
            this.collisionWith = id;
            this.updated();
        }
    }
    exports.BaseMap = BaseMap;
});
define("Components/Custom/TestMap", ["require", "exports", "Components/Map", "Utils/MathUtil"], function (require, exports, Map_1, MathUtil_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestMap extends Map_1.BaseMap {
        constructor(size = 200, boundaryWidth = 4) {
            super(size);
            this.boundaryWidth = boundaryWidth;
            this.circleRadius = MathUtil_2.square(this.size * 0.4);
            this.buildMapData();
        }
        buildMapData() {
            const mid = Math.round(this.size * 0.5);
            for (var i = 0; i < this.size; i++) {
                for (var j = 0; j < this.size; j++) {
                    const distance = MathUtil_2.square(j - mid) + MathUtil_2.square(i - mid);
                    if (i < this.boundaryWidth
                        || j < this.boundaryWidth
                        || i >= this.size - this.boundaryWidth
                        || j >= this.size - this.boundaryWidth) {
                        this.data.push(1);
                    }
                    else {
                        this.data.push((distance > this.circleRadius) ? 0 : 1);
                    }
                }
            }
        }
        getStartPoint() {
            return {
                x: Math.round(this.size / 2),
                y: this.size - (this.boundaryWidth * 2)
            };
        }
    }
    exports.default = TestMap;
});
define("Systems/Collisions", ["require", "exports", "Systems/Events", "Components/Drawable"], function (require, exports, Events_4, Drawable_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Collisions {
        constructor(entitySystem) {
            this.entitySystem = entitySystem;
            addEventListener(Events_4.EventType.DrawableUpdated, () => {
                this.checkCollisions(this.entitySystem);
            });
        }
        checkCollisions(entities) {
            const drawables = entities.list.filter(entity => { return entity.object.draw; });
            let collisions = {};
            drawables.forEach(entity0 => {
                drawables.forEach(entity1 => {
                    // Can't compare with self
                    if (entity0.id === entity1.id) {
                        return;
                    }
                    // If entities have already collided
                    if (collisions[entity1.id] && collisions[entity1.id].ids.includes(entity0.id)) {
                        return;
                    }
                    // Can't compare stationary objects
                    if (entity0.object.type === Drawable_3.DrawableType.Data &&
                        entity1.object.type === Drawable_3.DrawableType.Data) {
                        return;
                    }
                    let collision = false;
                    // If both entities have position + size
                    if (entity0.object.type === entity1.object.type) {
                        collision = this.comparePTypes(entity0.object, entity1.object);
                    }
                    else if (entity0.object.type === Drawable_3.DrawableType.Data) {
                        collision = this.compareDTypeAndPType(entity0.object, entity1.object);
                    }
                    else {
                        collision = this.compareDTypeAndPType(entity1.object, entity0.object);
                    }
                    if (collision === true) {
                        entity0.object.collision(entity1.id);
                        entity1.object.collision(entity0.id);
                        Events_4.default.push(Events_4.EventType.Collision);
                        if (collisions[entity1.id] && collisions[entity1.id].ids) {
                            collisions[entity1.id].ids.push(entity0.id);
                        }
                        else {
                            collisions[entity1.id] = { ids: [entity0.id] };
                        }
                    }
                });
            });
        }
        comparePTypes(x, y) {
            const xPoints = this.getPTypePoints(x);
            const yPoints = this.getPTypePoints(y);
            xPoints[0].forEach((element0, index0) => {
                yPoints[0].forEach((element1, index1) => {
                    if (element0 === element1 && xPoints[1][index0] === yPoints[1][index1]) {
                        return true;
                    }
                });
            });
            return false;
        }
        compareDTypeAndPType(x, y) {
            for (var i = 0; i < y.size; i++) {
                var row = (y.position.y + i) * x.size;
                for (var j = 0; j < y.size; j++) {
                    var column = row + (y.position.x + j);
                    if (x.data[column] === 1) {
                        return true;
                    }
                }
            }
            return false;
        }
        getPTypePoints(object) {
            let xValues = [];
            let yValues = [];
            for (var i = 0; i < object.size; i++) {
                for (var j = 0; j < object.size; j++) {
                    xValues.push(object.position.x + i);
                    yValues.push(object.position.y + j);
                }
            }
            return [xValues, yValues];
        }
    }
    exports.default = Collisions;
});
define("Graphics/DOMViewer", ["require", "exports", "Components/Drawable", "Systems/Events"], function (require, exports, Drawable_4, Events_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DOMViewer {
        constructor(size = 200, entitySystem) {
            this.size = size;
            this.entitySystem = entitySystem;
            addEventListener(Events_5.EventType.DrawableUpdated, () => {
                this.draw(this.entitySystem);
            });
            this.draw(this.entitySystem);
        }
        draw(entities) {
            const container = document.getElementById('container');
            if (!container)
                return;
            const drawables = entities.list.filter(entity => { return entity.object.draw; });
            const dType = drawables.filter(entity => { return entity.object.type === Drawable_4.DrawableType.Data; });
            const pType = drawables.filter(entity => { return entity.object.type === Drawable_4.DrawableType.PositionAndSize; });
            let text = "";
            var test = false;
            for (var i = 0; i < this.size; i++) {
                for (var j = 0; j < this.size; j++) {
                    var playerMark = false;
                    pType.forEach(element => {
                        const o = element.object;
                        for (var k = 0; k < o.size; k++) {
                            for (var l = 0; l < o.size; l++) {
                                let next = this.checkPosition(o, k, l, j, i);
                                if (next.length === 0) {
                                    next = this.checkNextMoves(o, k, l, j, i);
                                }
                                if (next.length === 0) {
                                    next = this.checkPreviousPoints(o, k, l, j, i);
                                }
                                if (next.length > 0) {
                                    text += next;
                                    playerMark = true;
                                }
                            }
                        }
                    });
                    if (!playerMark) {
                        dType.forEach(element => {
                            const pointValue = element.object.data[i * this.size + j];
                            text += pointValue === 0 ? "#" : "•";
                            return;
                        });
                    }
                }
                text += "<br>";
            }
            container.innerHTML = text;
        }
        checkPosition(racer, offsetX, offsetY, x, y) {
            let text = "";
            if (racer.position) {
                const rX = racer.position.x + offsetX;
                const rY = racer.position.y + offsetY;
                if (rX === x && rY === y) {
                    if (racer.collided) {
                        text = "<span class=\"object object--state-collided\">█</span>";
                    }
                    else {
                        text = "<span class=\"object object--state-normal\">█</span>";
                    }
                }
            }
            return text;
        }
        checkNextMoves(racer, offsetX, offsetY, x, y) {
            let text = "";
            if (racer.nextPrincipalPoint && !(racer.position.x === racer.nextPrincipalPoint.x && racer.position.y === racer.nextPrincipalPoint.y)) {
                const rX = racer.nextPrincipalPoint.x + offsetX;
                const rY = racer.nextPrincipalPoint.y + offsetY;
                if (rX === x && rY === y) {
                    text = "<span class=\"nextMove nextMove--move-principal\">█</span>";
                }
            }
            if (text.length === 0 && racer.nextNeighbourPoints) {
                racer.nextNeighbourPoints.forEach(element => {
                    const rX = element.x + offsetX;
                    const rY = element.y + offsetY;
                    if (rX === x && rY === y) {
                        text = "<span class=\"nextMove nextMove--move-neighbour\">█</span>";
                        return;
                    }
                });
            }
            return text;
        }
        checkPreviousPoints(racer, offsetX, offsetY, x, y) {
            let text = "";
            if (racer.previousPositions) {
                racer.previousPositions.forEach(element => {
                    const rX = element.x + offsetX;
                    const rY = element.y + offsetY;
                    if (rX === x && rY === y) {
                        text = "<span class=\"previousPoint\">█</span>";
                        return;
                    }
                });
            }
            return text;
        }
    }
    exports.default = DOMViewer;
});
define("Interface/ButtonGrid", ["require", "exports", "Systems/Events"], function (require, exports, Events_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ButtonGrid {
        constructor() {
            this.addListeners();
        }
        addListeners() {
            document.body.addEventListener('click', this.handleEvent);
        }
        handleEvent(event) {
            const button = event.target;
            var dataId = button.getAttribute('data-id');
            var id = dataId ? dataId === "0" ? 0 : parseInt(dataId) : null;
            if (id > -1 && id < 9) {
                switch (id) {
                    case 0:
                        Events_6.default.push(Events_6.EventType.IntentUpLeft);
                        break;
                    case 1:
                        Events_6.default.push(Events_6.EventType.IntentUp);
                        break;
                    case 2:
                        Events_6.default.push(Events_6.EventType.IntentUpRight);
                        break;
                    case 3:
                        Events_6.default.push(Events_6.EventType.IntentLeft);
                        break;
                    case 4:
                        Events_6.default.push(Events_6.EventType.IntentPrincipal);
                        break;
                    case 5:
                        Events_6.default.push(Events_6.EventType.IntentRight);
                        break;
                    case 6:
                        Events_6.default.push(Events_6.EventType.IntentDownLeft);
                        break;
                    case 7:
                        Events_6.default.push(Events_6.EventType.IntentDown);
                        break;
                    case 8:
                        Events_6.default.push(Events_6.EventType.IntentDownRight);
                        break;
                }
            }
        }
    }
    exports.default = ButtonGrid;
});
define("Graphics/ThreeD/Camera", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Camera extends THREE.PerspectiveCamera {
        constructor(container, fieldOfView = 70, near = 0.1, far = 101) {
            super(fieldOfView, container.clientWidth / container.clientHeight, near, far);
            this.container = container;
            this.fieldOfView = fieldOfView;
            this.near = near;
            this.far = far;
            // this.position.z = 20
        }
    }
    exports.default = Camera;
});
define("Graphics/ThreeD/Level", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Level extends THREE.Mesh {
        constructor(mapSize, mapData) {
            // Data.length === square(size)
            const data = mapData;
            const size = mapSize;
            let quad_vertices = [];
            let quad_indices = [];
            let quad_uvs = [];
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    let index = i * size + j;
                    let depth = data[index] * -2;
                    let lastDepth = (index > 0 ? data[index - 1] : depth) * -2;
                    let offsetX = j * 2.0;
                    let offsetY = i * 2.0;
                    quad_vertices.push(-1.0 + offsetX, 1.0 + offsetY, j === 0 ? depth : lastDepth);
                    quad_vertices.push(1.0 + offsetX, 1.0 + offsetY, depth);
                    quad_vertices.push(1.0 + offsetX, -1.0 + offsetY, i === 0 ? depth : lastDepth);
                    quad_vertices.push(-1.0 + offsetX, -1.0 + offsetY, i === 0 && j === 0 ? depth : lastDepth);
                    let iOffset = index * 4;
                    // Use the four vertices to draw the two triangles that make up the square.
                    quad_indices = quad_indices.concat([
                        0 + iOffset,
                        2 + iOffset,
                        1 + iOffset,
                        0 + iOffset,
                        3 + iOffset,
                        2 + iOffset
                    ]);
                    // Each vertex has one uv coordinate for texture mapping
                    quad_uvs = quad_uvs.concat([
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0
                    ]);
                }
            }
            const geometry = new THREE.BufferGeometry();
            // itemSize = 3 because there are 3 values (components) per vertex
            geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(quad_vertices), 3));
            geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(quad_uvs), 2));
            geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(quad_indices), 1));
            var material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('noise.jpg'),
                side: THREE.DoubleSide
            });
            super(geometry, material);
        }
        update() {
            // this.rotation.y += 0.01
        }
    }
    exports.default = Level;
});
define("Graphics/ThreeD/Scene", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene extends THREE.Scene {
        constructor(children) {
            super();
            children.forEach((child) => {
                this.add(child);
            });
        }
        update() {
            this.children.forEach((node) => {
                node.update();
            });
        }
    }
    exports.default = Scene;
});
define("Graphics/ThreeD/Canvas", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Canvas {
        constructor(container, camera, scene) {
            this.container = container;
            this.camera = camera;
            this.renderer = new THREE.WebGLRenderer({ antialias: false });
            this.scene = scene;
            this.init();
            this.animate();
        }
        init() {
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            this.container.appendChild(this.renderer.domElement);
        }
        animate() {
            requestAnimationFrame(this.animate.bind(this));
            this.scene.update();
            this.renderer.render(this.scene, this.camera);
        }
    }
    exports.default = Canvas;
});
define("Graphics/ThreeD/OC", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
    };
    const CHANGE_EVENT = { type: 'change' };
    const START_EVENT = { type: 'start' };
    const END_EVENT = { type: 'end' };
    const EPS = 0.000001;
    /**
    * @author qiao / https://github.com/qiao
    * @author mrdoob / http://mrdoob.com
    * @author alteredq / http://alteredqualia.com/
    * @author WestLangley / http://github.com/WestLangley
    * @author erich666 / http://erichaines.com
    * @author nicolaspanel / http://github.com/nicolaspanel
    *
    * This set of controls performs orbiting, dollying (zooming), and panning.
    * Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
    *    Orbit - left mouse / touch: one finger move
    *    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
    *    Pan - right mouse, or arrow keys / touch: three finger swipe
    */
    class OrbitControls extends THREE.EventDispatcher {
        constructor(object, domElement, domWindow) {
            super();
            this.object = object;
            this.domElement = (domElement !== undefined) ? domElement : document;
            this.window = (domWindow !== undefined) ? domWindow : window;
            // Set to false to disable this control
            this.enabled = true;
            // "target" sets the location of focus, where the object orbits around
            this.target = new THREE.Vector3();
            // How far you can dolly in and out ( PerspectiveCamera only )
            this.minDistance = 0;
            this.maxDistance = Infinity;
            // How far you can zoom in and out ( OrthographicCamera only )
            this.minZoom = 0;
            this.maxZoom = Infinity;
            // How far you can orbit vertically, upper and lower limits.
            // Range is 0 to Math.PI radians.
            this.minPolarAngle = 0; // radians
            this.maxPolarAngle = Math.PI; // radians
            // How far you can orbit horizontally, upper and lower limits.
            // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
            this.minAzimuthAngle = -Infinity; // radians
            this.maxAzimuthAngle = Infinity; // radians
            // Set to true to enable damping (inertia)
            // If damping is enabled, you must call controls.update() in your animation loop
            this.enableDamping = false;
            this.dampingFactor = 0.25;
            // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
            // Set to false to disable zooming
            this.enableZoom = true;
            this.zoomSpeed = 1.0;
            // Set to false to disable rotating
            this.enableRotate = true;
            this.rotateSpeed = 1.0;
            // Set to false to disable panning
            this.enablePan = true;
            this.keyPanSpeed = 7.0; // pixels moved per arrow key push
            // Set to true to automatically rotate around the target
            // If auto-rotate is enabled, you must call controls.update() in your animation loop
            this.autoRotate = false;
            this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
            // Set to false to disable use of the keys
            this.enableKeys = true;
            // The four arrow keys
            this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
            // Mouse buttons
            this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
            // for reset
            this.target0 = this.target.clone();
            this.position0 = this.object.position.clone();
            this.zoom0 = this.object.zoom;
            // for update speedup
            this.updateOffset = new THREE.Vector3();
            // so camera.up is the orbit axis
            this.updateQuat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
            this.updateQuatInverse = this.updateQuat.clone().inverse();
            this.updateLastPosition = new THREE.Vector3();
            this.updateLastQuaternion = new THREE.Quaternion();
            this.state = STATE.NONE;
            this.scale = 1;
            // current position in spherical coordinates
            this.spherical = new THREE.Spherical();
            this.sphericalDelta = new THREE.Spherical();
            this.panOffset = new THREE.Vector3();
            this.zoomChanged = false;
            this.rotateStart = new THREE.Vector2();
            this.rotateEnd = new THREE.Vector2();
            this.rotateDelta = new THREE.Vector2();
            this.panStart = new THREE.Vector2();
            this.panEnd = new THREE.Vector2();
            this.panDelta = new THREE.Vector2();
            this.dollyStart = new THREE.Vector2();
            this.dollyEnd = new THREE.Vector2();
            this.dollyDelta = new THREE.Vector2();
            this.panLeftV = new THREE.Vector3();
            this.panUpV = new THREE.Vector3();
            this.panInternalOffset = new THREE.Vector3();
            // event handlers - FSM: listen for events and reset state
            this.onMouseDown = (event) => {
                if (this.enabled === false)
                    return;
                event.preventDefault();
                if (event.button === this.mouseButtons.ORBIT) {
                    if (this.enableRotate === false)
                        return;
                    this.rotateStart.set(event.clientX, event.clientY);
                    this.state = STATE.ROTATE;
                }
                else if (event.button === this.mouseButtons.ZOOM) {
                    if (this.enableZoom === false)
                        return;
                    this.dollyStart.set(event.clientX, event.clientY);
                    this.state = STATE.DOLLY;
                }
                else if (event.button === this.mouseButtons.PAN) {
                    if (this.enablePan === false)
                        return;
                    this.panStart.set(event.clientX, event.clientY);
                    this.state = STATE.PAN;
                }
                if (this.state !== STATE.NONE) {
                    document.addEventListener('mousemove', this.onMouseMove, false);
                    document.addEventListener('mouseup', this.onMouseUp, false);
                    this.dispatchEvent(START_EVENT);
                }
            };
            this.onMouseMove = (event) => {
                if (this.enabled === false)
                    return;
                event.preventDefault();
                console.log(event);
                if (this.state === STATE.ROTATE) {
                    console.log("BOOOOP 3");
                    if (this.enableRotate === false)
                        return;
                    console.log("CLIENT X: " + event.clientX);
                    this.rotateEnd.set(event.clientX, event.clientY);
                    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
                    console.log("Rot end" + JSON.stringify(this.rotateEnd));
                    const element = this.domElement === document ? this.domElement.body : this.domElement;
                    // rotating across whole screen goes 360 degrees around
                    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
                    // rotating up and down along whole screen attempts to go 360, but limited to 180
                    this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
                    this.rotateStart.copy(this.rotateEnd);
                    this.update();
                }
                else if (this.state === STATE.DOLLY) {
                    console.log("BOOOOP 2");
                    if (this.enableZoom === false)
                        return;
                    this.dollyEnd.set(event.clientX, event.clientY);
                    this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                    if (this.dollyDelta.y > 0) {
                        this.dollyIn(this.getZoomScale());
                    }
                    else if (this.dollyDelta.y < 0) {
                        this.dollyOut(this.getZoomScale());
                    }
                    this.dollyStart.copy(this.dollyEnd);
                    this.update();
                }
                else if (this.state === STATE.PAN) {
                    console.log("BOOOOP 1");
                    if (this.enablePan === false)
                        return;
                    this.panEnd.set(event.clientX, event.clientY);
                    this.panDelta.subVectors(this.panEnd, this.panStart);
                    this.pan(this.panDelta.x, this.panDelta.y);
                    this.panStart.copy(this.panEnd);
                    this.update();
                }
            };
            this.onMouseUp = (event) => {
                if (this.enabled === false)
                    return;
                document.removeEventListener('mousemove', this.onMouseMove, false);
                document.removeEventListener('mouseup', this.onMouseUp, false);
                this.dispatchEvent(END_EVENT);
                this.state = STATE.NONE;
            };
            this.onMouseWheel = (event) => {
                if (this.enabled === false || this.enableZoom === false || (this.state !== STATE.NONE && this.state !== STATE.ROTATE))
                    return;
                event.preventDefault();
                event.stopPropagation();
                if (event.deltaY < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                else if (event.deltaY > 0) {
                    this.dollyIn(this.getZoomScale());
                }
                this.update();
                this.dispatchEvent(START_EVENT); // not sure why these are here...
                this.dispatchEvent(END_EVENT);
            };
            this.onKeyDown = (event) => {
                if (this.enabled === false || this.enableKeys === false || this.enablePan === false)
                    return;
                switch (event.keyCode) {
                    case this.keys.UP:
                        {
                            this.pan(0, this.keyPanSpeed);
                            this.update();
                        }
                        break;
                    case this.keys.BOTTOM:
                        {
                            this.pan(0, -this.keyPanSpeed);
                            this.update();
                        }
                        break;
                    case this.keys.LEFT:
                        {
                            this.pan(this.keyPanSpeed, 0);
                            this.update();
                        }
                        break;
                    case this.keys.RIGHT:
                        {
                            this.pan(-this.keyPanSpeed, 0);
                            this.update();
                        }
                        break;
                }
            };
            this.onTouchStart = (event) => {
                if (this.enabled === false)
                    return;
                switch (event.touches.length) {
                    // one-fingered touch: rotate
                    case 1:
                        {
                            if (this.enableRotate === false)
                                return;
                            this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                            this.state = STATE.TOUCH_ROTATE;
                        }
                        break;
                    // two-fingered touch: dolly
                    case 2:
                        {
                            if (this.enableZoom === false)
                                return;
                            var dx = event.touches[0].pageX - event.touches[1].pageX;
                            var dy = event.touches[0].pageY - event.touches[1].pageY;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            this.dollyStart.set(0, distance);
                            this.state = STATE.TOUCH_DOLLY;
                        }
                        break;
                    // three-fingered touch: pan
                    case 3:
                        {
                            if (this.enablePan === false)
                                return;
                            this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
                            this.state = STATE.TOUCH_PAN;
                        }
                        break;
                    default: {
                        this.state = STATE.NONE;
                    }
                }
                if (this.state !== STATE.NONE) {
                    this.dispatchEvent(START_EVENT);
                }
            };
            this.onTouchMove = (event) => {
                if (this.enabled === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                switch (event.touches.length) {
                    // one-fingered touch: rotate
                    case 1:
                        {
                            if (this.enableRotate === false)
                                return;
                            if (this.state !== STATE.TOUCH_ROTATE)
                                return; // is this needed?...
                            this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                            this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
                            var element = this.domElement === document ? this.domElement.body : this.domElement;
                            // rotating across whole screen goes 360 degrees around
                            this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
                            // rotating up and down along whole screen attempts to go 360, but limited to 180
                            this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
                            this.rotateStart.copy(this.rotateEnd);
                            this.update();
                        }
                        break;
                    // two-fingered touch: dolly
                    case 2:
                        {
                            if (this.enableZoom === false)
                                return;
                            if (this.state !== STATE.TOUCH_DOLLY)
                                return; // is this needed?...
                            //console.log( 'handleTouchMoveDolly' );
                            var dx = event.touches[0].pageX - event.touches[1].pageX;
                            var dy = event.touches[0].pageY - event.touches[1].pageY;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            this.dollyEnd.set(0, distance);
                            this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                            if (this.dollyDelta.y > 0) {
                                this.dollyOut(this.getZoomScale());
                            }
                            else if (this.dollyDelta.y < 0) {
                                this.dollyIn(this.getZoomScale());
                            }
                            this.dollyStart.copy(this.dollyEnd);
                            this.update();
                        }
                        break;
                    // three-fingered touch: pan
                    case 3:
                        {
                            if (this.enablePan === false)
                                return;
                            if (this.state !== STATE.TOUCH_PAN)
                                return; // is this needed?...
                            this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                            this.panDelta.subVectors(this.panEnd, this.panStart);
                            this.pan(this.panDelta.x, this.panDelta.y);
                            this.panStart.copy(this.panEnd);
                            this.update();
                        }
                        break;
                    default: {
                        this.state = STATE.NONE;
                    }
                }
            };
            this.onTouchEnd = (event) => {
                if (this.enabled === false)
                    return;
                this.dispatchEvent(END_EVENT);
                this.state = STATE.NONE;
            };
            this.onContextMenu = (event) => {
                event.preventDefault();
            };
            this.domElement.addEventListener('contextmenu', this.onContextMenu, false);
            this.domElement.addEventListener('mousedown', this.onMouseDown, false);
            this.domElement.addEventListener('wheel', this.onMouseWheel, false);
            this.domElement.addEventListener('touchstart', this.onTouchStart, false);
            this.domElement.addEventListener('touchend', this.onTouchEnd, false);
            this.domElement.addEventListener('touchmove', this.onTouchMove, false);
            this.window.addEventListener('keydown', this.onKeyDown, false);
            // force an update at start
            this.update();
        }
        update() {
            const position = this.object.position;
            console.log(this.target);
            this.updateOffset.copy(position).sub(this.target);
            // rotate offset to "y-axis-is-up" space
            console.log(this.updateQuat);
            this.updateOffset.applyQuaternion(this.updateQuat);
            // angle from z-axis around y-axis
            this.spherical.setFromVector3(this.updateOffset);
            if (this.autoRotate && this.state === STATE.NONE) {
                this.rotateLeft(this.getAutoRotationAngle());
            }
            this.spherical.theta += this.sphericalDelta.theta;
            this.spherical.phi += this.sphericalDelta.phi;
            // restrict theta to be between desired limits
            this.spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this.spherical.theta));
            // restrict phi to be between desired limits
            this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));
            this.spherical.makeSafe();
            this.spherical.radius *= this.scale;
            // restrict radius to be between desired limits
            this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
            // move target to panned location
            this.target.add(this.panOffset);
            this.updateOffset.setFromSpherical(this.spherical);
            console.log("sph " + JSON.stringify(this.spherical));
            console.log("updoff" + JSON.stringify(this.updateOffset));
            // rotate offset back to "camera-up-vector-is-up" space
            this.updateOffset.applyQuaternion(this.updateQuatInverse);
            console.log("offset" + JSON.stringify(this.updateOffset));
            this.object.position.copy(this.target).add(this.updateOffset);
            this.object.lookAt(this.target);
            if (this.enableDamping === true) {
                this.sphericalDelta.theta *= (1 - this.dampingFactor);
                this.sphericalDelta.phi *= (1 - this.dampingFactor);
            }
            else {
                this.sphericalDelta.set(0, 0, 0);
            }
            this.scale = 1;
            this.panOffset.set(0, 0, 0);
            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8
            if (this.zoomChanged ||
                this.updateLastPosition.distanceToSquared(this.object.position) > EPS ||
                8 * (1 - this.updateLastQuaternion.dot(this.object.quaternion)) > EPS) {
                this.dispatchEvent(CHANGE_EVENT);
                this.updateLastPosition.copy(this.object.position);
                this.updateLastQuaternion.copy(this.object.quaternion);
                this.zoomChanged = false;
                return true;
            }
            return false;
        }
        panLeft(distance, objectMatrix) {
            this.panLeftV.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
            this.panLeftV.multiplyScalar(-distance);
            this.panOffset.add(this.panLeftV);
        }
        panUp(distance, objectMatrix) {
            this.panUpV.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
            this.panUpV.multiplyScalar(distance);
            this.panOffset.add(this.panUpV);
        }
        // deltaX and deltaY are in pixels; right and down are positive
        pan(deltaX, deltaY) {
            const element = this.domElement === document ? this.domElement.body : this.domElement;
            if (this.object instanceof THREE.PerspectiveCamera) {
                // perspective
                const position = this.object.position;
                this.panInternalOffset.copy(position).sub(this.target);
                var targetDistance = this.panInternalOffset.length();
                // half of the fov is center to top of screen
                targetDistance *= Math.tan((this.object.fov / 2) * Math.PI / 180.0);
                // we actually don't use screenWidth, since perspective camera is fixed to screen height
                this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
                this.panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
            }
            else if (this.object instanceof THREE.OrthographicCamera) {
                // orthographic
                this.panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
                this.panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
            }
            else {
                // camera neither orthographic nor perspective
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                this.enablePan = false;
            }
        }
        dollyIn(dollyScale) {
            if (this.object instanceof THREE.PerspectiveCamera) {
                this.scale /= dollyScale;
            }
            else if (this.object instanceof THREE.OrthographicCamera) {
                this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
                this.object.updateProjectionMatrix();
                this.zoomChanged = true;
            }
            else {
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                this.enableZoom = false;
            }
        }
        dollyOut(dollyScale) {
            if (this.object instanceof THREE.PerspectiveCamera) {
                this.scale *= dollyScale;
            }
            else if (this.object instanceof THREE.OrthographicCamera) {
                this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
                this.object.updateProjectionMatrix();
                this.zoomChanged = true;
            }
            else {
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                this.enableZoom = false;
            }
        }
        getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
        }
        getZoomScale() {
            return Math.pow(0.95, this.zoomSpeed);
        }
        rotateLeft(angle) {
            this.sphericalDelta.theta -= angle;
        }
        rotateUp(angle) {
            console.log("angle: " + angle);
            this.sphericalDelta.phi -= angle;
            console.log(this.sphericalDelta);
        }
        getPolarAngle() {
            return this.spherical.phi;
        }
        getAzimuthalAngle() {
            return this.spherical.theta;
        }
        dispose() {
            this.domElement.removeEventListener('contextmenu', this.onContextMenu, false);
            this.domElement.removeEventListener('mousedown', this.onMouseDown, false);
            this.domElement.removeEventListener('wheel', this.onMouseWheel, false);
            this.domElement.removeEventListener('touchstart', this.onTouchStart, false);
            this.domElement.removeEventListener('touchend', this.onTouchEnd, false);
            this.domElement.removeEventListener('touchmove', this.onTouchMove, false);
            document.removeEventListener('mousemove', this.onMouseMove, false);
            document.removeEventListener('mouseup', this.onMouseUp, false);
            this.window.removeEventListener('keydown', this.onKeyDown, false);
            //this.dispatchEvent( { type: 'dispose' } ); // should this be added here?
        }
        reset() {
            this.target.copy(this.target0);
            this.object.position.copy(this.position0);
            this.object.zoom = this.zoom0;
            this.object.updateProjectionMatrix();
            this.dispatchEvent(CHANGE_EVENT);
            this.update();
            this.state = STATE.NONE;
        }
        // backward compatibility
        get center() {
            console.warn('THREE.OrbitControls: .center has been renamed to .target');
            return this.target;
        }
        get noZoom() {
            console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
            return !this.enableZoom;
        }
        set noZoom(value) {
            console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
            this.enableZoom = !value;
        }
    }
    exports.OrbitControls = OrbitControls;
});
define("Graphics/ThreeD/ThreeDViewer", ["require", "exports", "Graphics/ThreeD/Camera", "Graphics/ThreeD/Level", "Graphics/ThreeD/Scene", "Graphics/ThreeD/Canvas", "Components/Drawable", "Graphics/ThreeD/OC"], function (require, exports, Camera_1, Level_1, Scene_1, Canvas_1, Drawable_5, OC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ThreeDViewer {
        constructor(mapSize, entitySystem) {
            this.entitySystem = entitySystem;
            this.mapSize = mapSize;
            this.container = document.getElementById('threeDContainer');
            this.camera = new Camera_1.default(this.container);
            this.level = new Level_1.default(this.mapSize, this.getActiveMapTypeEntity(this.entitySystem));
            let nodes = [this.level];
            this.scene = new Scene_1.default(nodes);
            this.canvas = new Canvas_1.default(this.container, this.camera, this.scene);
            this.controls = new OC_1.OrbitControls(this.camera, this.canvas.renderer.domElement);
        }
        getActiveMapTypeEntity(entities) {
            const drawables = entities.list.filter(entity => { return entity.object.draw; });
            const map = drawables.find(entity => { return entity.object.type === Drawable_5.DrawableType.Data; });
            return map.object.data;
        }
    }
    exports.default = ThreeDViewer;
});
define("App", ["require", "exports", "Components/Custom/Player0", "Components/Custom/TestMap", "Systems/Collisions", "Graphics/DOMViewer", "Utils/Entity", "Systems/InputIntent", "Interface/ButtonGrid", "Graphics/ThreeD/ThreeDViewer"], function (require, exports, Player0_1, TestMap_1, Collisions_1, DOMViewer_1, Entity_1, InputIntent_2, ButtonGrid_1, ThreeDViewer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            this.map = new TestMap_1.default(10, 1);
            this.start = this.map.getStartPoint();
            this.player = new Player0_1.default(this.start);
            this.entities = new Entity_1.default();
            this.entities.addEntity(this.player);
            this.entities.addEntity(this.map);
            this.collisionSystem = new Collisions_1.default(this.entities);
            this.domViewer = new DOMViewer_1.default(this.map.size, this.entities);
            this.threeDViewer = new ThreeDViewer_1.default(this.map.size, this.entities);
            this.inputIntent = new InputIntent_2.default(this.entities);
            this.buttonInterface = new ButtonGrid_1.default();
        }
        static main() {
            let app = new App;
            console.log('starting app');
        }
    }
    App.main();
});
// Harness Class for nodes tracking nodes (e.g. camera tracking avatar)
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */
// var THREE = require('three');
define("Graphics/ThreeD/OrbitControls", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function OrbitControls(object, domElement) {
        this.object = object;
        this.domElement = (domElement !== undefined) ? domElement : document;
        // API
        this.enabled = true;
        this.center = new THREE.Vector3();
        this.userZoom = true;
        this.userZoomSpeed = 1.0;
        this.userRotate = true;
        this.userRotateSpeed = 1.0;
        this.userPan = true;
        this.userPanSpeed = 2.0;
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        this.minDistance = 0;
        this.maxDistance = Infinity;
        // 65 /*A*/, 83 /*S*/, 68 /*D*/
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ROTATE: 65, ZOOM: 83, PAN: 68 };
        // internals
        var scope = this;
        var EPS = 0.000001;
        var PIXELS_PER_ROUND = 1800;
        var rotateStart = new THREE.Vector2();
        var rotateEnd = new THREE.Vector2();
        var rotateDelta = new THREE.Vector2();
        var zoomStart = new THREE.Vector2();
        var zoomEnd = new THREE.Vector2();
        var zoomDelta = new THREE.Vector2();
        var phiDelta = 0;
        var thetaDelta = 0;
        var scale = 1;
        var lastPosition = new THREE.Vector3();
        var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
        var state = STATE.NONE;
        // events
        var changeEvent = { type: 'change' };
        this.rotateLeft = function (angle) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            thetaDelta -= angle;
        };
        this.rotateRight = function (angle) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            thetaDelta += angle;
        };
        this.rotateUp = function (angle) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            phiDelta -= angle;
        };
        this.rotateDown = function (angle) {
            if (angle === undefined) {
                angle = getAutoRotationAngle();
            }
            phiDelta += angle;
        };
        this.zoomIn = function (zoomScale) {
            if (zoomScale === undefined) {
                zoomScale = getZoomScale();
            }
            scale /= zoomScale;
        };
        this.zoomOut = function (zoomScale) {
            if (zoomScale === undefined) {
                zoomScale = getZoomScale();
            }
            scale *= zoomScale;
        };
        this.pan = function (distance) {
            distance.transformDirection(this.object.matrix);
            distance.multiplyScalar(scope.userPanSpeed);
            this.object.position.add(distance);
            this.center.add(distance);
        };
        this.update = function () {
            console.log('upd');
            var position = this.object.position;
            var offset = position.clone().sub(this.center);
            console.log(this.object);
            // angle from z-axis around y-axis
            var theta = Math.atan2(offset.x, offset.z);
            // angle from y-axis
            var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
            if (this.autoRotate) {
                this.rotateLeft(getAutoRotationAngle());
            }
            theta += thetaDelta;
            phi += phiDelta;
            // restrict phi to be between desired limits
            phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));
            // restrict phi to be betwee EPS and PI-EPS
            phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
            var radius = offset.length() * scale;
            // restrict radius to be between desired limits
            radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));
            offset.x = radius * Math.sin(phi) * Math.sin(theta);
            offset.y = radius * Math.cos(phi);
            offset.z = radius * Math.sin(phi) * Math.cos(theta);
            position.copy(this.center).add(offset);
            console.log(position);
            this.object.lookAt(this.center);
            thetaDelta = 0;
            phiDelta = 0;
            scale = 1;
            if (lastPosition.distanceTo(this.object.position) > 0) {
                this.dispatchEvent(changeEvent);
                lastPosition.copy(this.object.position);
            }
        };
        function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
        }
        function getZoomScale() {
            return Math.pow(0.95, scope.userZoomSpeed);
        }
        function onMouseDown(event) {
            if (scope.enabled === false)
                return;
            if (scope.userRotate === false)
                return;
            event.preventDefault();
            if (state === STATE.NONE) {
                if (event.button === 0)
                    state = STATE.ROTATE;
                if (event.button === 1)
                    state = STATE.ZOOM;
                if (event.button === 2)
                    state = STATE.PAN;
            }
            if (state === STATE.ROTATE) {
                //state = STATE.ROTATE;
                rotateStart.set(event.clientX, event.clientY);
            }
            else if (state === STATE.ZOOM) {
                //state = STATE.ZOOM;
                zoomStart.set(event.clientX, event.clientY);
            }
            else if (state === STATE.PAN) {
                //state = STATE.PAN;
            }
            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('mouseup', onMouseUp, false);
        }
        function onMouseMove(event) {
            if (scope.enabled === false)
                return;
            event.preventDefault();
            if (state === STATE.ROTATE) {
                rotateEnd.set(event.clientX, event.clientY);
                rotateDelta.subVectors(rotateEnd, rotateStart);
                scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);
                scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);
                rotateStart.copy(rotateEnd);
            }
            else if (state === STATE.ZOOM) {
                zoomEnd.set(event.clientX, event.clientY);
                zoomDelta.subVectors(zoomEnd, zoomStart);
                if (zoomDelta.y > 0) {
                    scope.zoomIn();
                }
                else {
                    scope.zoomOut();
                }
                zoomStart.copy(zoomEnd);
            }
            else if (state === STATE.PAN) {
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                scope.pan(new THREE.Vector3(-movementX, movementY, 0));
            }
        }
        function onMouseUp(event) {
            console.log('test');
            if (scope.enabled === false)
                return;
            if (scope.userRotate === false)
                return;
            console.log('test 2');
            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);
            state = STATE.NONE;
            scope.update();
        }
        function onMouseWheel(event) {
            if (scope.enabled === false)
                return;
            if (scope.userZoom === false)
                return;
            var delta = 0;
            if (event.wheelDelta) { // WebKit / Opera / Explorer 9
                delta = event.wheelDelta;
            }
            else if (event.detail) { // Firefox
                delta = -event.detail;
            }
            if (delta > 0) {
                scope.zoomOut();
            }
            else {
                scope.zoomIn();
            }
        }
        function onKeyDown(event) {
            if (scope.enabled === false)
                return;
            if (scope.userPan === false)
                return;
            switch (event.keyCode) {
                /*case scope.keys.UP:
                    scope.pan( new THREE.Vector3( 0, 1, 0 ) );
                    break;
                case scope.keys.BOTTOM:
                    scope.pan( new THREE.Vector3( 0, - 1, 0 ) );
                    break;
                case scope.keys.LEFT:
                    scope.pan( new THREE.Vector3( - 1, 0, 0 ) );
                    break;
                case scope.keys.RIGHT:
                    scope.pan( new THREE.Vector3( 1, 0, 0 ) );
                    break;
                */
                case scope.keys.ROTATE:
                    state = STATE.ROTATE;
                    break;
                case scope.keys.ZOOM:
                    state = STATE.ZOOM;
                    break;
                case scope.keys.PAN:
                    state = STATE.PAN;
                    break;
            }
        }
        function onKeyUp(event) {
            switch (event.keyCode) {
                case scope.keys.ROTATE:
                case scope.keys.ZOOM:
                case scope.keys.PAN:
                    state = STATE.NONE;
                    break;
            }
        }
        function contextBlock(event) {
            event.preventDefault();
        }
        this.domElement.addEventListener('contextmenu', contextBlock, false);
        this.domElement.addEventListener('mousedown', onMouseDown, false);
        this.domElement.addEventListener('mousewheel', onMouseWheel, false);
        this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
        this.destroy = function () {
            this.domElement.removeEventListener('contextmenu', contextBlock);
            this.domElement.removeEventListener('mousedown', onMouseDown);
            this.domElement.removeEventListener('mousewheel', onMouseWheel);
            this.domElement.removeEventListener('DOMMouseScroll', onMouseWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }
    exports.default = OrbitControls;
    ;
    OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
});
// module.exports = OrbitControls;
//# sourceMappingURL=App.js.map
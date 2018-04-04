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
        constructor(boundaryWidth = 4) {
            super();
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
define("App", ["require", "exports", "Components/Custom/Player0", "Components/Custom/TestMap", "Systems/Collisions", "Graphics/DOMViewer", "Utils/Entity", "Systems/InputIntent", "Interface/ButtonGrid"], function (require, exports, Player0_1, TestMap_1, Collisions_1, DOMViewer_1, Entity_1, InputIntent_2, ButtonGrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            this.map = new TestMap_1.default();
            this.start = this.map.getStartPoint();
            this.player = new Player0_1.default(this.start);
            this.entities = new Entity_1.default();
            this.entities.addEntity(this.player);
            this.entities.addEntity(this.map);
            this.collisionSystem = new Collisions_1.default(this.entities);
            this.viewer = new DOMViewer_1.default(this.map.size, this.entities);
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
//# sourceMappingURL=App.js.map
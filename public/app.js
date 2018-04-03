class App {
    constructor() {
    }
    static main() {
        let app = new App;
        console.log('test');
    }
}
App.main();
define("Components/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Components/Drawable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Systems/Events", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventType;
    (function (EventType) {
        EventType["DrawableUpdated"] = "DrawableUpdated";
    })(EventType = exports.EventType || (exports.EventType = {}));
    class EventSystem {
        constructor() {
            this.eventTypes = [
                EventType.DrawableUpdated
            ];
            this.setup();
        }
        setup() {
            this.eventTypes.forEach(element => {
                this.events[EventType.DrawableUpdated] = new Event(element);
            });
        }
        push(EventType) {
            dispatchEvent(this.events[EventType]);
        }
    }
    const eventSystem = new EventSystem();
    exports.default = eventSystem;
});
define("Components/Map", ["require", "exports", "Systems/Events"], function (require, exports, Events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseMap {
        constructor(rows = 200, columns = rows) {
            this.rows = rows;
            this.columns = columns;
            this.data = [];
            this.draw = true;
        }
        buildMapData() {
        }
        mapData() {
            return this.data;
        }
        updated() {
            Events_1.default.push(Events_1.EventType.DrawableUpdated);
        }
    }
    exports.BaseMap = BaseMap;
});
define("Components/Vector", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Components/Racer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RacerMove;
    (function (RacerMove) {
        RacerMove[RacerMove["UpLeft"] = 0] = "UpLeft";
        RacerMove[RacerMove["Up"] = 1] = "Up";
        RacerMove[RacerMove["UpRight"] = 2] = "UpRight";
        RacerMove[RacerMove["Left"] = 3] = "Left";
        RacerMove[RacerMove["Principal"] = 4] = "Principal";
        RacerMove[RacerMove["Right"] = 5] = "Right";
        RacerMove[RacerMove["DownLeft"] = 6] = "DownLeft";
        RacerMove[RacerMove["Down"] = 7] = "Down";
        RacerMove[RacerMove["DownRight"] = 8] = "DownRight";
    })(RacerMove = exports.RacerMove || (exports.RacerMove = {}));
});
define("Components/Custom/Player0", ["require", "exports", "Components/Racer", "Systems/Events"], function (require, exports, Racer_1, Events_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player0 {
        constructor(start, size = 2) {
            this.draw = true;
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
            this.setNextPositions();
        }
        updatePositionAndVectorData(move) {
            this.previousPositions.push(this.position);
            this.previousVectors.push(this.principalVector);
            this.position = (move === Racer_1.RacerMove.Principal) ? this.nextPrincipalPoint :
                this.nextNeighbourPoints[move];
            if (move !== Racer_1.RacerMove.Principal) {
                this.principalVector.x += this.neighbourVectors[move].x;
                this.principalVector.y += this.neighbourVectors[move].y;
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
    }
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
define("Components/Custom/TestMap", ["require", "exports", "Components/Map", "Utils/MathUtil"], function (require, exports, Map_1, MathUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestMap extends Map_1.BaseMap {
        constructor(boundaryWidth = 4) {
            super();
            this.boundaryWidth = boundaryWidth;
            this.circleRadius;
            this.buildMapData();
        }
        buildMapData() {
            const mid = Math.round(this.rows * 0.5);
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    const distance = MathUtil_1.square(j - mid) + MathUtil_1.square(i - mid);
                    if (i < this.boundaryWidth
                        || j < this.boundaryWidth
                        || i >= this.rows - this.boundaryWidth
                        || j >= this.columns - this.boundaryWidth) {
                        this.data.push(1);
                    }
                    else {
                        this.data.push((distance > this.circleRadius) ? 0 : 1);
                    }
                }
            }
        }
    }
    exports.default = TestMap;
});
class Collisions {
}
define("Utils/Entity", ["require", "exports", "Utils/MathUtil"], function (require, exports, MathUtil_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entities {
        constructor() {
            this.list = [];
            this.dict = {};
        }
        addEntity(object) {
            const id = MathUtil_2.generateId();
            this.dict[id] = object;
            this.list.push({ id: id, object: object });
        }
    }
});
//# sourceMappingURL=App.js.map
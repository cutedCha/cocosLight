
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/demoMain');
require('./assets/drawModule');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/drawModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c16c5AUMwBCRo9K8SzIkU2m', 'drawModule');
// drawModule.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawModule = void 0;
var demoMain_1 = require("./demoMain");
var drawModule;
(function (drawModule) {
    function drawSector(angle, minAngle, radius) {
        var vertices = [];
        var startPos = cc.v2(radius, 0);
        var colors = [];
        var indices = [];
        var uvs = [];
        var indicesIndex = 0;
        for (var i = 0; i < angle; i += minAngle) {
            var startAngle = i;
            var currentAngle = startAngle + minAngle;
            var upPos = rotatePointAroundOrigin(startPos, startAngle);
            var currentPos = rotatePointAroundOrigin(startPos, currentAngle);
            vertices.push(cc.v2(0, 0));
            vertices.push(upPos);
            vertices.push(currentPos);
            indices.push(indicesIndex);
            indicesIndex++;
            indices.push(indicesIndex);
            indicesIndex++;
            indices.push(indicesIndex);
            indicesIndex++;
            for (var j = 0; j < 3; j++) {
                colors.push(cc.Color.YELLOW);
            }
            uvs.push(cc.v2(0, 0), cc.v2(0, 1), cc.v2(1, 0));
        }
        return {
            vertices: vertices,
            indices: indices,
            uvs: uvs,
            colors: colors,
        };
    }
    drawModule.drawSector = drawSector;
    function rotatePointAroundOrigin(startAngle, angle) {
        var radians = (angle * Math.PI) / 180;
        var cosAngle = Math.cos(radians);
        var sinAngle = Math.sin(radians);
        var x = startAngle.x, y = startAngle.y;
        var rotatedX = x * cosAngle + y * sinAngle;
        var rotatedY = y * cosAngle - x * sinAngle;
        return cc.v2({ x: rotatedX, y: rotatedY });
    }
    drawModule.rotatePointAroundOrigin = rotatePointAroundOrigin;
    /**
     * 渲染灯光
     * @param node
     * @param angle
     */
    function renderNodeMesh(node, angle, radius) {
        var mesh = new cc.Mesh();
        var meshRender = node.getComponent(cc.MeshRenderer) || node.addComponent(cc.MeshRenderer);
        meshRender.mesh = mesh;
        var d = drawModule.drawSector(angle, 1, 1);
        for (var i = 0; i < d.vertices.length; i++) {
            var item = d.vertices[i];
            if (!item.x && !item.y)
                continue;
            var ray = rayCaseLine(node.position, item, radius);
            d.vertices[i] = item.mul(ray);
        }
        var renderEngine = cc.renderer.renderEngine;
        var gfx = cc["gfx"];
        var vfmtPosColor = new gfx.VertexFormat([
            // 用户需要创建一个三维的盒子，所以需要三个值来保存位置信息
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
            { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
            { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
        ]);
        // // 初始化网格信息
        mesh.init(vfmtPosColor, 8, true);
        // 修改 position 顶点数据
        mesh.setVertices(gfx.ATTR_POSITION, d.vertices);
        mesh.setVertices(gfx.ATTR_COLOR, d.colors);
        // 修改 uv 顶点数据
        mesh.setVertices(gfx.ATTR_UV0, d.uvs);
        // 修改索引数据
        mesh.setIndices(d.indices);
    }
    drawModule.renderNodeMesh = renderNodeMesh;
    /**
     * 光线测试算法
     * @param startPos
     * @param dir
     * @param maxLen
     * @returns
     */
    function rayCaseLine(startPos, dir, maxLen) {
        var noraml = dir.normalize();
        noraml = noraml.mul(maxLen);
        var endPos = cc.v2(noraml.x + startPos.x, noraml.y + startPos.y);
        // // dir = noram(maxLen);
        var result = testRayCase(startPos, endPos);
        if (result != -1) {
            return result;
        }
        return maxLen;
        // return 100;
        // return cc.v2(startPos.x - results[0].point.x, startPos.y - results[0].point.y).len();
    }
    drawModule.rayCaseLine = rayCaseLine;
    function testRayCase(start, end) {
        var startWord = demoMain_1.default.sceneInstance.node.convertToWorldSpaceAR(start);
        var endWord = demoMain_1.default.sceneInstance.node.convertToWorldSpaceAR(end);
        var result = cc.director
            .getPhysicsManager()
            .rayCast(startWord, endWord, cc.RayCastType.Closest);
        if (!result.length) {
            return -1;
        }
        return cc.Vec2.distance(demoMain_1.default.sceneInstance.node.convertToNodeSpaceAR(result[0].point), start);
        // return result;
    }
    drawModule.testRayCase = testRayCase;
})(drawModule = exports.drawModule || (exports.drawModule = {}));
window["drawModule"] = drawModule;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNsRSxLQUFLLENBQ1IsQ0FBQztRQUNGLGlCQUFpQjtJQUNyQixDQUFDO0lBZmUsc0JBQVcsY0FlMUIsQ0FBQTtBQUNMLENBQUMsRUF6SWdCLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBeUkxQjtBQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVtb1NjZW5lIGZyb20gXCIuL2RlbW9NYWluXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZHJhd01vZHVsZSB7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRyYXdTZWN0b3IoXG4gICAgICAgIGFuZ2xlOiBudW1iZXIsXG4gICAgICAgIG1pbkFuZ2xlOiBudW1iZXIsXG4gICAgICAgIHJhZGl1czogbnVtYmVyXG4gICAgKToge1xuICAgICAgICB2ZXJ0aWNlczogY2MuVmVjMltdO1xuICAgICAgICBpbmRpY2VzOiBudW1iZXJbXTtcbiAgICAgICAgdXZzOiBjYy5WZWMyW107XG4gICAgICAgIGNvbG9yczogY2MuQ29sb3JbXTtcbiAgICB9IHtcbiAgICAgICAgbGV0IHZlcnRpY2VzOiBjYy5WZWMyW10gPSBbXTtcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2MudjIocmFkaXVzLCAwKTtcbiAgICAgICAgbGV0IGNvbG9yczogY2MuQ29sb3JbXSA9IFtdO1xuICAgICAgICBsZXQgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbGV0IHV2czogY2MuVmVjMltdID0gW107XG4gICAgICAgIGxldCBpbmRpY2VzSW5kZXggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuZ2xlOyBpICs9IG1pbkFuZ2xlKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IGk7XG4gICAgICAgICAgICBsZXQgY3VycmVudEFuZ2xlID0gc3RhcnRBbmdsZSArIG1pbkFuZ2xlO1xuICAgICAgICAgICAgbGV0IHVwUG9zID0gcm90YXRlUG9pbnRBcm91bmRPcmlnaW4oc3RhcnRQb3MsIHN0YXJ0QW5nbGUpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3MgPSByb3RhdGVQb2ludEFyb3VuZE9yaWdpbihzdGFydFBvcywgY3VycmVudEFuZ2xlKTtcblxuICAgICAgICAgICAgdmVydGljZXMucHVzaChjYy52MigwLCAwKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHVwUG9zKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VycmVudFBvcyk7XG5cbiAgICAgICAgICAgIGluZGljZXMucHVzaChpbmRpY2VzSW5kZXgpO1xuICAgICAgICAgICAgaW5kaWNlc0luZGV4Kys7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goaW5kaWNlc0luZGV4KTtcbiAgICAgICAgICAgIGluZGljZXNJbmRleCsrO1xuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGluZGljZXNJbmRleCk7XG4gICAgICAgICAgICBpbmRpY2VzSW5kZXgrKztcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb2xvcnMucHVzaChjYy5Db2xvci5ZRUxMT1cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dnMucHVzaChjYy52MigwLCAwKSwgY2MudjIoMCwgMSksIGNjLnYyKDEsIDApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLFxuICAgICAgICAgICAgaW5kaWNlczogaW5kaWNlcyxcbiAgICAgICAgICAgIHV2czogdXZzLFxuICAgICAgICAgICAgY29sb3JzOiBjb2xvcnMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiByb3RhdGVQb2ludEFyb3VuZE9yaWdpbihzdGFydEFuZ2xlOiBjYy5WZWMyLCBhbmdsZTogbnVtYmVyKTogY2MuVmVjMiB7XG4gICAgICAgIGNvbnN0IHJhZGlhbnMgPSAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgY29uc3QgY29zQW5nbGUgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICAgICAgY29uc3Qgc2luQW5nbGUgPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICAgICAgbGV0IHsgeCwgeSB9ID0gc3RhcnRBbmdsZTtcblxuICAgICAgICBjb25zdCByb3RhdGVkWCA9IHggKiBjb3NBbmdsZSArIHkgKiBzaW5BbmdsZTtcbiAgICAgICAgY29uc3Qgcm90YXRlZFkgPSB5ICogY29zQW5nbGUgLSB4ICogc2luQW5nbGU7XG5cbiAgICAgICAgcmV0dXJuIGNjLnYyKHsgeDogcm90YXRlZFgsIHk6IHJvdGF0ZWRZIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmuLLmn5Pnga/lhYlcbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBhbmdsZVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiByZW5kZXJOb2RlTWVzaChub2RlOiBjYy5Ob2RlLCBhbmdsZTogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgbWVzaCA9IG5ldyBjYy5NZXNoKCk7XG4gICAgICAgIGxldCBtZXNoUmVuZGVyID0gbm9kZS5nZXRDb21wb25lbnQoY2MuTWVzaFJlbmRlcmVyKSB8fCBub2RlLmFkZENvbXBvbmVudChjYy5NZXNoUmVuZGVyZXIpO1xuICAgICAgICBtZXNoUmVuZGVyLm1lc2ggPSBtZXNoO1xuXG4gICAgICAgIGxldCBkID0gZHJhd01vZHVsZS5kcmF3U2VjdG9yKGFuZ2xlLCAxLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQudmVydGljZXNbaV07XG4gICAgICAgICAgICBpZiAoIWl0ZW0ueCAmJiAhaXRlbS55KSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCByYXkgPSByYXlDYXNlTGluZShub2RlLnBvc2l0aW9uLCBpdGVtLCByYWRpdXMpO1xuICAgICAgICAgICAgZC52ZXJ0aWNlc1tpXSA9IGl0ZW0ubXVsKHJheSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVuZGVyRW5naW5lID0gY2MucmVuZGVyZXIucmVuZGVyRW5naW5lO1xuXG4gICAgICAgIGxldCBnZnggPSBjY1tcImdmeFwiXTtcbiAgICAgICAgdmFyIHZmbXRQb3NDb2xvciA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KFtcbiAgICAgICAgICAgIC8vIOeUqOaIt+mcgOimgeWIm+W7uuS4gOS4quS4iee7tOeahOebkuWtkO+8jOaJgOS7pemcgOimgeS4ieS4quWAvOadpeS/neWtmOS9jee9ruS/oeaBr1xuICAgICAgICAgICAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDMgfSxcbiAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfVVYwLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gLy8g5Yid5aeL5YyW572R5qC85L+h5oGvXG4gICAgICAgIG1lc2guaW5pdCh2Zm10UG9zQ29sb3IsIDgsIHRydWUpO1xuXG4gICAgICAgIC8vIOS/ruaUuSBwb3NpdGlvbiDpobbngrnmlbDmja5cbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9QT1NJVElPTiwgZC52ZXJ0aWNlcyk7XG5cbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9DT0xPUiwgZC5jb2xvcnMpO1xuICAgICAgICAvLyDkv67mlLkgdXYg6aG254K55pWw5o2uXG4gICAgICAgIG1lc2guc2V0VmVydGljZXMoZ2Z4LkFUVFJfVVYwLCBkLnV2cyk7XG5cbiAgICAgICAgLy8g5L+u5pS557Si5byV5pWw5o2uXG4gICAgICAgIG1lc2guc2V0SW5kaWNlcyhkLmluZGljZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFiee6v+a1i+ivleeul+azlVxuICAgICAqIEBwYXJhbSBzdGFydFBvc1xuICAgICAqIEBwYXJhbSBkaXJcbiAgICAgKiBAcGFyYW0gbWF4TGVuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmF5Q2FzZUxpbmUoc3RhcnRQb3M6IGNjLlZlYzIgfCBjYy5WZWMzLCBkaXI6IGNjLlZlYzIsIG1heExlbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG5vcmFtbCA9IGRpci5ub3JtYWxpemUoKTtcbiAgICAgICAgbm9yYW1sID0gbm9yYW1sLm11bChtYXhMZW4pO1xuICAgICAgICBsZXQgZW5kUG9zID0gY2MudjIobm9yYW1sLnggKyBzdGFydFBvcy54LCBub3JhbWwueSArIHN0YXJ0UG9zLnkpO1xuXG4gICAgICAgIC8vIC8vIGRpciA9IG5vcmFtKG1heExlbik7XG4gICAgICAgIGxldCByZXN1bHQgPSB0ZXN0UmF5Q2FzZShzdGFydFBvcyBhcyBjYy5WZWMyLCBlbmRQb3MpO1xuICAgICAgICBpZiAocmVzdWx0ICE9IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1heExlbjtcbiAgICAgICAgLy8gcmV0dXJuIDEwMDtcbiAgICAgICAgLy8gcmV0dXJuIGNjLnYyKHN0YXJ0UG9zLnggLSByZXN1bHRzWzBdLnBvaW50LngsIHN0YXJ0UG9zLnkgLSByZXN1bHRzWzBdLnBvaW50LnkpLmxlbigpO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gdGVzdFJheUNhc2Uoc3RhcnQ6IGNjLlZlYzIsIGVuZDogY2MuVmVjMikge1xuICAgICAgICBsZXQgc3RhcnRXb3JkID0gZGVtb1NjZW5lLnNjZW5lSW5zdGFuY2Uubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoc3RhcnQpO1xuICAgICAgICBsZXQgZW5kV29yZCA9IGRlbW9TY2VuZS5zY2VuZUluc3RhbmNlLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGVuZCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBjYy5kaXJlY3RvclxuICAgICAgICAgICAgLmdldFBoeXNpY3NNYW5hZ2VyKClcbiAgICAgICAgICAgIC5yYXlDYXN0KHN0YXJ0V29yZCwgZW5kV29yZCwgY2MuUmF5Q2FzdFR5cGUuQ2xvc2VzdCk7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLlZlYzIuZGlzdGFuY2UoXG4gICAgICAgICAgICBkZW1vU2NlbmUuc2NlbmVJbnN0YW5jZS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHJlc3VsdFswXS5wb2ludCksXG4gICAgICAgICAgICBzdGFydFxuICAgICAgICApO1xuICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbndpbmRvd1tcImRyYXdNb2R1bGVcIl0gPSBkcmF3TW9kdWxlO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/demoMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c28do6lElGTI/xlzUSGJQx', 'demoMain');
// demoMain.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var drawModule_1 = require("./drawModule");
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var demoScene = /** @class */ (function (_super) {
    __extends(demoScene, _super);
    function demoScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drawItem = null;
        _this.radiusNode = null;
        return _this;
    }
    demoScene_1 = demoScene;
    // LIFE-CYCLE CALLBACKS:
    demoScene.prototype.onEnable = function () {
        demoScene_1.sceneInstance = this;
        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = false; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = false; //开启碰撞组件的包围盒绘制
        cc.director.getPhysicsManager().enabled = true;
    };
    demoScene.prototype.onLoad = function () { };
    demoScene.prototype.start = function () {
        // 定义顶点数据格式，只需要指明所需的属性，避免造成存储空间的浪费
        var node = (this.radiusNode = new cc.Node());
        this.node.addChild(node);
        node.setPosition(0, 0);
        drawModule_1.drawModule.renderNodeMesh(node, 1, 334);
        this.bindTouchMove();
    };
    demoScene.prototype.bindTouchMove = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (eve) {
            var local = eve.getLocation();
            local = _this.node.convertToNodeSpaceAR(local);
            _this.radiusNode.setPosition(local);
            drawModule_1.drawModule.renderNodeMesh(_this.radiusNode, 360, 334);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (eve) {
            var local = eve.getLocation();
            local = _this.node.convertToNodeSpaceAR(local);
            _this.radiusNode.setPosition(local);
            drawModule_1.drawModule.renderNodeMesh(_this.radiusNode, 360, 500);
        }, this);
    };
    demoScene.prototype.update = function (dt) {
        if (this.radiusNode) {
            // drawModule.renderNodeMesh(this.radiusNode, 19, 334);
        }
    };
    var demoScene_1;
    demoScene.sceneInstance = null;
    __decorate([
        property(cc.Prefab)
    ], demoScene.prototype, "drawItem", void 0);
    demoScene = demoScene_1 = __decorate([
        ccclass
    ], demoScene);
    return demoScene;
}(cc.Component));
exports.default = demoScene;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQ1AsQ0FBQztJQUNOLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQix1REFBdUQ7U0FDMUQ7SUFDTCxDQUFDOztJQWxETSx1QkFBYSxHQUFjLElBQUksQ0FBQztJQUZ2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNPO0lBRlYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXVEN0I7SUFBRCxnQkFBQztDQXZERCxBQXVEQyxDQXZEc0MsRUFBRSxDQUFDLFNBQVMsR0F1RGxEO2tCQXZEb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuXG5pbXBvcnQgeyBkcmF3TW9kdWxlIH0gZnJvbSBcIi4vZHJhd01vZHVsZVwiO1xuXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkZW1vU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgZHJhd0l0ZW06IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBzdGF0aWMgc2NlbmVJbnN0YW5jZTogZGVtb1NjZW5lID0gbnVsbDtcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XG4gICAgICAgIGRlbW9TY2VuZS5zY2VuZUluc3RhbmNlID0gdGhpcztcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlOyAvL+W8gOWQr+eisOaSnuajgOa1i++8jOm7mOiupOS4uuWFs+mXrVxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IGZhbHNlOyAvL+W8gOWQr+eisOaSnuajgOa1i+iMg+WbtOeahOe7mOWItlxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IGZhbHNlOyAvL+W8gOWQr+eisOaSnue7hOS7tueahOWMheWbtOebkue7mOWItlxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7fVxuICAgIHJhZGl1c05vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyDlrprkuYnpobbngrnmlbDmja7moLzlvI/vvIzlj6rpnIDopoHmjIfmmI7miYDpnIDnmoTlsZ7mgKfvvIzpgb/lhY3pgKDmiJDlrZjlgqjnqbrpl7TnmoTmtarotLlcblxuICAgICAgICBsZXQgbm9kZSA9ICh0aGlzLnJhZGl1c05vZGUgPSBuZXcgY2MuTm9kZSgpKTtcblxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG5cbiAgICAgICAgZHJhd01vZHVsZS5yZW5kZXJOb2RlTWVzaChub2RlLCAxLCAzMzQpO1xuICAgICAgICB0aGlzLmJpbmRUb3VjaE1vdmUoKTtcbiAgICB9XG4gICAgYmluZFRvdWNoTW92ZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXG4gICAgICAgICAgICAoZXZlOiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsID0gZXZlLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgbG9jYWwgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIobG9jYWwpO1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzTm9kZS5zZXRQb3NpdGlvbihsb2NhbCk7XG4gICAgICAgICAgICAgICAgZHJhd01vZHVsZS5yZW5kZXJOb2RlTWVzaCh0aGlzLnJhZGl1c05vZGUsIDM2MCwgMzM0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKFxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSxcbiAgICAgICAgICAgIChldmU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWwgPSBldmUuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihsb2NhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXNOb2RlLnNldFBvc2l0aW9uKGxvY2FsKTtcbiAgICAgICAgICAgICAgICBkcmF3TW9kdWxlLnJlbmRlck5vZGVNZXNoKHRoaXMucmFkaXVzTm9kZSwgMzYwLCA1MDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzTm9kZSkge1xuICAgICAgICAgICAgLy8gZHJhd01vZHVsZS5yZW5kZXJOb2RlTWVzaCh0aGlzLnJhZGl1c05vZGUsIDE5LCAzMzQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

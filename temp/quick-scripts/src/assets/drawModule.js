"use strict";
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
import demoScene from "./demoMain";

export namespace drawModule {
    export function drawSector(
        angle: number,
        minAngle: number,
        radius: number
    ): {
        vertices: cc.Vec2[];
        indices: number[];
        uvs: cc.Vec2[];
        colors: cc.Color[];
    } {
        let vertices: cc.Vec2[] = [];
        let startPos = cc.v2(radius, 0);
        let colors: cc.Color[] = [];
        let indices: number[] = [];
        let uvs: cc.Vec2[] = [];
        let indicesIndex = 0;
        for (let i = 0; i < angle; i += minAngle) {
            let startAngle = i;
            let currentAngle = startAngle + minAngle;
            let upPos = rotatePointAroundOrigin(startPos, startAngle);
            let currentPos = rotatePointAroundOrigin(startPos, currentAngle);

            vertices.push(cc.v2(0, 0));
            vertices.push(upPos);
            vertices.push(currentPos);

            indices.push(indicesIndex);
            indicesIndex++;
            indices.push(indicesIndex);
            indicesIndex++;
            indices.push(indicesIndex);
            indicesIndex++;

            for (let j = 0; j < 3; j++) {
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
    export function rotatePointAroundOrigin(startAngle: cc.Vec2, angle: number): cc.Vec2 {
        const radians = (angle * Math.PI) / 180;
        const cosAngle = Math.cos(radians);
        const sinAngle = Math.sin(radians);
        let { x, y } = startAngle;

        const rotatedX = x * cosAngle + y * sinAngle;
        const rotatedY = y * cosAngle - x * sinAngle;

        return cc.v2({ x: rotatedX, y: rotatedY });
    }
    /**
     * 渲染灯光
     * @param node
     * @param angle
     */
    export function renderNodeMesh(node: cc.Node, angle: number, radius: number): void {
        let mesh = new cc.Mesh();
        let meshRender = node.getComponent(cc.MeshRenderer) || node.addComponent(cc.MeshRenderer);
        meshRender.mesh = mesh;

        let d = drawModule.drawSector(angle, 1, 1);
        for (let i = 0; i < d.vertices.length; i++) {
            let item = d.vertices[i];
            if (!item.x && !item.y) continue;
            let ray = rayCaseLine(node.position, item, radius);
            d.vertices[i] = item.mul(ray);
        }
        const renderEngine = cc.renderer.renderEngine;

        let gfx = cc["gfx"];
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

    /**
     * 光线测试算法
     * @param startPos
     * @param dir
     * @param maxLen
     * @returns
     */
    export function rayCaseLine(startPos: cc.Vec2 | cc.Vec3, dir: cc.Vec2, maxLen: number): number {
        let noraml = dir.normalize();
        noraml = noraml.mul(maxLen);
        let endPos = cc.v2(noraml.x + startPos.x, noraml.y + startPos.y);

        // // dir = noram(maxLen);
        let result = testRayCase(startPos as cc.Vec2, endPos);
        if (result != -1) {
            return result;
        }

        return maxLen;
        // return 100;
        // return cc.v2(startPos.x - results[0].point.x, startPos.y - results[0].point.y).len();
    }
    export function testRayCase(start: cc.Vec2, end: cc.Vec2) {
        let startWord = demoScene.sceneInstance.node.convertToWorldSpaceAR(start);
        let endWord = demoScene.sceneInstance.node.convertToWorldSpaceAR(end);
        let result = cc.director
            .getPhysicsManager()
            .rayCast(startWord, endWord, cc.RayCastType.Closest);

        if (!result.length) {
            return -1;
        }
        return cc.Vec2.distance(
            demoScene.sceneInstance.node.convertToNodeSpaceAR(result[0].point),
            start
        );
        // return result;
    }
}
window["drawModule"] = drawModule;

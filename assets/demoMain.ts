// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import { drawModule } from "./drawModule";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class demoScene extends cc.Component {
    @property(cc.Prefab)
    drawItem: cc.Prefab = null;

    static sceneInstance: demoScene = null;
    // LIFE-CYCLE CALLBACKS:
    protected onEnable(): void {
        demoScene.sceneInstance = this;
        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = false; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = false; //开启碰撞组件的包围盒绘制
        cc.director.getPhysicsManager().enabled = true;
    }
    onLoad() {}
    radiusNode: cc.Node = null;
    start() {
        // 定义顶点数据格式，只需要指明所需的属性，避免造成存储空间的浪费

        let node = (this.radiusNode = new cc.Node());

        this.node.addChild(node);
        node.setPosition(0, 0);

        drawModule.renderNodeMesh(node, 1, 334);
        this.bindTouchMove();
    }
    bindTouchMove() {
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            (eve: cc.Event.EventTouch) => {
                let local = eve.getLocation();
                local = this.node.convertToNodeSpaceAR(local);
                this.radiusNode.setPosition(local);
                drawModule.renderNodeMesh(this.radiusNode, 360, 334);
            },
            this
        );

        this.node.on(
            cc.Node.EventType.TOUCH_MOVE,
            (eve: cc.Event.EventTouch) => {
                let local = eve.getLocation();
                local = this.node.convertToNodeSpaceAR(local);
                this.radiusNode.setPosition(local);
                drawModule.renderNodeMesh(this.radiusNode, 360, 500);
            },
            this
        );
    }

    update(dt) {
        if (this.radiusNode) {
            // drawModule.renderNodeMesh(this.radiusNode, 19, 334);
        }
    }
}

"use strict";
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
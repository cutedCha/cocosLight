
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
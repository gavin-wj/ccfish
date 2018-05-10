"use strict";
cc._RF.push(module, 'f44ce3XvqRGsalzFMsIzXhv', 'Net');
// Script/Net.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Net = /** @class */ (function (_super) {
    __extends(Net, _super);
    function Net() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.curLevel = 1;
        return _this;
    }
    Net.prototype.init = function (position, game, level) {
        this.curLevel = level;
        this.node.parent = cc.director.getScene();
        this.node.position = position;
        this.game = game;
        this.anim.play('net_' + this.curLevel);
    };
    Net.prototype.despawnNet = function () {
        this.game.despawnNet(this.node);
    };
    __decorate([
        property(cc.Animation)
    ], Net.prototype, "anim", void 0);
    Net = __decorate([
        ccclass
    ], Net);
    return Net;
}(cc.Component));
exports.default = Net;

cc._RF.pop();
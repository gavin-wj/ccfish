"use strict";
cc._RF.push(module, '4bfcc8soWpBpY9UvUv74Z4g', 'Coins');
// Script/Coins.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Coins = /** @class */ (function (_super) {
    __extends(Coins, _super);
    function Coins() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        return _this;
    }
    Coins.prototype.init = function (ctr) {
        this.cointroller = ctr;
        this.anim.play('gold_down');
    };
    Coins.prototype.goDown = function (pos, toPos) {
        this.node.parent = cc.director.getScene();
        this.node.position = pos;
        var spawn = cc.spawn(cc.moveTo(0.8, toPos), cc.scaleTo(0.8, 0.5));
        var cb = cc.callFunc(this.despawnCoin, this);
        var acf = cc.sequence(spawn, cb);
        this.node.runAction(acf);
    };
    Coins.prototype.despawnCoin = function () {
        this.cointroller.despawnCoins(this.node);
    };
    __decorate([
        property(cc.Animation)
    ], Coins.prototype, "anim", void 0);
    Coins = __decorate([
        ccclass
    ], Coins);
    return Coins;
}(cc.Component));
exports.default = Coins;

cc._RF.pop();
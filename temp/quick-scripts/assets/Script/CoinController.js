(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/CoinController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '737abq6GhRCQ4hbk+Sfvku8', 'CoinController', __filename);
// Script/CoinController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Coins_1 = require("./Coins");
var NumUp_1 = require("./NumUp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinController = /** @class */ (function (_super) {
    __extends(CoinController, _super);
    function CoinController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinPlusPrefab = null;
        _this.coinsPrefab = null;
        _this.number1 = null;
        _this.number2 = null;
        _this.number3 = null;
        _this.number4 = null;
        _this.number5 = null;
        _this.number6 = null;
        _this.timerAtlas = null;
        _this.currentValue = 0;
        _this.toValue = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    CoinController.prototype.onLoad = function () {
    };
    CoinController.prototype.init = function () {
        this.coinUpPool = new cc.NodePool();
        this.coinsPool = new cc.NodePool();
        this.setValue(this.currentValue);
    };
    // 数字固定长度lenght，不够的补0
    CoinController.prototype.prefixInteger = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    };
    CoinController.prototype.setValue = function (value) {
        var str = this.prefixInteger(value, 6);
        var nums = str.split('');
        this.number1.spriteFrame = this.timerAtlas.getSpriteFrame(nums[0].toString());
        this.number2.spriteFrame = this.timerAtlas.getSpriteFrame(nums[1].toString());
        this.number3.spriteFrame = this.timerAtlas.getSpriteFrame(nums[2].toString());
        this.number4.spriteFrame = this.timerAtlas.getSpriteFrame(nums[3].toString());
        this.number5.spriteFrame = this.timerAtlas.getSpriteFrame(nums[4].toString());
        this.number6.spriteFrame = this.timerAtlas.getSpriteFrame(nums[5].toString());
    };
    // 获取金币加数
    CoinController.prototype.addCoins = function (value) {
        this.currentValue += value;
        this.setValue(this.currentValue);
    };
    // 发射子弹消耗金币
    CoinController.prototype.reduceCoin = function (level) {
        if (this.currentValue >= level) {
            this.setValue(this.currentValue -= level);
            return true;
        }
        return false;
    };
    CoinController.prototype.gainCoins = function (coinPos, coinnum) {
        // 上升的数字对象池
        if (this.coinUpPool.size() > 0) {
            this.coin_up = this.coinUpPool.get();
        }
        else {
            this.coin_up = cc.instantiate(this.coinPlusPrefab);
        }
        this.coin_up.getComponent(NumUp_1.default).init(coinPos, coinnum, this);
        // 金币对象池
        if (this.coinsPool.size() > 0) {
            this.oneCoin = this.coinsPool.get();
        }
        else {
            this.oneCoin = cc.instantiate(this.coinsPrefab);
        }
        this.oneCoin.getComponent(Coins_1.default).init(this);
        // 转为世界坐标
        var toPos = this.node.convertToWorldSpaceAR(this.number3.node.position);
        this.oneCoin.getComponent(Coins_1.default).goDown(coinPos, toPos);
        this.addCoins(coinnum);
    };
    CoinController.prototype.despawnCoins = function (coin) {
        this.coinsPool.put(coin);
    };
    CoinController.prototype.despawnCoinup = function (nup) {
        this.coinUpPool.put(nup);
    };
    __decorate([
        property(cc.Prefab)
    ], CoinController.prototype, "coinPlusPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], CoinController.prototype, "coinsPrefab", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number1", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number2", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number3", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number4", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number5", void 0);
    __decorate([
        property(cc.Sprite)
    ], CoinController.prototype, "number6", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], CoinController.prototype, "timerAtlas", void 0);
    __decorate([
        property
    ], CoinController.prototype, "currentValue", void 0);
    __decorate([
        property
    ], CoinController.prototype, "toValue", void 0);
    CoinController = __decorate([
        ccclass
    ], CoinController);
    return CoinController;
}(cc.Component));
exports.default = CoinController;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CoinController.js.map
        
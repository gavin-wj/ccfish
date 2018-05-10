"use strict";
cc._RF.push(module, '4af5edxCA1IgI7GLcT2eZXt', 'Game');
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Fish_1 = require("./Fish");
var Bullet_1 = require("./Bullet");
var Net_1 = require("./Net");
var CoinController_1 = require("./CoinController");
var Weapon_1 = require("./Weapon");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fishPrefab = null;
        _this.weaponNode = null;
        _this.bulletPrefab = null;
        _this.netPrefab = null;
        _this.coinController = null;
        _this.spAtlas = null;
        _this.gameOverNode = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        this.bulletPool = new cc.NodePool(Bullet_1.default);
        this.fishPool = new cc.NodePool(Fish_1.default);
        // 池子里面多放几条鱼
        var initCount = 10;
        for (var i = 0; i < initCount; ++i) {
            var fishPre = cc.instantiate(this.fishPrefab);
            this.fishPool.put(fishPre);
        }
        this.netsPool = new cc.NodePool();
        this.coinController.getComponent(CoinController_1.default).init();
        this.weaponNode.getComponent(Weapon_1.default).init();
        // 设置zorder，控制显示层级
        // 背景在最下层，最上层是炮台
        // 中间层是鱼
        cc.find('Canvas/game_bg').setLocalZOrder(-1);
        cc.find('Canvas/bottomBar').setLocalZOrder(1);
        this.gameOverNode.setLocalZOrder(2);
        this.gameOverNode.active = false;
        var self = this;
        cc.director.setDisplayStats(true);
        // 动态加载json配置文件
        cc.loader.loadRes("fishconfig", function (err, data) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            // 加载之后转类型
            self.fishTypes = data;
            self.schedule(self.creatFish, 2);
        });
        // 添加触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //需要将触点坐标转换成局部坐标，跟炮台一致
            var touchPos = self.weaponNode.parent.convertTouchToNodeSpaceAR(event.touch);
            var weaponPos = self.weaponNode.getPosition();
            if (touchPos.y < weaponPos.y)
                return;
            var radian = Math.atan((touchPos.x - weaponPos.x) / (touchPos.y - weaponPos.y));
            var degree = radian * 180 / 3.14;
            self.weaponNode.rotation = degree;
            var bulletLevel = self.weaponNode.getComponent(Weapon_1.default).curLevel;
            self.shot(bulletLevel);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // cc.log('touch move');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // cc.log('touch end');
        }, this);
    };
    Game.prototype.shot = function (level) {
        if (this.bulletPool.size() > 0) {
            this.oneBullet = this.bulletPool.get(this);
        }
        else {
            this.oneBullet = cc.instantiate(this.bulletPrefab);
        }
        // 剩余金币
        var left = this.coinController.getComponent(CoinController_1.default).reduceCoin(level);
        if (left) {
            this.oneBullet.getComponent(Bullet_1.default).shot(this, level);
        }
        else {
            if (this.coinController.getComponent(CoinController_1.default).currentValue == 0) {
                this.gameOver();
            }
        }
    };
    Game.prototype.creatFish = function () {
        /**
        if (this.fishPool.size() > 0) {
            this.oneFish = this.fishPool.get(this);
        } else {
            this.oneFish = cc.instantiate(this.fishPrefab);
        }
        this.oneFish.getComponent(Fish).init(this);
        */
        //一次创建3条鱼
        var fishCount = 3;
        for (var i = 0; i < fishCount; ++i) {
            var cfish = null;
            if (this.fishPool.size() > 0) {
                cfish = this.fishPool.get(this);
            }
            else {
                cfish = cc.instantiate(this.fishPrefab);
            }
            cfish.getComponent(Fish_1.default).init(this);
        }
    };
    Game.prototype.castNet = function (position) {
        if (this.netsPool.size() > 0) {
            this.oneNet = this.netsPool.get(this);
        }
        else {
            this.oneNet = cc.instantiate(this.netPrefab);
        }
        var bulletLevel = this.weaponNode.getComponent(Weapon_1.default).curLevel;
        this.oneNet.getComponent(Net_1.default).init(position, this, bulletLevel);
    };
    Game.prototype.despawnFish = function (fish) {
        this.fishPool.put(fish);
    };
    Game.prototype.despawnBullet = function (bullet) {
        this.bulletPool.put(bullet);
    };
    Game.prototype.despawnNet = function (net) {
        this.netsPool.put(net);
    };
    Game.prototype.gainCoins = function (coinPos, value) {
        this.coinController.getComponent(CoinController_1.default).gainCoins(coinPos, value);
    };
    Game.prototype.gameOver = function () {
        this.gameOverNode.active = true;
        this.unscheduleAllCallbacks();
    };
    Game.prototype.gameRestart = function () {
        // cc.game.restart();
        cc.director.loadScene('mainscene');
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "fishPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "weaponNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "netPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "coinController", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], Game.prototype, "spAtlas", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "gameOverNode", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
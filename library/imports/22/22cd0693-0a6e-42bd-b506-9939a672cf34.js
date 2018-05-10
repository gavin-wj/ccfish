"use strict";
cc._RF.push(module, '22cd0aTCm5CvbUGmTmmcs80', 'Fish');
// Script/Fish.ts

Object.defineProperty(exports, "__esModule", { value: true });
var FishType_1 = require("./FishType");
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // animation 这个属性声明类型，为了在编辑器面板显示类型
        _this.anim = null; //显示申明类型，才能有代码提示
        // Health point 血量 默认10
        _this.hp = 10;
        // gold 打死掉落金币数量
        _this.gold = 2;
        // fish state 鱼的生命状态，默认都是活的
        _this.fishState = FishType_1.FishState.alive;
        _this.bezier1 = [cc.p(50, -100), cc.p(300, -400), cc.p(1800, -650)];
        _this.bezier2 = [cc.p(100, -200), cc.p(400, -300), cc.p(1800, -600)];
        _this.bezier3 = [cc.p(150, -300), cc.p(600, -400), cc.p(1800, -500)];
        _this.bezier4 = [cc.p(50, 50), cc.p(400, 100), cc.p(1800, 200)];
        _this.bezier5 = [cc.p(80, 200), cc.p(300, 500), cc.p(1800, 650)];
        _this.bezier6 = [cc.p(100, 100), cc.p(350, 400), cc.p(1800, 500)];
        _this.bezier7 = [cc.p(100, 2), cc.p(350, -2), cc.p(1800, 0)];
        _this.bezierArray = new Array();
        return _this;
    }
    Fish.prototype.init = function (game) {
        this.bezierArray.push(this.bezier1);
        this.bezierArray.push(this.bezier2);
        this.bezierArray.push(this.bezier3);
        this.bezierArray.push(this.bezier4);
        this.bezierArray.push(this.bezier5);
        this.bezierArray.push(this.bezier6);
        this.bezierArray.push(this.bezier7);
        this.game = game;
        this.enabled = true;
        this.spawnFish(game);
    };
    // spawnFish(fishType:FishType) {
    Fish.prototype.spawnFish = function (game) {
        var fishStr = game.fishTypes.length;
        var randomFish = Math.floor(cc.random0To1() * fishStr);
        this.fishType = game.fishTypes[randomFish];
        // this.node.position = cc.p(-cc.random0To1()*100-200, cc.randomMinus1To1() * 300 + 350);
        var pos = cc.p(-cc.random0To1() * 100 - 200, cc.randomMinus1To1() * 300 + 350);
        this.node.position = cc.find('Canvas').convertToNodeSpaceAR(pos);
        var index = Math.floor(cc.random0To1() * this.bezierArray.length);
        var bezier = this.bezierArray[index];
        // 贝塞尔曲线第一个控制点，用来计算初始角度
        var firstp = bezier[0];
        var k = Math.atan((firstp.y) / (firstp.x));
        this.node.rotation = -k * 180 / 3.14;
        this.node.getComponent(cc.Sprite).spriteFrame = this.game.spAtlas.getSpriteFrame(this.fishType.name + '_run_0');
        // 取出鱼的血量
        this.hp = this.fishType.hp;
        // 掉落金币
        this.gold = this.fishType.gold;
        this.fishState = FishType_1.FishState.alive;
        this.anim.play(this.fishType.name + '_run');
        // 加到canvas节点下才可以设置zorder
        // 默认zorder为0，bg设为-1，炮台设为1
        this.node.parent = cc.find('Canvas');
        this.lastPosition = this.node.getPosition();
        this.changeCollider();
        this.swimming(bezier);
    };
    // 重新设置碰撞区域
    Fish.prototype.changeCollider = function () {
        var collider = this.node.getComponent(cc.BoxCollider);
        collider.size = this.node.getContentSize();
    };
    // 小鱼游泳，贝塞尔曲线实现
    Fish.prototype.swimming = function (trace) {
        var windowSize = cc.director.getWinSize();
        // var bezier = [cc.p(100, -200), cc.p(400, -500), cc.p(1500, -600)];
        var speed = cc.random0To1() * 10 + 10;
        var bezerby = cc.bezierBy(speed, trace);
        this.node.runAction(bezerby);
    };
    Fish.prototype.onLoad = function () {
    };
    Fish.prototype.update = function (dt) {
        this.updateDegree();
    };
    // 更新鱼的角度
    Fish.prototype.updateDegree = function () {
        var currentPos = this.node.getPosition();
        // 如果位移不超过1，不改变角度
        if (cc.pDistance(this.lastPosition, currentPos) < 1) {
            return;
        }
        // 计算角度
        var degree;
        if (currentPos.x - this.lastPosition.x == 0) {
            // 垂直
            if (currentPos.y - this.lastPosition.y > 0) {
                degree = -90;
            }
            else {
                degree = 90;
            }
        }
        else {
            degree = -Math.atan((currentPos.y - this.lastPosition.y) / (currentPos.x - this.lastPosition.x)) * 180 / 3.14;
        }
        this.node.rotation = degree;
        this.lastPosition = currentPos;
        // this.despawnFish();
        this.beAttack();
    };
    Fish.prototype.beAttack = function () {
        if (this.isDie()) {
            // 停止贝塞尔曲线动作
            this.node.stopAllActions();
            //播放死亡动画
            var animState = this.anim.play(this.fishType.name + '_die');
            // 被打死的动画播放完成之后回调
            animState.on('stop', this.dieCallback, this);
            // 播放金币动画
            // 转为世界坐标
            var fp = this.node.parent.convertToWorldSpaceAR(this.node.position);
            this.game.gainCoins(fp, this.gold);
        }
        else {
            // 跑出屏幕的鱼自动回收
            this.despawnFish();
        }
    };
    Fish.prototype.dieCallback = function () {
        // 死亡动画播放完回收鱼
        this.node.stopAllActions();
        this.game.despawnFish(this.node);
    };
    Fish.prototype.despawnFish = function () {
        if (this.node.x > 900
            || this.node.x < -1000
            || this.node.y > 600
            || this.node.y < -900) {
            // this.node.removeFromParent();
            // 可以不移除节点，停止所有动作也可以完成
            this.node.stopAllActions();
            this.game.despawnFish(this.node);
        }
    };
    // 碰撞检测，鱼被打死的逻辑
    Fish.prototype.isDie = function () {
        if (this.fishState == FishType_1.FishState.dead) {
            return true;
        }
        return false;
    };
    Fish.prototype.onCollisionEnter = function (other, self) {
        var bullet = other.node.getComponent(Bullet_1.default);
        this.hp -= bullet.getAttackValue();
        if (this.hp <= 0) {
            this.fishState = FishType_1.FishState.dead;
        }
    };
    __decorate([
        property(cc.Animation)
    ], Fish.prototype, "anim", void 0);
    Fish = __decorate([
        ccclass
    ], Fish);
    return Fish;
}(cc.Component));
exports.default = Fish;

cc._RF.pop();
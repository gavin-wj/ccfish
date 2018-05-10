(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fd73efK1y9CKLv+2JerjTNT', 'Bullet', __filename);
// Script/Bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 子弹初始角度
        _this.angle = 0;
        // 子弹攻击力，基础攻击力
        _this.attack = 4;
        // 子弹速度
        _this.speed = 10;
        _this.bulletLeve = 1;
        return _this;
    }
    Bullet.prototype.shot = function (game, level) {
        this.game = game;
        // 启动update函数
        this.enabled = true;
        var weaponSite = game.weaponNode.parent.convertToWorldSpaceAR(game.weaponNode.getPosition());
        this.angle = game.weaponNode.rotation;
        this.node.rotation = this.angle;
        var bpos = cc.p(weaponSite.x + 50 * Math.sin(this.angle / 180 * 3.14), weaponSite.y + 50 * Math.cos(this.angle / 180 * 3.14));
        this.setBullet(level);
        this.node.position = bpos;
        this.node.parent = cc.director.getScene();
    };
    // 根据武器等级设置子弹等级
    Bullet.prototype.setBullet = function (level) {
        this.bulletLeve = level;
        this.node.getComponent(cc.Sprite).spriteFrame = this.game.spAtlas.getSpriteFrame('bullet' + this.bulletLeve);
    };
    Bullet.prototype.update = function (dt) {
        var bx = this.node.x;
        var by = this.node.y;
        bx += dt * this.speed * Math.sin(this.angle / 180 * 3.14);
        by += dt * this.speed * Math.cos(this.angle / 180 * 3.14);
        this.node.x = bx;
        this.node.y = by;
        if (this.node.x > cc.director.getWinSize().width + 100
            || this.node.x < -100
            || this.node.y > cc.director.getWinSize().height + 100
            || this.node.y < 0) {
            this.game.despawnBullet(this.node);
        }
    };
    Bullet.prototype.onCollisionEnter = function (other, self) {
        // 矩形碰撞组件顶点坐标，左上，左下，右下，右上
        var posb = self.world.points;
        // 取左上和右上坐标计算中点当做碰撞中点
        var posNet = cc.pMidpoint(posb[0], posb[3]);
        this.game.castNet(posNet);
        this.game.despawnBullet(this.node);
    };
    Bullet.prototype.getAttackValue = function () {
        return this.attack * this.bulletLeve;
    };
    __decorate([
        property
    ], Bullet.prototype, "speed", void 0);
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
        //# sourceMappingURL=Bullet.js.map
        
"use strict";
cc._RF.push(module, '20cc77d8/1GWqTQQJry8tDM', 'Weapon');
// Script/Weapon.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        return _this;
    }
    Weapon.prototype.init = function () {
        this.curLevel = 1;
        this.total = this.anim.getClips().length;
    };
    Weapon.prototype.plus = function () {
        if (this.curLevel + 1 > this.total) {
            this.curLevel = this.total;
        }
        else {
            this.curLevel++;
        }
        this.anim.play('weapon_level_' + this.curLevel);
    };
    Weapon.prototype.reduce = function () {
        if (this.curLevel < 2) {
            this.curLevel = 1;
        }
        else {
            this.curLevel--;
        }
        this.anim.play('weapon_level_' + this.curLevel);
    };
    __decorate([
        property(cc.Animation)
    ], Weapon.prototype, "anim", void 0);
    Weapon = __decorate([
        ccclass
    ], Weapon);
    return Weapon;
}(cc.Component));
exports.default = Weapon;

cc._RF.pop();
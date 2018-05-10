(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Weapon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '20cc77d8/1GWqTQQJry8tDM', 'Weapon', __filename);
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
        //# sourceMappingURL=Weapon.js.map
        
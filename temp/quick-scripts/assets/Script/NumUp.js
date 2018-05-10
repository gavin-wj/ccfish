(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/NumUp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc121wk/tZKbpMMPfOS1Mhf', 'NumUp', __filename);
// Script/NumUp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NumUp = /** @class */ (function (_super) {
    __extends(NumUp, _super);
    function NumUp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.numAtlas = null;
        _this.tensPlace = null;
        _this.onesPlace = null;
        return _this;
    }
    NumUp.prototype.init = function (pos, num, ctr) {
        this.cointroller = ctr;
        var str = num.toString();
        var nums = str.split('');
        if (nums.length == 1) {
            this.onesPlace.node.active = false;
            this.tensPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[0]);
        }
        else {
            this.onesPlace.node.active = true;
            this.tensPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[0]);
            this.onesPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[1]);
        }
        this.node.parent = cc.director.getScene();
        this.node.position = pos;
        var upState = this.anim.play('coin_up');
        upState.on('stop', this.despawn, this);
    };
    NumUp.prototype.despawn = function () {
        this.cointroller.despawnCoinup(this.node);
    };
    __decorate([
        property(cc.Animation)
    ], NumUp.prototype, "anim", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], NumUp.prototype, "numAtlas", void 0);
    __decorate([
        property(cc.Sprite)
    ], NumUp.prototype, "tensPlace", void 0);
    __decorate([
        property(cc.Sprite)
    ], NumUp.prototype, "onesPlace", void 0);
    NumUp = __decorate([
        ccclass
    ], NumUp);
    return NumUp;
}(cc.Component));
exports.default = NumUp;

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
        //# sourceMappingURL=NumUp.js.map
        
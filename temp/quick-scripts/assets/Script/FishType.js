(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/FishType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9568eHKWrdBHpsNsOmYO/6R', 'FishType', __filename);
// Script/FishType.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 鱼的生命状态
var FishState;
(function (FishState) {
    FishState[FishState["alive"] = 0] = "alive";
    FishState[FishState["dead"] = 1] = "dead";
})(FishState || (FishState = {}));
exports.FishState = FishState;

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
        //# sourceMappingURL=FishType.js.map
        
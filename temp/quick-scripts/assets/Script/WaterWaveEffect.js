(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/WaterWaveEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9d1calugBZBrb7hUQVtoaka', 'WaterWaveEffect', __filename);
// Script/WaterWaveEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Feofox Game
// Author:Lerry
// https://github.com/fylz1125/ShaderDemos
var WaterWaveFrag_1 = require("./WaterWaveFrag");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WaterWaveEffect = /** @class */ (function (_super) {
    __extends(WaterWaveEffect, _super);
    function WaterWaveEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startTime = Date.now();
        _this.time = 0;
        _this.resolution = { x: 0.0, y: 0.0 };
        return _this;
    }
    WaterWaveEffect.prototype.onLoad = function () {
        this.resolution.x = (this.node.getContentSize().width);
        this.resolution.y = (this.node.getContentSize().height);
        this.userWater();
    };
    WaterWaveEffect.prototype.start = function () {
    };
    WaterWaveEffect.prototype.userWater = function () {
        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(WaterWaveFrag_1.default.waterwave_vert, WaterWaveFrag_1.default.waterwave_frag);
        }
        else {
            this.program.initWithVertexShaderByteArray(WaterWaveFrag_1.default.waterwave_vert, WaterWaveFrag_1.default.waterwave_frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        this.program.link();
        this.program.updateUniforms();
        this.program.use();
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformVec2("resolution", this.resolution);
        }
        else {
            var res = this.program.getUniformLocationForName("resolution");
            var ba = this.program.getUniformLocationForName("time");
            this.program.setUniformLocationWith2f(res, this.resolution.x, this.resolution.y);
            this.program.setUniformLocationWith1f(ba, this.time);
        }
        this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
    };
    WaterWaveEffect.prototype.setProgram = function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        else {
            node.setShaderProgram(program);
        }
    };
    WaterWaveEffect.prototype.update = function (dt) {
        this.time = (Date.now() - this.startTime) / 1000;
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("time", this.time);
            }
            else {
                var ct = this.program.getUniformLocationForName("time");
                this.program.setUniformLocationWith1f(ct, this.time);
            }
        }
    };
    WaterWaveEffect = __decorate([
        ccclass
    ], WaterWaveEffect);
    return WaterWaveEffect;
}(cc.Component));
exports.default = WaterWaveEffect;

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
        //# sourceMappingURL=WaterWaveEffect.js.map
        
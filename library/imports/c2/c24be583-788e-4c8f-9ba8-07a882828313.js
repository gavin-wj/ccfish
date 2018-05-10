"use strict";
cc._RF.push(module, 'c24beWDeI5Mj5uoB6iCgoMT', 'WaterWaveFrag');
// Script/WaterWaveFrag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WaterWaveFrag = /** @class */ (function () {
    function WaterWaveFrag() {
    }
    WaterWaveFrag.waterwave_vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }\n    ";
    WaterWaveFrag.waterwave_frag = "\n    #ifdef GL_ES\n    precision mediump float;\n    #endif\n    \n    #define F cos(x-y)*cos(y),sin(x+y)*sin(y)\n\n    uniform float time;\n    uniform vec2 resolution;\n    varying vec2 v_texCoord;\n\n    vec2 s(vec2 p)\n    {\n        float d=time*0.2,x=8.*(p.x+d),y=8.*(p.y+d);\n        return vec2(F);\n    }\n    void mainImage( out vec4 fragColor, in vec2 fragCoord )\n    {\n        // \u6362\u6210resolution\n        vec2 rs = resolution.xy;\n        // \u6362\u6210\u7EB9\u7406\u5750\u6807v_texCoord.xy\n        vec2 uv = v_texCoord.xy;\n        vec2 q = uv+2./resolution.x*(s(uv)-s(uv+rs));\n        //\u53CD\u8F6Cy\n        // q.y=1.-q.y;\n        fragColor = texture2D(CC_Texture0,q);\n    }\n    void main()\n    {\n        mainImage(gl_FragColor, gl_FragCoord.xy);\n    }\n    ";
    return WaterWaveFrag;
}());
exports.default = WaterWaveFrag;

cc._RF.pop();
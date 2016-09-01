#include <packing>

uniform sampler2D tInput;
uniform vec2 iResolution;
uniform vec2 direction;
varying vec2 vUv;

/*float blur9S(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  float color = 0.0;
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += fromDepthMap(image, uv) * 0.2270270270;
  color += fromDepthMap(image, uv + (off1 / resolution)) * 0.2162162162;
  color += fromDepthMap(image, uv - (off1 / resolution)) * 0.2162162162;
  color += fromDepthMap(image, uv + (off2 / resolution)) * 0.0502702703;
  color += fromDepthMap(image, uv - (off2 / resolution)) * 0.0502702703;

  color += fromDepthMap(image, uv + 2.0*(off1 / resolution)) * 0.05;
  color += fromDepthMap(image, uv - 2.0*(off1 / resolution)) * 0.05;
  color += fromDepthMap(image, uv + 2.0*(off2 / resolution)) * 0.05;
  color += fromDepthMap(image, uv - 2.0*(off2 / resolution)) * 0.05;

  color += fromDepthMap(image, uv + 3.0*(off1 / resolution)) * 0.01;
  color += fromDepthMap(image, uv - 3.0*(off1 / resolution)) * 0.01;
  color += fromDepthMap(image, uv + 3.0*(off2 / resolution)) * 0.01;
  color += fromDepthMap(image, uv - 3.0*(off2 / resolution)) * 0.01;
  return color;
}*/

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}

void main()
{ 
  // vec2 iResolution = vec2(2880.0,1800.0);
  vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);
  gl_FragColor = blur9(tInput,vUv,iResolution,direction);
}


/** A jellyfish using ThreeJS. */
class ThreeAbstractJellyfish extends AbstractTimer {

  /**
   * Constructor for a Jellyfish in THREE.JS.
   */
  constructor(jellyfish) {
    super();

    this.createGeometry();
    this.geometry.attributes = {
      position:{
        itemSize: 3,
        array: new Float32Array(jellyfish.position),
        numItems: jellyfish.position.length
      }
    }
    this.addAttribute(jellyfish);

    this.geometry.setIndex( new THREE.BufferAttribute( new Uint32Array(jellyfish.index), 1 ) );
    this.textures = getTexturesJellyfish(jellyfish.imagesList);
    this.createMaterial(jellyfish);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(5,5,5); // equivalent to mat4.scale(uWorld,uWorld, [5.0, 5.0, 5.0]);
    //But the changes only take effect at rendering time so *5 on translateY
    this.rotation =0;
  };

  createGeometry(){
    this.geometry = new THREE.BufferGeometry();
  };

  addAttribute(jellyfish){
    this.geometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(jellyfish.normal), 3 ) );
    this.geometry.addAttribute( 'texture', new THREE.BufferAttribute( new Float32Array(jellyfish.texture), 3 ) );
    this.geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array(jellyfish.color), 3 ) );
  };

  createMaterial(jellyfish){
    this.material = new THREE.ShaderMaterial({
      vertexShader:   jellyfish.shaders.VS,
      fragmentShader: jellyfish.shaders.FS,
      side: THREE.DoubleSide, // equivalent for GL.disable(GL.CULL_FACE);
      depthTest: false, // equivalent for GL.disable(GL.DEPTH_TEST);
      blendEquation:THREE.SubtractEquation, // approximate equivalent GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      transparent: true,
      uniforms:{
        uSampler:           {type: "t", value: this.textures[0]},
        uSampler1:          {type: "t", value: this.textures[1]},
        uLightPos:          {value: new THREE.Vector3(10.0, 40.0, -60.0)},
        uLightRadius:       {value: 200.0},
        uLightCol:          {value: new THREE.Vector4(0.8, 1.3, 1.1, 1.0)},
        uAmbientCol:        {value: new THREE.Vector4(0.3, 0.2, 1.0, 1.0)},
        uFresnelCol:        {value: new THREE.Vector4(0.8, 0.7, 0.6, 1.1)},
        uFresnelPower:      {value: 1.0},
        uCurrentTime:       {value: 0.0}
      }
    });
  }

  update(){
    this.updateTime();
    this.material.uniforms.uCurrentTime.value = (this.now % 100000000) / 1000.0;
    //Change caustics over time
    this.material.uniforms.uSampler1.value = this.textures[Math.floor((this.material.uniforms.uCurrentTime.value * 30) % 32) + 1];
    this.rotation += (2.0 * this.elapsedTime) / 1000.0;
    
    this.mesh.position.x =0;
    this.mesh.position.y =0;
    this.mesh.position.z =0;
    this.mesh.rotation.x =0;
    this.mesh.rotation.y =0;
    this.mesh.rotation.z =0;

    this.mesh.translateY(+5.0); 
    this.mesh.translateZ(-75.0);
    this.mesh.rotateY(glMatrix.toRadian(Math.sin(this.rotation / 10.0) * 30.0));
    this.mesh.rotateX(glMatrix.toRadian(Math.sin(this.rotation / 20.0) * 30.0));
    this.mesh.translateY(Math.sin(this.rotation / 10.0) * 2.5 * 5); 
  };
}
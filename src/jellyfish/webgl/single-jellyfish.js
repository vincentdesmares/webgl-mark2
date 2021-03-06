import AbstractJellyfish from './abstract-jellyfish';

/** Class representing a single jellyfish. */
class SingleJellyfish extends AbstractJellyfish{
  drawElements(){
    this.GL.drawElements(this.GL.TRIANGLES, this.indexcount, this.GL.UNSIGNED_INT, 0);
  }
};

SingleJellyfish.prototype.attributeList = ["position","normal","color","texture"];

export default SingleJellyfish;
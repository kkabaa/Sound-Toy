export default class Particle {
  constructor(path) {
    this.path = path;
    this.currentNodeIndex = 0;
    this.x = this.path[0].x;
    this.y = this.path[0].y;
  }

  // Draw the particle
  draw(ctx) {
    ctx.beginPath();
    const radius = 15;
    ctx.arc(this.x - radius / 2, this.y - radius / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,0,0)";
    ctx.fill();
    ctx.stroke();
  }

  // Update particle position based on its path
  update() {
    const speed = 0.01;

    const startNode = this.path[this.currentNodeIndex];
    const goalNode = this.path[this.currentNodeIndex + 1];

    if (this.x !== goalNode.x) {
      this.x = this.x + speed * (goalNode.x - startNode.x);
    }

    if (this.y !== goalNode.y) {
      this.y = this.y + speed * (goalNode.y - startNode.y);
    }

    // If the Particle is exactly on the Node
    if (this.x === goalNode.x && this.y === goalNode.y) {
      // If the Node has been clicked on, then we play a sound
      if (goalNode.enabled) {
        void goalNode.playSynth();
      }

      this.x = goalNode.x;
      this.y = goalNode.y;

      this.currentNodeIndex++;

      // loop back to start
      if (this.currentNodeIndex >= this.path.length - 1) {
        this.currentNodeIndex = 0;
        this.x = this.path[this.currentNodeIndex].x;
        this.y = this.path[this.currentNodeIndex].y;
      }
    }
  }
}

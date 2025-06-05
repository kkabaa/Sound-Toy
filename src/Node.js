import * as Tone from "tone";

export default class Node {
  static NOTE_COLOR_MAP = {
    // C major scale
    C4: "#f55c7aff", // red
    D4: "#f56c77ff", // orange
    E4: "#f57c73ff", // yellow
    F4: "#f68c70ff", // green
    G4: "#f69c6dff", // blue
    A4: "#f6ac69ff", // indigo
    B4: "#f6bc66ff", // violet
  };

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.circle = null;
    this.children = [];
    this.enabled = false;

    const notes = Object.keys(Node.NOTE_COLOR_MAP);
    this.note = notes[Math.floor(Math.random() * notes.length)]; // assign a note at random
    this.color = Node.NOTE_COLOR_MAP[this.note];
    this.synth = new Tone.Synth().toDestination();
    this.init(x, y, radius);
    this.initEvents();
  }

  init(x, y) {
    this.circle = document.createElement("div");
    this.circle.className = "node";
    this.circle.style.position = "absolute";
    this.circle.style.borderRadius = "50%";
    this.circle.style.backgroundColor = "background-color";
    this.circle.style.border = "3px solid";
    this.circle.style.borderColor = this.color;
    this.circle.style.boxSizing = "border-box";
    this.circle.style.pointerEvents = "auto"; // Allow pointer events
    this.circle.style.zIndex = "10"; // Ensure it's on top of other elements
    this.circle.style.width = `${this.radius * 2}px`;
    this.circle.style.height = `${this.radius * 2}px`;
    this.circle.style.transform = "translate(-50%, -50%)"; // Center the circle
    this.circle.style.transition = "background-color 0.3s"; // Smooth transition for color change
    this.circle.style.left = `${x - this.radius}px`;
    this.circle.style.top = `${y - this.radius}px`;
    document.body.appendChild(this.circle);
  }

  initEvents() {
    this.circle.addEventListener("click", () => {
      this.enabled = !this.enabled;
      if (this.enabled) {
        this.circle.style.backgroundColor = this.color;
      } else {
        this.circle.style.backgroundColor = "";
      }
    });
  }

  async playSynth() {
    this.synth.triggerAttackRelease(this.note, "8n"); // Play middle C for 1/8 note
  }
}

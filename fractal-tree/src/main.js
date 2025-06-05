import Node from "./Node.js";
import Particle from "./Particle.js";
import "./style.css";
import "normalize.css";

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
let nodes = [];
let particles = [];
let treeRoot = null;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawTree(x, y, length, angle) {
	if (length < 50) {
		return null;
	}

	ctx.save();

	ctx.translate(x, y);
	ctx.rotate(angle);

	const { e: actualX, f: actualY } = ctx.getTransform(); // why get transform?
	const node = new Node(actualX, actualY, 10);

	if (!nodes.some(item => item.x === node.x && item.y === node.y)) {
		nodes.push(node);
	}

	const child1 = drawTree(0, -length, length * 0.75, 0.5 * Math.PI);
	const child2 = drawTree(0, -length, length * 0.75, -0.5 * Math.PI);

	if (child1) {
		node.children.push(child1);
	}
	if (child2) {
		node.children.push(child2);
	}

	ctx.restore();

	return node;
}

function startParticles() {
	if (treeRoot) {
		getAllPaths(treeRoot, [], []).forEach(path => particles.push(new Particle(path)))
		console.log(getAllPaths(treeRoot, [], []))
		console.log(particles)
		requestAnimationFrame(stepParticles);
	}
}

function getAllPaths(node, path = [], result = []) {
	if (!node) {
		return;
	}

	// Add current node to the path
	const newPath = [...path, node];

	// If it's a leaf, store the path
	if (!node.children || node.children.length === 0) {
		result.push(newPath);
	}
	else {
		// Recurse into each child
		for (const child of node.children) {
			getAllPaths(child, newPath, result);
		}
	}

	return result;
}

function stepParticles() {
	ctx.setTransform(1, 0, 0, 1, 0, 0)
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach(particle => {
		particle.draw(ctx);
		particle.update();
	})
	requestAnimationFrame(stepParticles); // Continue the animation loop
}

// Main code flow
ctx.translate(canvas.width / 2, canvas.height);
treeRoot = drawTree(0, 0, 250, 0);
startParticles();

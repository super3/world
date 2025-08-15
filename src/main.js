// File: main.js
//import { OverworldScene } from './scenes/OverworldScene.js';
import { NewWorldScene } from './scenes/NewWorldScene.js';

// Detect if we're on GitHub Pages and set the base path accordingly
const isGitHubPages = window.location.hostname === 'super3.github.io';
const basePath = isGitHubPages ? '/world/' : '/';

// Make basePath globally available
window.ASSET_BASE_PATH = basePath;

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scene: [NewWorldScene],
    scale: {
        mode: Phaser.Scale.NONE
    }
};

const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

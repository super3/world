# Colony Sim

A browser-based pixel art colony simulation game built with Phaser.js, inspired by Rimworld.

## Features

- **Procedural World Generation**: 100x100 tile maps with Perlin noise terrain
- **Pathfinding**: A* navigation around obstacles  
- **Pixel Art Graphics**: Using the "Little Dreamyland Asset Pack"
- **Auto-tiling**: Seamless grass-to-dirt terrain transitions

## Getting Started

1. **Clone and install**:
   ```bash
   git clone https://github.com/super3/world
   cd world
   npm install
   ```

2. **Run locally**:
   ```bash
   npm start
   ```
   This will start a local server on port 8000 and automatically open the game in your browser.

3. **Alternative methods**:
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```
   Then open `http://localhost:8000/game.html` in your browser

## Controls

- **Left Mouse**: Select character
- **Right Mouse**: Move selected character  
- **WASD/Arrows**: Pan camera
- **O/I/P Keys**: Debug overlays

## License

MIT License. Graphics from [Little Dreamyland Asset Pack](https://starmixu.itch.io/little-dreamyland-asset-pack) by StarMixu.

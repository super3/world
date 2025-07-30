# Project Cleanup TODO

## 1. Consolidate Asset Organization
- [ ] Create clear subdirectories in `assets/` folder:
  - [ ] `assets/sprites/`
  - [ ] `assets/tilesets/`
  - [ ] `assets/maps/`
  - [ ] `assets/ui/`
  - [ ] `assets/npcs/`
- [ ] Move existing assets to appropriate subdirectories

## 2. Remove Unused NPCs
- [x] Verify if NPC images are used in game
- [x] Remove `assets/npc/` folder if unused (30 images total)

## 3. Clean Up Tileset Files
- [ ] Decide whether to use Tiled editor `.tsx` files
- [ ] Remove `.tsx` files in `assets/tileSets/` if not using Tiled

## 4. Organize Source Code Better
- [ ] Flatten and reorganize `src/` folder structure:
  - [ ] Move managers from `src/js/Managers/` to `src/managers/`
  - [ ] Move stages from `src/js/Stages/` to `src/stages/`
  - [ ] Move tilemaps from `src/js/tilemaps/` to `src/data/`
  - [ ] Create `src/entities/` for Entity.js
  - [ ] Create `src/utils/` for utilities
  - [ ] Remove empty `src/js/` folder after migration

## 5. Remove Example/Source Files
- [ ] Remove `Sunnyside_World_ExampleScene.png`
- [ ] Move or remove `_Source/` folder with `.aseprite` files
- [ ] Consider separate repository for source art files
- [x] Remove unused Phaser demo assets (phaser.png, space.png, spaceship.png)
- [x] Remove unused Dreamyland assets folder

## 6. Version Control Improvements
- [x] Create `.gitignore` file with:
  - [x] `node_modules/`
  - [x] `.DS_Store`
  - [x] `*.log`
  - [x] `.env`
  - [x] `.vscode/` (unless sharing settings)

## 7. Asset Optimization
- [ ] Combine individual sprite frames into texture atlases
- [ ] Optimize image file sizes
- [ ] Consider using tools like TexturePacker

## 8. Code Organization
- [ ] Move `perlin.js` to `src/vendor/` or `src/lib/`
- [x] Separate third-party code from project code (phaser.js moved to src/)
- [ ] Consider using npm packages instead of vendored code where possible

## Completed Outside of This List
- [x] Removed unused style.css file
- [x] Removed empty Sprites/ and Tileset/ folders from root
- [x] Updated title from ColonySim to World
- [x] Made game fullscreen and extended world width
- [x] Updated README with accurate feature descriptions
- [x] Removed unused landing page (index.html)
- [x] Updated favicon to globe emoji
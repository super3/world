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
- [ ] Verify if NPC images are used in game
- [ ] Remove `assets/npc/` folder if unused (30 images total)

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

## 6. Version Control Improvements
- [ ] Create `.gitignore` file with:
  - [ ] `node_modules/`
  - [ ] `.DS_Store`
  - [ ] `*.log`
  - [ ] `.env`
  - [ ] `.vscode/` (unless sharing settings)

## 7. Configuration & Documentation
- [ ] Add `jsconfig.json` for better IDE support
- [ ] Consider adding `CONTRIBUTING.md` for contribution guidelines
- [ ] Update README with development setup instructions

## 8. Asset Optimization
- [ ] Combine individual sprite frames into texture atlases
- [ ] Optimize image file sizes
- [ ] Consider using tools like TexturePacker

## 9. Code Organization
- [ ] Move `perlin.js` to `src/vendor/` or `src/lib/`
- [ ] Separate third-party code from project code
- [ ] Consider using npm packages instead of vendored code where possible

## 10. Build Process
- [ ] Consider adding build tooling (Webpack/Vite) for:
  - [ ] Module bundling
  - [ ] Asset optimization
  - [ ] Development hot-reload
  - [ ] Production minification
  - [ ] ES6+ transpilation
- [ ] Add npm scripts for development and production builds

## Additional Improvements
- [ ] Add ESLint configuration for code consistency
- [ ] Add Prettier for code formatting
- [ ] Consider TypeScript for better type safety
- [ ] Add unit tests for game logic
- [ ] Implement CI/CD with GitHub Actions
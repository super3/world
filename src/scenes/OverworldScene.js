import { weightedRandomTile } from '../modules/tile-utils.js';
import { Entity } from '../modules/Entity.js';

export class OverworldScene extends Phaser.Scene {
    constructor() {
        super('OverworldScene');
    }

    preload() {
        // Load player
        this.load.spritesheet('bunny', 'assets/Dreamyland_assets/Sprites/Characters/Bunny/RUN/Run bunny.png', {
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet('bunny-idle', 'assets/Dreamyland_assets/Sprites/Characters/Bunny/IDLE/Idle bunny.png', {
            frameWidth: 48,
            frameHeight: 48
        });

        // Load tileset images
        this.load.image('tiles-grass-dirt', 'assets/Dreamyland_assets/Tileset/Autotile Grass and Dirt Path Tileset.png');
        this.load.image('tiles-obstacles', 'assets/Dreamyland_assets/Tileset/Nature Tileset.png');
        this.load.image('tiles-decor', 'assets/Dreamyland_assets/Tileset/Tileset floor detail.png');

        // Load TSX files as text
        this.load.text('ground-tsx', 'assets/tilesets/Ground.tsx');
        this.load.text('obstacle-tsx', 'assets/tilesets/Obstacles.tsx');
        this.load.text('decor-tsx', 'assets/tilesets/Decor.tsx');

        this.obstacleSpawnChance = 0.05;
        this.decorSpawnChance = 0.1;
    }

    create() {
        this.cameraPanSpeed = 200; // Pixels per second
        const tileSize = 16;
        const mapWidth = 100;
        const mapHeight = 100;

        this.minPatchCount = 5;
        this.maxPatchCount = 10;
        this.minDirtWidth = 3;
        this.maxDirtWidth = 7;
        this.minDirtHeight = 3;
        this.maxDirtHeight = 7;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,O,I,P');
        this.tileCategoryMap = {
            'GRASS': [],
            'DIRT': [],
            'DECOR': [],
            'DIRT_DECOR': [],
            'OBSTACLES': [],
        };

        this.tileCategoryTileSets = {
            'GRASS': 'tiles-grass-dirt',
            'DIRT': 'tiles-grass-dirt',
            'DECOR': 'tiles-decor',
            'DIRT_DECOR': 'tiles-decor',
            'OBSTACLES': 'tiles-obstacles',
        };

        this.tilesetProperties = {
            'tiles-grass-dirt': this.parseTsx(this.cache.text.get('ground-tsx')),
            'tiles-obstacles': this.parseTsx(this.cache.text.get('obstacle-tsx')),
            'tiles-decor': this.parseTsx(this.cache.text.get('decor-tsx'))
        };

        const mapData = Array.from({ length: mapHeight }, () =>
            Array.from({ length: mapWidth }, () => 0)
        );

        const map = this.make.tilemap({
            data: mapData,
            tileWidth: tileSize,
            tileHeight: tileSize
        });

        const tilesetGround = map.addTilesetImage('tiles-grass-dirt', null, tileSize, tileSize);
        const tilesetObstacles = map.addTilesetImage('tiles-obstacles', null, tileSize, tileSize);
        const tilesetDecor = map.addTilesetImage('tiles-decor', null, tileSize, tileSize);

        this.tilesetColumnsLookup = {};
        this.tilesetColumnsLookup['tiles-grass-dirt'] = this.textures.get('tiles-grass-dirt').getSourceImage().width / 16;
        this.tilesetColumnsLookup['tiles-obstacles'] = this.textures.get('tiles-obstacles').getSourceImage().width / 16;
        this.tilesetColumnsLookup['tiles-decor'] = this.textures.get('tiles-decor').getSourceImage().width / 16;

        this.groundLayer = map.createLayer(0, tilesetGround, 0, 0);
        this.obstacleLayer = map.createBlankLayer('Obstacles', tilesetObstacles, 0, 0);
        this.decorLayer = map.createBlankLayer('Decor', tilesetDecor, 0, 0);

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                const tileSetArray = this.tileCategoryMap.GRASS;
                const tile = weightedRandomTile(tileSetArray);
                this.groundLayer.putTileAt(tile.index, x, y);
            }
        }

this.perlinBasedDirt(mapWidth, mapHeight);
this.debugOverlayGroup = this.add.group();
this.dirtAutoTileMap = {
    0: 98,    // Isolated dirt tile
    1: 101,    // W only → right edge
    2: 99,    // E only → left edge
    3: 100,   // E + W → horizontal center
    4: 35,    // S only → top edge
    5: 38,    // S + W → top-right corner
    6: 36,    // S + E → top-left corner
    7: 37,    // S + E + W → fallback → pick top-left
    8: 77,    // N only → bottom edge
    9: 80,    // N + W → bottom-right corner
    10: 78,   // N + E → bottom-left corner
    11: 79,   // N + E + W → fallback → bottom-left
    12: 56,   // N + S → vertical center
    13: 59,   // N + S + W → fallback → vertical center
    14: 57,   // N + S + E → fallback → vertical center
    15: 58    // Surrounded → full center dirt
};


this.dirtAutoTileMap8 = {};

this.dirtAutoTileMap8[0] = 98;
this.dirtAutoTileMap8[1] = 101;
this.dirtAutoTileMap8[2] = 99;
this.dirtAutoTileMap8[3] = 100;
this.dirtAutoTileMap8[4] = 35;
this.dirtAutoTileMap8[6] = 36;
this.dirtAutoTileMap8[8] = 77;
this.dirtAutoTileMap8[9] = 80;
this.dirtAutoTileMap8[10] = 78;
this.dirtAutoTileMap8[12] = 56;
this.dirtAutoTileMap8[15] = 58;

this.dirtAutoTileMap8[16] = 77;
this.dirtAutoTileMap8[17] = 98;
this.dirtAutoTileMap8[18] = 98;
this.dirtAutoTileMap8[22] = 78;
this.dirtAutoTileMap8[24] = 56;
this.dirtAutoTileMap8[25] = 59;
this.dirtAutoTileMap8[26] = 78;
this.dirtAutoTileMap8[27] = 79;
this.dirtAutoTileMap8[30] = 57;
this.dirtAutoTileMap8[31] = 58;

this.dirtAutoTileMap8[32] = 98;
this.dirtAutoTileMap8[35] = 100;
this.dirtAutoTileMap8[36] = 35;
this.dirtAutoTileMap8[38] = 36;
this.dirtAutoTileMap8[39] = 37;
this.dirtAutoTileMap8[44] = 35;
this.dirtAutoTileMap8[46] = 36;
this.dirtAutoTileMap8[47] = 37;
this.dirtAutoTileMap8[50] = 78;
this.dirtAutoTileMap8[54] = 36;

this.dirtAutoTileMap8[58] = 78;
this.dirtAutoTileMap8[62] = 57;
this.dirtAutoTileMap8[63] = 58;
this.dirtAutoTileMap8[65] = 101;
this.dirtAutoTileMap8[66] = 99;
this.dirtAutoTileMap8[67] = 100;
this.dirtAutoTileMap8[68] = 35;
this.dirtAutoTileMap8[69] = 38;
this.dirtAutoTileMap8[70] = 36;
this.dirtAutoTileMap8[71] = 37;

this.dirtAutoTileMap8[73] = 101;
this.dirtAutoTileMap8[76] = 35;
this.dirtAutoTileMap8[77] = 59;
this.dirtAutoTileMap8[79] = 58;
this.dirtAutoTileMap8[80] = 80;
this.dirtAutoTileMap8[81] = 101;
this.dirtAutoTileMap8[82] = 99;
this.dirtAutoTileMap8[84] = 35;
this.dirtAutoTileMap8[85] = 38;
this.dirtAutoTileMap8[86] = 36;
this.dirtAutoTileMap8[87] = 37;

this.dirtAutoTileMap8[88] = 56;
this.dirtAutoTileMap8[89] = 59;
this.dirtAutoTileMap8[90] = 57;
this.dirtAutoTileMap8[91] = 58;
this.dirtAutoTileMap8[93] = 101;
this.dirtAutoTileMap8[95] = 58;
this.dirtAutoTileMap8[100] = 35;
this.dirtAutoTileMap8[101] = 38;
this.dirtAutoTileMap8[102] = 36;
this.dirtAutoTileMap8[103] = 37;

this.dirtAutoTileMap8[111] = 58;
this.dirtAutoTileMap8[118] = 36;
this.dirtAutoTileMap8[119] = 37;
this.dirtAutoTileMap8[126] = 57;
this.dirtAutoTileMap8[127] = 58;
this.dirtAutoTileMap8[129] = 101;
this.dirtAutoTileMap8[13] = 35;
this.dirtAutoTileMap8[136] = 35;
this.dirtAutoTileMap8[137] = 80;
this.dirtAutoTileMap8[139] = 37;
this.dirtAutoTileMap8[141] = 101;
this.dirtAutoTileMap8[143] = 58;

this.dirtAutoTileMap8[152] = 56;
this.dirtAutoTileMap8[153] = 80;
this.dirtAutoTileMap8[154] = 78;
this.dirtAutoTileMap8[155] = 79;
this.dirtAutoTileMap8[158] = 57;
this.dirtAutoTileMap8[159] = 58;
this.dirtAutoTileMap8[162] = 99;
this.dirtAutoTileMap8[175] = 58;
this.dirtAutoTileMap8[186] = 36;
this.dirtAutoTileMap8[187] = 37;

this.dirtAutoTileMap8[190] = 57;
this.dirtAutoTileMap8[191] = 58;
this.dirtAutoTileMap8[193] = 101;
this.dirtAutoTileMap8[197] = 38;
this.dirtAutoTileMap8[201] = 101;
this.dirtAutoTileMap8[205] = 59;
this.dirtAutoTileMap8[207] = 58;
this.dirtAutoTileMap8[217] = 101;
this.dirtAutoTileMap8[219] = 58;
this.dirtAutoTileMap8[221] = 101;
this.dirtAutoTileMap8[223] = 58;

this.dirtAutoTileMap8[229] = 101;
this.dirtAutoTileMap8[231] = 58;
this.dirtAutoTileMap8[237] = 58;
this.dirtAutoTileMap8[239] = 58;
this.dirtAutoTileMap8[251] = 58;
this.dirtAutoTileMap8[255] = 58;


console.log(this.dirtAutoTileMap8);

 this.applyAutoTileToDirtLayer();   

        for (let y = 1; y < mapHeight - 1; y++) {
            for (let x = 1; x < mapWidth - 1; x++) {
                if (Math.random() < this.obstacleSpawnChance && !this.obstacleLayer.hasTileAt(x, y)) {
                    let dirtCheck = this.checkGroundLayer(x, y, 'dirt');
                    if (dirtCheck == true) continue;
                    this.tryPlaceClustered(this.obstacleLayer, this.tileCategoryMap['OBSTACLES'], x, y, [this.decorLayer], .1);
                }
            }
        }

        for (let y = 1; y < mapHeight - 1; y++) {
            for (let x = 1; x < mapWidth - 1; x++) {
                if (this.obstacleLayer.hasTileAt(x, y) || this.decorLayer.hasTileAt(x, y)) continue;
                let dirtCheck = this.checkGroundLayer(x, y, 'dirt');
                if (dirtCheck == true) continue;
                if (Math.random() < this.decorSpawnChance && !this.decorLayer.hasTileAt(x, y)) {
                    this.tryPlaceClustered(this.decorLayer, this.tileCategoryMap.DECOR, x, y, [this.obstacleLayer], .1);
                }
            }
        }

        // Animations
        const directions = ['up', 'right', 'left', 'down'];
        directions.forEach((dir, row) => {
            this.anims.create({
                key: `walk-${dir}`,
                frames: this.anims.generateFrameNumbers('bunny', { start: row * 8, end: row * 8 + 7 }),
                frameRate: 10,
                repeat: -1
            });
        });

        directions.forEach((dir, row) => {
            this.anims.create({
                key: `idle-${dir}`,
                frames: this.anims.generateFrameNumbers('bunny-idle', { start: row * 5, end: row * 5 + 4 }),
                frameRate: 5,
                repeat: -1
            });
        });

        // Pathfinding setup
        this.pathfinder = new EasyStar.js();

        // === Entities setup ===
        this.entities = [];
        const centerX = Math.floor(mapWidth / 2);
        const centerY = Math.floor(mapHeight / 2);
        const spawnPos1 = this.findNearestWalkableTile(centerX, centerY);
        const spawnPos2 = this.findNearestWalkableTile(centerX + 5, centerY + 5);

        const entity1 = new Entity(this, spawnPos1.x, spawnPos1.y, 'bunny', 'bunny-idle', this.pathfinder);
        const entity2 = new Entity(this, spawnPos2.x, spawnPos2.y, 'bunny', 'bunny-idle', this.pathfinder);

        this.entities.push(entity1);
        this.entities.push(entity2);

        this.selectedEntity = entity1;
        this.selectedEntity.setSelected(true);

        this.physics.world.setBounds(0, 0, mapWidth * tileSize, mapHeight * tileSize);

        this.cameras.main.setScroll(this.selectedEntity.sprite.x - this.cameras.main.width / 2, this.selectedEntity.sprite.y - this.cameras.main.height / 2);

        const cameraPadding = 48;
        this.cameras.main.setBounds(
            -cameraPadding,
            -cameraPadding,
            mapWidth * tileSize + cameraPadding * 2,
            mapHeight * tileSize + cameraPadding * 2
        );



        // Click marker
        this.clickMarker = this.add.graphics();
        this.clickMarker.lineStyle(2, 0xffd900, 1);
        this.clickMarker.strokeCircle(0, 0, 10);
        this.clickMarker.setVisible(false);

        // Mouse input
        this.input.on('pointerdown', pointer => {
            const worldX = pointer.worldX;
            const worldY = pointer.worldY;

            if (pointer.leftButtonDown()) {
                let clickedEntity = null;
                for (const entity of this.entities) {
                    const dist = Phaser.Math.Distance.Between(entity.sprite.x, entity.sprite.y, worldX, worldY);
                    if (dist < 24) {
                        clickedEntity = entity;
                        break;
                    }
                }

                if (clickedEntity) {
                    if (this.selectedEntity !== clickedEntity) {
                        if(this.selectedEntity != null)
                            this.selectedEntity.setSelected(false);

                        this.selectedEntity = clickedEntity;
                        this.selectedEntity.setSelected(true);
                    }
                }
                else if (pointer.leftButtonDown() && this.selectedEntity != null) 
                {
                    this.selectedEntity.setSelected(false);
                    this.selectedEntity = null;
                }

            } else if (pointer.rightButtonDown()) {
                if (this.selectedEntity) {
                    this.selectedEntity.moveTo(worldX, worldY);
                    this.clickMarker.setPosition(worldX, worldY);
                    this.clickMarker.setVisible(true);
                }
            }
        });
    }

    update(time, delta) {

if(this.keys.O.isDown)
{
    this.drawDebugOverlay8();
}
if(this.keys.I.isDown)
{
    this.drawDebugOverlay();
}

if(this.keys.P.isDown)
{
    this.debugOverlayGroup.clear(true, true);
}

        const camera = this.cameras.main;
        const cameraMove = this.cameraPanSpeed * (delta / 1000);

        if (this.cursors.left.isDown || this.keys.A.isDown) {
            camera.scrollX -= cameraMove;
        }
        if (this.cursors.right.isDown || this.keys.D.isDown) {
            camera.scrollX += cameraMove;
        }
        if (this.cursors.up.isDown || this.keys.W.isDown) {
            camera.scrollY -= cameraMove;
        }
        if (this.cursors.down.isDown || this.keys.S.isDown) {
            camera.scrollY += cameraMove;
        }

        for (const entity of this.entities) {
            entity.update(delta);
        }
    }

    buildPathfindingGrid() {
        const grid = [];
        for (let y = 0; y < this.obstacleLayer.height; y++) {
            const row = [];
            for (let x = 0; x < this.obstacleLayer.width; x++) {
                const tile = this.obstacleLayer.getTileAt(x, y);
                row.push(tile ? 1 : 0);
            }
            grid.push(row);
        }
        return grid;
    }

perlinBasedDirt(mapWidth, mapHeight)
{
    // === Perlin noise setup ===
   
    const simplex = new SimplexNoise(); // Create a new SimplexNoise instance
    this.isDirtGrid = Array.from({ length: mapHeight }, () =>
        Array.from({ length: mapWidth }, () => false)
    );
    const noiseScale = 0.1;     // Lower = bigger smoother blobs
    const dirtThreshold = 0.8;  // Higher = less dirt, lower = more dirt
    const decorChance = 0.1;    // Chance of placing decor inside dirt

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {

            // Generate 2D noise value for this tile
            const noiseValue = simplex.noise2D(x * noiseScale, y * noiseScale);

            // Normalize from [-1,1] to [0,1]
            const normalizedNoise = (noiseValue + 1) / 2;

            let tileSetArray = this.tileCategoryMap.GRASS;

            if (normalizedNoise > dirtThreshold) {
                tileSetArray = this.tileCategoryMap.DIRT;
                this.isDirtGrid[y][x] = true; // Mark dirt tile
                // Optionally → place decor inside dirt
                if (Math.random() < decorChance && !this.decorLayer.hasTileAt(x, y)) {
                    const decorTile = weightedRandomTile(this.tileCategoryMap.DIRT_DECOR);
                    this.decorLayer.putTileAt(decorTile.index, x, y);
                }
            }

            // Place the ground tile (grass or dirt)
            const tile = weightedRandomTile(tileSetArray);
            this.groundLayer.putTileAt(tile.index, x, y);
        }
    }
}

applyAutoTileToDirtLayer() {
    const mapWidth = this.isDirtGrid[0].length;
    const mapHeight = this.isDirtGrid.length;

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (this.isDirtGrid[y][x]) {
                const mask = this.computeDirtBitmask(x, y);
                let tileIndex = this.dirtAutoTileMap[mask];

                // Fallback if undefined → use fully surrounded
                if (tileIndex === undefined) {
                    tileIndex = this.dirtAutoTileMap[15];
                }

                this.groundLayer.putTileAt(tileIndex, x, y);
            }
        }
    }
}


computeDirtBitmask(x, y) {
    const grid = this.isDirtGrid;
    const w = grid[0].length;
    const h = grid.length;

    let mask = 0;

    if (y > 0         && grid[y - 1][x    ]) mask |= 8; // N
    if (y < h - 1     && grid[y + 1][x    ]) mask |= 4; // S
    if (x < w - 1     && grid[y    ][x + 1]) mask |= 2; // E
    if (x > 0         && grid[y    ][x - 1]) mask |= 1; // W

    return mask;
}

computeDirtBitmask8(x, y) {
    const grid = this.isDirtGrid;
    const w = grid[0].length;
    const h = grid.length;

    let mask = 0;

    // Diagonals first
    if (x > 0 && y > 0             && grid[y - 1][x - 1]) mask |= 128; // NW
    if (x < w - 1 && y > 0         && grid[y - 1][x + 1]) mask |= 16;  // NE
    if (x > 0 && y < h - 1         && grid[y + 1][x - 1]) mask |= 64;  // SW
    if (x < w - 1 && y < h - 1     && grid[y + 1][x + 1]) mask |= 32;  // SE

    // Cardinal directions
    if (y > 0                     && grid[y - 1][x    ]) mask |= 8;    // N
    if (y < h - 1                 && grid[y + 1][x    ]) mask |= 4;    // S
    if (x < w - 1                 && grid[y    ][x + 1]) mask |= 2;    // E
    if (x > 0                     && grid[y    ][x - 1]) mask |= 1;    // W

    return mask;
}

drawDebugOverlay() {
    // Clear old overlays first
    this.debugOverlayGroup.clear(true, true);

    const mapWidth = this.isDirtGrid[0].length;
    const mapHeight = this.isDirtGrid.length;

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (this.isDirtGrid[y][x]) {
const mask = this.computeDirtBitmask(x, y);

                const worldX = this.groundLayer.tileToWorldX(x);
                const worldY = this.groundLayer.tileToWorldY(y);

                const text = this.add.text(worldX + 2, worldY + 2, `${mask}`, {
                    fontSize: '10px',
                    fill: '#ff0000',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                });

                text.setDepth(9999); // Always on top
                this.debugOverlayGroup.add(text);
            }
        }
    }
}


drawDebugOverlay8() {
    // Clear old overlays first
    this.debugOverlayGroup.clear(true, true);

    const mapWidth = this.isDirtGrid[0].length;
    const mapHeight = this.isDirtGrid.length;

    // Store FIRST instance of each mask
    if (!this.foundMasks8) {
        this.foundMasks8 = {};
    }

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (this.isDirtGrid[y][x]) {
                const mask = this.computeDirtBitmask8(x, y);

                // Store first occurrence of mask:
                if (this.foundMasks8[mask] === undefined) {
                    console.log(`Found new mask: ${mask}`);
                    this.foundMasks8[mask] = { x, y };
                }

                const worldX = this.groundLayer.tileToWorldX(x);
                const worldY = this.groundLayer.tileToWorldY(y);

                const text = this.add.text(worldX + 2, worldY + 2, `${mask}`, {
                    fontSize: '10px',
                    fill: '#ff0000',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                });

                text.setDepth(9999); // Always on top
                this.debugOverlayGroup.add(text);
            }
        }
    }

    // Optional: log all found masks at the end
    console.log('Found dirt masks:', Object.keys(this.foundMasks8).sort((a, b) => a - b));
}



findNearestWalkableTile(centerX, centerY, maxRadius = 10) {
    const tileSize = 16;

    for (let r = 0; r <= maxRadius; r++) {
        for (let dx = -r; dx <= r; dx++) {
            for (let dy = -r; dy <= r; dy++) {
                // Only check perimeter of current radius (avoids duplicates)
                if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;

                const x = centerX + dx;
                const y = centerY + dy;

                const worldX = x * tileSize + tileSize / 2;
                const worldY = y * tileSize + tileSize / 2;

                if (this.isWalkableTile(worldX, worldY)) {
                    return { x: worldX, y: worldY };
                }
            }
        }
    }

    // Fallback → just return center (unlikely)
    return { x: centerX * tileSize + tileSize / 2, y: centerY * tileSize + tileSize / 2 };
}

checkGroundLayer(x,y, typeCheck)
{
    const groundTile = this.groundLayer.getTileAt(x, y);

    let groundType = null;
    if (groundTile) {
        const groundProps = this.tilesetProperties['tiles-grass-dirt'][groundTile.index];
        groundType = groundProps?.groundType || null;
    }

    if (groundType === typeCheck &&  !this.decorLayer.hasTileAt(x, y))
    {
        if (Math.random() < this.decorSpawnChance ) 
        {
            const tile = weightedRandomTile(this.tileCategoryMap.DIRT_DECOR);
            this.decorLayer.putTileAt(tile.index, x, y);
        }
         return true;
    }

    return false;
}

 parseTsx(tsxText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(tsxText, 'text/xml');
    const tiles = xml.getElementsByTagName('tile');
    const props = {};

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const id = parseInt(tile.getAttribute('id'), 10);
        const propertyNodes = tile.getElementsByTagName('property');
        const tileProps = {};

        for (let j = 0; j < propertyNodes.length; j++) {
            const propNode = propertyNodes[j];
            const name = propNode.getAttribute('name');
            const type = propNode.getAttribute('type') || 'string';
            const valueAttr = propNode.getAttribute('value');
            let value = valueAttr;

            if (type === 'bool') {
                value = valueAttr === 'true';
            } else if (type === 'int') {
                value = parseInt(valueAttr, 10);
            } else if (type === 'float') {
                value = parseFloat(valueAttr);
            }

            tileProps[name] = value;
        }

        if (tileProps.include == true && tileProps.category && tileProps.weight != null) 
        {
            const isOrigin = tileProps.objectOrigin === undefined || tileProps.objectOrigin === true;

            if (!this.tileCategoryMap[tileProps.category]) {
                //this.tileCategoryMap[tileProps.category] = [];
                console.error("this category isnt on our Category map");
            }
            else if(isOrigin)
            {
                this.tileCategoryMap[tileProps.category].push({
                    tileset: this.tileCategoryTileSets[tileProps.category], // e.g. 'tiles-grass-dirt'
                    index: id,
                    weight: tileProps.weight,
                    objectWidth: tileProps.objectWidth || 1,
                    objectHeight: tileProps.objectHeight || 1
                });
            }


        }

        props[id] = tileProps;
    }

    return props;
}


    tryPlaceClustered(layer, tileMappingArray, x, y, layersToCheck = [], clusterChance = 0.3, maxDepth = 2, depth = 0)
     {
        if (depth > maxDepth) return;

        for (let i = 0; i < layersToCheck.length; i++) {
            if (layersToCheck[i].hasTileAt(x, y)) {
                return; // Tile occupied → skip
            }
        }

        let dirtCheck = this.checkGroundLayer(x,y,'dirt');
        if(dirtCheck == false)
        {
            const tile = weightedRandomTile(tileMappingArray);
            if (this.canPlaceObject(layer, x, y, tile.objectWidth, tile.objectHeight, layersToCheck)) 
            {
                this.placeObject(layer, x, y, tile);
            }
        }

        const neighbors = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ];

        neighbors.forEach(offset => {
            const nx = x + offset.dx;
            const ny = y + offset.dy;

            if (!layer.hasTileAt(nx, ny) && Math.random() < clusterChance) {
                this.tryPlaceClustered(layer, tileMappingArray, nx, ny,layersToCheck, clusterChance * 0.7, maxDepth, depth + 1);
            }
        });
    }

    canPlaceObject(layer, x, y, width, height, layersToCheck) {
    for (let dx = 0; dx < width; dx++) {
        for (let dy = 0; dy < height; dy++) {
            const nx = x + dx;
            const ny = y + dy;

            if (layer.hasTileAt(nx, ny)) return false;

            for (let i = 0; i < layersToCheck.length; i++) {
                if (layersToCheck[i].hasTileAt(nx, ny)) return false;
            }
        }
    }
    return true;
}

placeObject(layer, x, y, tile) {

    const tilesetColumns = this.tilesetColumnsLookup[tile.tileset];

    const rowOffset = Math.floor(tile.index / tilesetColumns);
    const colOffset = tile.index % tilesetColumns;

    for (let dy = 0; dy < tile.objectHeight; dy++) {
        for (let dx = 0; dx < tile.objectWidth; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            const targetCol = colOffset + dx;
            const targetRow = rowOffset + dy;
            const targetIndex = targetRow * tilesetColumns + targetCol;
            layer.putTileAt(targetIndex, nx, ny);
        }
    }
}


    checkCollisionAt(worldX, worldY) {
        const tileX = this.obstacleLayer.worldToTileX(worldX);
        const tileY = this.obstacleLayer.worldToTileY(worldY);

        const tile = this.obstacleLayer.getTileAt(tileX, tileY);

        if (tile) {
            const tileProps = this.tilesetProperties['tiles-obstacles'][tile.index];
            if (tileProps && tileProps.collides) {
                return true;
            }
        }

        return false;
    }

    isWalkableTile(worldX, worldY) {
        const tileX = this.obstacleLayer.worldToTileX(worldX);
        const tileY = this.obstacleLayer.worldToTileY(worldY);

        const obstacleTile = this.obstacleLayer.getTileAt(tileX, tileY);

        if (obstacleTile) {
            const tileProps = this.tilesetProperties['tiles-obstacles'][obstacleTile.index];
            if (tileProps && tileProps.collides) {
                return false;
            }
        }

        return true;
    }

}

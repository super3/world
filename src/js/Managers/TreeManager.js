export class TreeManager {
    constructor(scene) {
        this.scene = scene;
        this.treeGroup = scene.add.group();
    }

    placeTreeSprite(tileX, tileY, frame = 0, options = { behindRows: 2, blockRows: 2, allowInFront: false }) {
        const tileSize = 16;
        const worldX = tileX * tileSize;
        const worldY = tileY * tileSize;

        const sprite = this.scene.add.sprite(worldX, worldY, 'trees', frame);
        sprite.setOrigin(0.5, 0.5);
        sprite.setDepth(worldY + sprite.displayHeight / 2);
        sprite.allowInFront = options.allowInFront;

        this.treeGroup.add(sprite);

        const visualBottom = worldY + sprite.displayHeight / 2;
        const zoneHeight = tileSize * options.behindRows;
        const zoneY = visualBottom - zoneHeight;

        this.scene.walkBehindZones.push({
            x: worldX - tileSize,
            y: zoneY,
            width: tileSize * 2,
            height: zoneHeight,
            type: 'tree'
        });

        if (!options.allowInFront) {
            for (let dx = 0; dx < 2; dx++) {
                for (let dy = 0; dy < options.blockRows; dy++) {
                    this.scene.treeCollisionLayer.putTileAt(1, tileX + dx, tileY - dy);
                }
            }
        }
    }
}

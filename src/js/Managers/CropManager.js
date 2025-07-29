export class CropManager {
    constructor(scene) {
        this.scene = scene;
    }

    placeCropTile(tileX, tileY, topTileIndex, bottomTileIndex, options = { behindRows: 1 }) {
        const tileSize = 16;
        const worldX = tileX * tileSize;
        const worldY = tileY * tileSize;

        this.scene.cropLayerBottom.putTileAt(bottomTileIndex, tileX, tileY);
        this.scene.cropLayerTop.putTileAt(topTileIndex, tileX, tileY - 1);

        const zoneY = (tileY - options.behindRows) * tileSize;
        this.scene.walkBehindZones.push({
            x: worldX,
            y: zoneY,
            width: tileSize,
            height: tileSize * options.behindRows,
            type: 'crop'
        });
    }
}

export class StageManager {
    constructor(scene) {
        this.scene = scene;
    }

    populateLayerFromArray(layer, array) {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                const tileId = array[y][x];
                if (tileId !== -1) {
                    layer.putTileAt(tileId, x, y);
                }
            }
        }
    }
}
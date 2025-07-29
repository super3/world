import { building_blue_big, building_blue_small } from '../../js/tilemaps/buildingLayouts.js';
import { groundLayer} from '../../js/tilemaps/groundLayer.js'
import { groundLayer2} from '../../js/tilemaps/groundLayer2.js'
import { obstacleLayer} from '../../js/tilemaps/obstacleLayer.js'
import { decorLayer} from '../../js/tilemaps/decorLayer.js'
export function loadStage0(scene) {
    const {stageManager, treeManager, cropManager, buildingManager } = scene;

        stageManager.populateLayerFromArray(scene.groundLayer, groundLayer);
        stageManager.populateLayerFromArray(scene.groundLayer2, groundLayer2);
        stageManager.populateLayerFromArray(scene.obstacleLayer, obstacleLayer);
        stageManager.populateLayerFromArray(scene.decorLayer, decorLayer);

    // === Buildings ===
    buildingManager.registerBuilding({
        x: 5,
        y: 1,
        layout: building_blue_big
    });

    buildingManager.registerBuilding({
        x: 23,
        y: 1,
        layout: building_blue_small
    });

    // === Trees ===
    const treeData = [
        { x: 1, y: 2, frame: 0 },
        { x: 3, y: 2, frame: 1 },
        { x: 2, y: 3, frame: 2 },
        { x: 4, y: 3, frame: 2 },
        { x: 6, y: 2, frame: 3 },
        { x: 21, y: 3, frame: 3 },
        { x: 30, y: 4, frame: 3 },
        { x: 13, y: 3, frame: 3 },
        { x: 14, y: 4, frame: 3 },
        { x: 15, y: 2, frame: 3 },
        { x: 17, y: 4, frame: 3 },
        { x: 18, y: 3, frame: 3 },
        { x: 20, y: 5, frame: 3 },
        { x: 23, y: 15, frame: 3 }
    ];

    treeData.forEach(({ x, y, frame }) => {
        treeManager.placeTreeSprite(x, y, frame, {
            behindRows: 2,
            blockRows: 1,
            allowInFront: true
        });
    });

    // === Crops ===
    const crops = [
        [0, 6], [0, 7], [0, 8], [0, 9],
        [1, 6], [1, 7], [1, 9]
    ];

    crops.forEach(([x, y]) => {
        cropManager.placeCropTile(x, y, 1075, 1139);
    });

    
}


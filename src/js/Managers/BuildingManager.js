export class BuildingManager {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
    }

    registerBuilding({ x, y, layout }) {
        const building = {
            x, y,
            width: layout.tiles[0].length,
            height: layout.tiles.length,
            layout,
            visible: true,
            active: true,
            isFadingOut: false,
            isFadingIn: false,
            fadeTween: null
        };
        this.buildings.push(building);
        this.placeBuilding(building);
    }

    placeBuilding(building) {
        const { x, y, layout } = building;
        const s = this.scene;

        this.populateLayoutToLayer(s.buildingLayer, layout.tiles, x, y);
        this.populateLayoutToLayer(s.buildingLayer_inside_floor, layout.tiles_inside_floor || [], x, y);
        this.populateLayoutToLayer(s.buildingLayer_inside, layout.tiles_inside || [], x, y);
        this.populateLayoutToLayer(s.buildingLayer_inside_decor, layout.tiles_inside_decor1 || [], x, y);
        this.populateLayoutToLayer(s.buildingLayer_inside_decor2, layout.tiles_inside_decor2 || [], x, y);

        s.buildingLayer_inside.setAlpha(0);
        s.buildingLayer_inside_floor.setAlpha(0);
        s.buildingLayer_inside_decor.setAlpha(0);
        s.buildingLayer_inside_decor2.setAlpha(0);

        this.markBuildingObstacles(building);
        this.markWalkBehindZones(building);
    }

    markBuildingObstacles(building) {
        const { x, y, layout } = building;
        const doors = layout.doors || [];
        const rule = layout.obstacleRule || (() => false);

        for (let j = 0; j < layout.tiles.length; j++) {
            for (let i = 0; i < layout.tiles[j].length; i++) {
                const isDoor = doors.some(d => d.x === i && d.y === j);
                if (!isDoor && rule(i, j, layout.tiles)) {
                    this.scene.buildingCollisionLayer.putTileAt(1, x + i, y + j);
                }
            }
        }
    }

    markWalkBehindZones(building) {
        const { x, y, layout } = building;
        const tileSize = 16;
        const height = layout.walkBehindHeight || 1;
        const rule = layout.walkBehindRule;

        if (!rule) return;

        for (let j = 0; j < layout.tiles.length; j++) {
            for (let i = 0; i < layout.tiles[j].length; i++) {
                if (rule(i, j)) {
                    const wx = (x + i) * tileSize;
                    const wy = (y + j) * tileSize;
                    this.scene.walkBehindZones.push({
                        x: wx,
                        y: wy,
                        width: tileSize,
                        height: tileSize * height,
                        type: 'building',
                        depth: 6
                    });
                }
            }
        }
    }

    update() {
        const s = this.scene;
        const tileSize = 16;

        for (const building of this.buildings) {
            const worldBounds = new Phaser.Geom.Rectangle(
                building.x * tileSize,
                building.y * tileSize,
                building.width * tileSize,
                building.height * tileSize
            );

            const anyInside = s.entities.some(e => Phaser.Geom.Rectangle.Contains(worldBounds, e.sprite.x, e.sprite.y));

            const transitioning = building.isFadingOut || building.isFadingIn;

            if (anyInside && building.visible && !transitioning) {
                this.enterBuilding(building);
            } else if (!anyInside && !building.visible && !transitioning) {
                this.exitBuilding(building);
            }
        }
    }

    enterBuilding(building) {
        if (building.isFadingOut || !building.layout.tiles_inside) return;

        if (building.isFadingIn && building.fadeTween) {
            building.fadeTween.stop();
            building.isFadingIn = false;
            building.fadeTween = null;
        }

        const s = this.scene;
        building.isFadingOut = true;

        const tilesToFade = [];
        for (let y = 0; y < building.layout.tiles.length; y++) {
            for (let x = 0; x < building.layout.tiles[0].length; x++) {
                const tile = s.buildingLayer.getTileAt(building.x + x, building.y + y);
                if (tile) {
                    tile.alpha = 1;
                    tilesToFade.push(tile);
                }
            }
        }

        building.fadeTween = s.tweens.add({
            targets: tilesToFade,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                for (let t of tilesToFade) {
                    s.buildingLayer.removeTileAt(t.x, t.y);
                    s.buildingCollisionLayer.removeTileAt(t.x, t.y);
                }
                building.visible = false;
                building.isFadingOut = false;
                building.fadeTween = null;
            }
        });

        s.buildingLayer_inside.setAlpha(1);
        s.buildingLayer_inside_floor.setAlpha(1);
        s.buildingLayer_inside_decor.setAlpha(1);
        s.buildingLayer_inside_decor2.setAlpha(1);

        s.entities.forEach(e => e.gridGenerated = false);
    }

    exitBuilding(building) {
    if (building.isFadingOut && building.fadeTween) {
        building.fadeTween.stop();
        building.isFadingOut = false;
        building.fadeTween = null;
    }

        const s = this.scene;
        const tileSize = 16;

        const worldX = building.x * tileSize;
        const worldY = building.y * tileSize;
        const width = building.width * tileSize;
        const height = building.height * tileSize;

        const anyoneInside = s.entities.some(e =>
            e.sprite.x >= worldX &&
            e.sprite.x <= worldX + width &&
            e.sprite.y >= worldY &&
            e.sprite.y <= worldY + height
        );

        if (anyoneInside) return;

        building.isFadingIn = true;
        this.populateLayoutToLayer(s.buildingLayer, building.layout.tiles, building.x, building.y);
        this.markBuildingObstacles(building);
        building.visible = true;

        s.buildingLayer.setAlpha(0.5);

        s.entities.forEach(e => e.gridGenerated = false);

        building.fadeTween = s.tweens.add({
            targets: s.buildingLayer,
            alpha: 1,
            duration: 300,
            onComplete: () => {
                building.isFadingIn = false;
                building.fadeTween = null;
                s.buildingLayer_inside.setAlpha(0);
                s.buildingLayer_inside_floor.setAlpha(0);
                s.buildingLayer_inside_decor.setAlpha(0);
                s.buildingLayer_inside_decor2.setAlpha(0);
            }
        });
    }

    populateLayoutToLayer(layer, tileArray, startX, startY) {
    for (let y = 0; y < tileArray.length; y++) {
        for (let x = 0; x < tileArray[y].length; x++) {
            const tileId = tileArray[y][x];
            if (tileId !== -1) {
                layer.putTileAt(tileId, startX + x, startY + y);
            }
        }
    }
}
}

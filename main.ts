controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE == 3) {
        zoom += 0.1
        Zoom.SetZoomFilter(zoom, Mode.Center)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE > 1) {
        MODE += -1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE < 3) {
        MODE += 1
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE == 2) {
        if (ID != 1) {
            ID += -1
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE == 2) {
        if (ID != 2) {
            ID += 1
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MODE == 3) {
        if (zoom > 1) {
            zoom += -0.1
            Zoom.SetZoomFilter(zoom, Mode.Center)
        }
    }
})
let MODE = 0
let ID = 0
let zoom = 0
tiles.setCurrentTilemap(tilemap`level1`)
tileUtil.setWalls(assets.tile`transparency16`, true)
zoom = 1
ID = 1
MODE = 1
let główny = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(główny)
tiles.placeOnTile(główny, tiles.getTileLocation(10, 9))
scene.cameraFollowSprite(główny)
let szlaban_dół = sprites.create(img`
    . 4 4 4 . 
    4 4 4 4 4 
    4 1 1 1 4 
    4 4 4 4 4 
    . 4 4 4 . 
    `, SpriteKind.Player)
tiles.placeOnTile(szlaban_dół, tiles.getTileLocation(10, 12))
szlaban_dół.x += 8
szlaban_dół.y += 11
let szlaban_góra = sprites.create(img`
    . 4 4 4 . 
    4 4 4 4 4 
    4 1 1 1 4 
    4 4 4 4 4 
    . 4 4 4 . 
    `, SpriteKind.Player)
tiles.placeOnTile(szlaban_góra, tiles.getTileLocation(9, 9))
szlaban_góra.x += 6
szlaban_góra.y += 13
let text_mode = textsprite.create("MOVE", 4, 3)
text_mode.setBorder(1, 4)
forever(function () {
    if (controller.A.isPressed() || controller.B.isPressed()) {
        timer.after(200, function () {
            if (MODE == 1) {
                główny.setImage(assets.image`myImage`)
                controller.moveSprite(główny, 100 * (1 / zoom), 100 * (1 / zoom))
                text_mode.setText("MOVE")
            } else if (MODE == 2) {
                główny.setImage(assets.image`myImage0`)
                controller.moveSprite(główny, 0, 0)
            } else if (MODE == 3) {
                główny.setImage(assets.image`myImage1`)
                controller.moveSprite(główny, 0, 0)
                text_mode.setText("ZOOM")
            }
        })
    }
})
forever(function () {
    if (MODE == 2) {
        text_mode.setPosition(główny.x + 10, główny.y - 25)
        text_mode.setText("SELECT:" + convertToText(ID))
        if (ID == 1) {
            główny.setVelocity((szlaban_dół.x - główny.x) / 1, (szlaban_dół.y - główny.y) / 1)
            Zoom.SetZoomFilter(2, Mode.Center, 1000)
            timer.after(1000, function () {
                główny.setVelocity(0, 0)
            })
        } else if (ID == 2) {
            główny.setVelocity((szlaban_góra.x - główny.x) / 1, (szlaban_góra.y - główny.y) / 1)
            Zoom.SetZoomFilter(2, Mode.Center, 1000)
            timer.after(1000, function () {
                główny.setVelocity(0, 0)
            })
        }
    } else {
        text_mode.setPosition(główny.x + 1 / zoom * 50, główny.y - 1 / zoom * 50)
        Zoom.SetZoomFilter(zoom, Mode.Center, 1000)
    }
})

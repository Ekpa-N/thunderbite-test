export function spriteMaker(array, array2) {
    array.forEach((item) => {
        let sprite = {}
        sprite.sprite = PIXI.Sprite.from(item.url)
        sprite.name = item.name
        sprite.smallMobile = item.smallMobile
        sprite.largeMobile = item.largeMobile
        sprite.tablet = item.tablet
        sprite.laptop = item.laptop
        array2.push(sprite)
    })
    console.log(array2)
}


export function mobileView(theSprite, app) {
    if(theSprite.name === 'header' || theSprite.name === 'showdown') {
        return
    } else {
        const { sprite, smallMobile } = theSprite
        const { positionX, positionY, height, width} = smallMobile
        sprite.position.set(positionX, positionY)
        sprite.height = height
        sprite.width = width
        // app.stage.addChild(sprite)
    }
}
export function tabletView(theSprite, app) {
    if(theSprite.name === 'header' || theSprite.name === 'showdown') {
        return
    } else {
        const { sprite, tablet } = theSprite
        const { positionX, positionY, height, width} = tablet
        sprite.position.set(positionX, positionY)
        sprite.height = height
        sprite.width = width
        // app.stage.addChild(sprite)
    }
}
export function mobileLargeView(theSprite, app) {
    if(theSprite.name === 'header' || theSprite.name === 'showdown') {
        return
    } else {
        const { sprite, largeMobile } = theSprite
        const { positionX, positionY, height, width} = largeMobile
        sprite.position.set(positionX, positionY)
        sprite.height = height
        sprite.width = width
        // app.stage.addChild(sprite)
    }
}
export function laptopView(theSprite, app) {
    if(theSprite.name === 'header' || theSprite.name === 'showdown') {
        return
    } else {
        const { sprite, laptop } = theSprite
        const { positionX, positionY, height, width} = laptop
        sprite.position.set(positionX, positionY)
        sprite.height = height
        sprite.width = width
        // app.stage.addChild(sprite)
    }
}

function bolting () {
    let boltFlickering = setInterval(()=>{
        if(flickerCounter < 4 && checkFlicker === 1){
            flickerCounter = flickerCounter + 1
            checkFlicker = checkFlicker - 1
            spritesArray[2].sprite.alpha = checkFlicker            
            spritesArray[5].sprite.alpha = checkFlicker            
        } else if(flickerCounter < 4 && checkFlicker === 0){
            flickerCounter = flickerCounter + 1
            checkFlicker = checkFlicker + 1
            spritesArray[2].sprite.alpha = checkFlicker
            spritesArray[5].sprite.alpha = checkFlicker
        } else {
            clearInterval(vegasFlickering)
            console.log("done")
        }
    },100)
}

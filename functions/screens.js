//screen views
export function mobileView(theSprite, app) {
    if(theSprite.name === 'header' || theSprite.name === 'showdown') {
        return
    } else {
        const { sprite, smallMobile } = theSprite
        const { positionX, positionY, height, width} = smallMobile
        sprite.position.set(positionX, positionY)
        sprite.height = height
        sprite.width = width
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
    }
}
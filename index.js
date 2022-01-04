import { spriteMaker, mobileLargeView, mobileView, tabletView, laptopView } from "./functions.js"
import { spriteData } from "./spritesData.js"
const mainDiv = document.getElementById("main-div")
const canvas = document.getElementById("canvas-one")

// Rewriting for more reusable code
const Application = PIXI.Application,
Sprite = PIXI.Sprite

let spritesArray = []
spriteMaker(spriteData, spritesArray)

// create pixi application
const app = new Application ({
    view: canvas,
    autoResize: true,
    backgroundColor: 333
})
// mainDiv.appendChild(app.view)
window.addEventListener('resize',resize)

const canvasHeader = spritesArray.find(item => item.name === "header")
const theShowDown = spritesArray.find(item => item.name === "showdown")

function resize() {
    const parent = app.view.parentNode    
    app.renderer.resize(parent.clientWidth, parent.clientHeight)
    canvasHeader.sprite.width = parent.clientWidth 
    canvasHeader.sprite.height = parent.clientHeight
    theShowDown.sprite.height = parent.clientHeight
    theShowDown.sprite.width = parent.clientWidth
    letterResize(window.innerWidth)
}
resize()

let counter = 5
let checkFlicker = 0
let flickerCounter = 0
let boltFlick = false

function letterResize (width) {
    width <= 400 ? spritesArray.map(sprite => mobileView(sprite, app)):
    width <=600 ? spritesArray.map(sprite => mobileLargeView(sprite, app)):
    width <= 800 ? spritesArray.map(sprite => tabletView(sprite, app)):
    spritesArray.map(sprite => laptopView(sprite, app))
}

setTimeout(vegasRender, 500)
setTimeout(renderLetters, 1200)
setTimeout(boltFlicker,1700)

function vegasRender() {
    app.stage.addChild(spritesArray[2].sprite)
    app.stage.addChild(spritesArray[5].sprite)
    checkFlicker = 1
    setTimeout(flicker, 700)    
}

function flicker() {
    let vegasFlickering = setInterval(()=>{
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

function boltFlicker () {
    app.stage.addChild(spritesArray[3].sprite)           
    app.stage.addChild(spritesArray[4].sprite)           
    boltFlick = !boltFlick           
    setInterval(()=>{
        if(boltFlick){
            spritesArray[4].sprite.alpha = 0
            boltFlick = !boltFlick
        } else {
            spritesArray[4].sprite.alpha = 1
            boltFlick = !boltFlick
        } 
    },70)
}

function renderLetters() {
    let lightingInt = setInterval(()=>{
        counter < 13 ? 
        (counter = counter + 1, 
        console.log(counter),
        app.stage.addChild(spritesArray[counter].sprite)) :
        (counter = 5,
        console.log(counter),
        clearInterval(lightingInt))
    }, 180)
}




app.stage.addChild(canvasHeader.sprite)
app.stage.addChild(theShowDown.sprite)
// spritesArray.forEach(sprite => app.stage.addChild(sprite.sprite))


// function setup() {
//     // create the sprite
//     const sprite = new Sprite.from(theImages[2])
//     const spriteTwo = new Sprite.from(theImages[1])
//     const showdownOff = new Sprite.from(theImages[3])
//     const letterS = new Sprite.from(theImages[4])

//     // position the sprite
//     sprite.position.set(342, -52)    
//     spriteTwo.position.set(380,-8)
//     letterS.position.set(-60,4)

//     // Resize the sprite
//     sprite.width = 157
//     sprite.height = 195
//     spriteTwo.height = 116
//     spriteTwo.width = 80


//     // Stage the sprite
//     app.stage.addChild(spriteTwo)
//     app.stage.addChild(showdownOff)
//     app.stage.addChild(letterS)
    
//     // move the sprite
//     // app.ticker.add((delta) => gameLoop(delta))

//     // function flickerTimer () {
//     //     const flicker = setInterval(() => {
//     //         if ((flickerCounter < 20) && (checker === true)) {
//     //             app.stage.removeChild(spriteTwo)
//     //             app.stage.addChild(sprite)
//     //             checker = !checker
//     //             flickerCounter = flickerCounter + 1
//     //         } else if((flickerCounter < 20) && (checker === false)) {
//     //             app.stage.removeChild(sprite)
//     //             app.stage.addChild(spriteTwo)
//     //             checker = !checker
//     //             flickerCounter = flickerCounter + 1
//     //         } else {
//     //             clearInterval(flicker)
//     //             flickerCounter = 0
//     //         }
//     //     }, 70)
//     // }

//     // setInterval(flickerTimer, 5000)

//     // function flickerControl() {
//     //     clearInterval(flicker)
//     // }
    
//     // function gameLoop(delta) {
//     //     //Move the sprite 1 pixel 
//     //     // sprite.x += 1;
//     //     if (checker) {            
//     //         app.stage.removeChild(spriteTwo)
//     //         app.stage.addChild(sprite)
//     //         checker = !checker
//     //     } else {
//     //         app.stage.removeChild(sprite)            
//     //         app.stage.addChild(spriteTwo)            
//     //         checker = !checker
//     //     }
//     //   }
// }

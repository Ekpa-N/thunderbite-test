// importing necessary files
import { spriteMaker, mobileLargeView, mobileView, tabletView, laptopView } from "./functions.js"
import { spriteData } from "./spritesData.js"

// storing dom elements
const mainDiv = document.getElementById("main-div")
const canvas = document.getElementById("canvas-one")

// Setting pixi functions to variables for easier readability
const Application = PIXI.Application,
Sprite = PIXI.Sprite

// variables
let counter = 5
let checkFlicker = 0
let flickerCounter = 0
let boltFlick = false
let spritesArray = []

//creating sprites and storing in array
spriteMaker(spriteData, spritesArray)

// creating pixi application
const app = new Application ({
    view: canvas,
    autoResize: true,
    backgroundColor: 333
})

// Adding resize event listener for responsiveness
window.addEventListener('resize',resize)

// storing the background images for reuse
const canvasHeader = spritesArray.find(item => item.name === "header")
const theShowDown = spritesArray.find(item => item.name === "showdown")

app.stage.addChild(canvasHeader.sprite)
app.stage.addChild(theShowDown.sprite)

// Resize function
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


// reizing the showdown text
function letterResize (width) {
    width <= 400 ? spritesArray.map(sprite => mobileView(sprite, app)):
    width <=600 ? spritesArray.map(sprite => mobileLargeView(sprite, app)):
    width <= 800 ? spritesArray.map(sprite => tabletView(sprite, app)):
    spritesArray.map(sprite => laptopView(sprite, app))
}


// timers for light flickering
setTimeout(vegasRender, 500)
setTimeout(renderLetters, 1200)
setTimeout(boltFlicker,1700)


// timer functions
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






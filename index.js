// importing necessary files
import { spriteMaker, mobileLargeView, mobileView, tabletView, laptopView } from "./functions.js"
import { spriteData, wheelData } from "./spritesData.js"

// storing dom elements
const wheelDiv = document.getElementById("wheel-div"),
      canvas = document.getElementById("canvas-one")


// Setting pixi functions to variables for easier readability
const Application = PIXI.Application,
Sprite = PIXI.Sprite

// variables
let counter = 5,
    checkFlicker = 0,
    flickerCounter = 0,
    boltFlick = false,
    spritesArray = []


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


// Rotate the wheel


// Resize function
function resize() {
    const parent = app.view.parentNode   
    app.renderer.resize(parent.clientWidth, parent.clientHeight)  
    canvasHeader.sprite.width = parent.clientWidth 
    canvasHeader.sprite.height = parent.clientHeight
    theShowDown.sprite.height = parent.clientHeight
    theShowDown.sprite.width = parent.clientWidth
    letterResize(window.innerWidth, spritesArray)
}
resize()


// resizing the showdown text
function letterResize (width, spritesArray) {
    width <= 400 ? spritesArray.map(sprite => mobileView(sprite, app)):
    width <=600 ? spritesArray.map(sprite => mobileLargeView(sprite, app)):
    width <= 800 ? spritesArray.map(sprite => tabletView(sprite, app)):
    spritesArray.map(sprite => laptopView(sprite, app))
}


// timers for light flickering
// setTimeout(vegasRender, 500)
// setTimeout(renderLetters, 1200)
// setTimeout(boltFlicker,1700)


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


// setting up the spinners
const reset = document.getElementById("reset")
let spinRange = 0
let canReset = false
let spunWheel = []

// spin function
function spin(theWheel, button) {
    reset.removeEventListener('click', resetWheel)
    button.removeEventListener('click', spin)
    button.style.display = 'none'
    spinRange = Math.floor(2520 + Math.random() * 100)
    theWheel.style.transition = 'all 5s ease-out'
    theWheel.style.transform = `rotate(${spinRange}deg)`
    spunWheel.push("spun")
}

// checking a wheel spin has ended
function spun() {
    spunWheel.length === 3 ?
    reset.addEventListener('click', resetWheel) : null
    spunWheel = []   
}

// reset function to reset all wheels
function resetWheel() {
    reset.removeEventListener('click', resetWheel)
    let wheels = []
    let buttons =[]
    wheelStuff.map((item) => {
        item.name === "wheel" ?
        wheels.push(item) : buttons.push(item)
    })
    const currentSpinRange = 0
    wheels.forEach((wheel) => {
        wheel.style.transition = 'all 1s ease-out'
        wheel.style.transform = `rotate(${currentSpinRange}deg)`
    })
    buttons.forEach((button) => {
        button.style.display = 'inline-block'
        button.addEventListener('click', spin)
    })
}

// creating wheels
for(let i=0; i<wheelData.length; i++) {
    let wheelHolder = document.createElement('div')
    wheelHolder.classList.add("wheel-holder")
    wheelData.map((data)=> {
        let img = document.createElement("img")
        img.src = data.url
        img.name = data.name
        img.classList.add(data.class)
        wheelHolder.appendChild(img)
    })
    wheelDiv.appendChild(wheelHolder)
}

// adding event listeners to wheels and buttons
const wheelStuff = Array.from(document.getElementsByClassName("wheel"))
wheelStuff.forEach((item, index) => {
    index % 2 === 0 ?
    item.addEventListener('transitionend', spun) :
    index % 2 !== 0 ?
    item.addEventListener('click', () => spin(wheelStuff[index - 1], item)) :
    null   
})




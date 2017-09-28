class Complex {
    constructor(re,im) {
        this.re = re
        this.im = im
    }
    square() {
        return Complex.multiply(this,this)
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.re,2)+Math.pow(this.im,2))
    }
    static multiply(c1,c2) {
        return new Complex(c1.re*c2.re-c1.im*c2.im,(c1.re*c2.im)+(c1.im*c2.re))
    }
    static add(c1,c2) {
        return new Complex(c1.re+c2.re,c1.im+c2.im)
    }
    static map(a,b,w,h) {
        const diff = b-a
        const complexNumbers = []
        for(var j=0;j<h;j++) {
            for(var i=0;i<w;i++) {
                const re = i*(diff)/w,im = j*(diff)/h
                complexNumbers.push(new Complex(re,im))
            }
        }
        return complexNumbers
    }
}
class MandrebotSet {
    constructor(n,lastVal) {
        this.n = n
        this.lastVal = lastVal
        this.pixels = []
    }
    calculateMandrebot(c) {
        var i = 0
        var currComplexNum = c
        while(i < n) {
            var sq = currComplexNum.square()
            if(sq.magnitude() >= this.lastVal) {
                break
            }
            currComplexNum = Complex.add(currComplexNum,sq)
            i++
        }
        const pixel = Math.floor((255*i)/100)
        this.pixels.push(pixel)
    }
}
const createCanvas = (w,h) => {
    window.canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    window.context = canvas.getContext('2d')
}
const getPixels = () => {
    window.imData = window.context.getImageData(0,0,window.canvas.width,window.canvas.height)
    return imData.data
}
const setPixels = () => {
    context.setImageData(imData,0,0)
}
const setBackground = (color) => {
    context.fillStyle = color
    context.fillRect(0,0,canvas.width,canvas.height)
}
createCanvas(400,400)
const complexNums = Complex.map(-2,2,400,400)
const pixels = getPixels()
const mandreBotSet = new MandrebotSet(100,16)
complexNums.forEach((complexNum)=>{
    mandreBotSet.calculateMandrebot(complexNum)
})
mandreBotSet.pixels.forEach((pixel,index)=>{
    const i = 4*index
    pixels[i] = pixel
    pixels[i+1] = pixel
    pixels[i+2] = pixel
})
setPixels()

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
                const re = a+i*(diff)/w,im = a+j*(diff)/h
                complexNumbers.push(new Complex(re,im))
            }
        }
        return complexNumbers
    }
}
class MandlebrotSet {
    constructor(n,lastVal) {
        this.n = n
        this.lastVal = lastVal
        this.pixels = []
    }
    calculateMandrebot(c) {
        var i = 0
        var currComplexNum = c
        while(i < this.n) {
            var sq = currComplexNum.square()
            currComplexNum = Complex.add(c,sq)
            if(sq.magnitude() >= this.lastVal) {
                break
            }
            i++
        }

        var pixel = Math.floor((255*(i))/100)
        this.pixels.push(pixel)
    }
}
const createCanvas = (w,h) => {
    window.canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    window.context = canvas.getContext('2d')
    document.body.appendChild(canvas)
}
const getPixels = () => {
    window.imData = window.context.getImageData(0,0,window.canvas.width,window.canvas.height)
    return imData.data
}
const setPixels = () => {
    context.putImageData(imData,0,0)
}
const setBackground = (color) => {
    context.fillStyle = color
    context.fillRect(0,0,canvas.width,canvas.height)
}
createCanvas(400,400)
setBackground('#212121')
const complexNums = Complex.map(-2.5,2.5,400,400)
const pixels = getPixels()
const mandlebrotSet = new MandlebrotSet(100,2)
complexNums.forEach((complexNum)=>{
    mandlebrotSet.calculateMandrebot(complexNum)
})
mandlebrotSet.pixels.forEach((pixel,index)=>{
    const i = 4*index
    pixels[i] = pixel
    pixels[i+1] = pixel
    pixels[i+2] = pixel
})
setPixels()

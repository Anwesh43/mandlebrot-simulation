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
}
class MandrebotSet {
    constructor(n,lastVal) {
        this.n = n
        this.lastVal = lastVal
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
        return Math.floor(255*(i)/100)
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
    window.context.setImageData(window.imData,0,0)
}

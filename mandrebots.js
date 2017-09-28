class Complex {
    constructor(re,im) {
        this.re = re
        this.im = im
    }
    static multiply(c1,c2) {
        return new Complex(c1.re*c2.re-c1.im*c2.im,(c1.re*c2.im)+(c1.im*c2.re))
    }
    static add(c1,c2) {
        return new Complex(c1.re+c2.re,c1.im+c2.im)
    }
}



class Output {
    static printer;
    static setPrinter (type) {
        this.printer = type
    }
    static print (x) {
        if (this.printer == undefined) {
            console.log(x)
        }
        if (x == undefined) {
            console.log('undefined')
        }
        this.printer.print(x)

    }
}

module.exports = {
    Output
}


class Output {
    static printer;
    static setPrinter = (type) => {
        this.printer = type
    }
    static print = (x) => {
        if (printer == undefined) {
            console.log(x)
        }
        if (x == undefined) {
            console.log('undefined')
        }
        printer.print(x)

    }
}

module.exports = {
    Output
}
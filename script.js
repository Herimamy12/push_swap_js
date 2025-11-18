/* ---------------------------------- */
// Class PushSwap.
/* ---------------------------------- */

class PushSwap {
    stacka = []
    stackb = []

    constructor (stack) {
        this.stacka = stack;
    }
}

/* ---------------------------------- */
// Methodes de log.
/* ---------------------------------- */

PushSwap.prototype.LogStack = function(elements) {
    elements.forEach(element => {
        console.log(element)
    })
}

/* ---------------------------------- */
// Methodes de bases utiles.
/* ---------------------------------- */

PushSwap.prototype.SwapA = function () {
    first = this.stacka.at(0)
    this.stacka.shift()
    second = this.stacka.at(0)
    this.stacka.shift()

    this.stacka.unshift(first)
    this.stacka.unshift(second)
    console.log("sa")
}

PushSwap.prototype.SwapB = function () {
    first = this.stackb.at(0)
    this.stackb.shift()
    second = this.stackb.at(0)
    this.stackb.shift()

    this.stackb.unshift(first)
    this.stackb.unshift(second)
    console.log("sb")
}

PushSwap.prototype.SwapSS = function () {
    this.SwapA()
    this.SwapB()
    console.log("ss")
}

PushSwap.prototype.PushA = function () {
    this.stacka.unshift(this.stackb.at(0))
    this.stackb.shift()
    console.log("pa")
}

PushSwap.prototype.PushB = function () {
    this.stackb.unshift(this.stacka.at(0))
    this.stacka.shift()
    console.log("pb")
}

PushSwap.prototype.RotateA = function () {
    first = this.stacka.at(0)
    this.stacka.shift()
    this.stacka.push(first)
    console.log("ra")
}

PushSwap.prototype.RotateB = function () {
    first = this.stackb.at(0)
    this.stackb.shift()
    this.stackb.push(first)
    console.log("rb")
}

PushSwap.prototype.RotateRR = function () {
    this.RotateA()
    this.RotateB()
    console.log("rr")
}

PushSwap.prototype.ReverseRotateA = function () {
    last = this.stacka.at(this.stacka.length - 1)
    this.stacka.pop()
    this.stacka.unshift(last)
    console.log("rra")
}

PushSwap.prototype.ReverseRotateB = function () {
    last = this.stackb.at(this.stackb.length - 1)
    this.stackb.pop()
    this.stackb.unshift(last)
    console.log("rrb")
}

PushSwap.prototype.ReverseRotateRR = function () {
    this.ReverseRotateA()
    this.ReverseRotateB()
    console.log("rrr")
}

/* ---------------------------------- */
// Methodes pour l'algorithme de tri
/* ---------------------------------- */

PushSwap.prototype.SortTwo = function () {
    if (this.stacka.at(0) > this.stacka.at(1)) {
        this.SwapA()
    }
}

PushSwap.prototype.SortThree = function () {
    if (this.stacka.length <= 1) {
        return
    }
    this.SortTwo()
    if (this.stacka.length === 2) {
        return
    }
    if (this.stacka.at(2) < this.stacka.at(0)) {
        this.ReverseRotateA()
    } else if (this.stacka.at(2) < this.stacka.at(1)) {
        this.ReverseRotateA()
        this.SwapA()
    }
}

PushSwap.prototype.Max = function(elements) {
    max = elements.at(0)
    elements.forEach(element => {
        if (max < element) {
            max = element
        }
    })
    return max
}

PushSwap.prototype.Min = function(elements) {
    min = elements.at(0)
    elements.forEach(element => {
        if (min > element) {
            min = element
        }
    })
    return min
}

PushSwap.prototype.FindTarget = function (value) {
    min = this.Min(this.stacka)
    while (this.stacka.at(0) != min) {
        this.ReverseRotateA()
    }
    targetIndex = 0
    for (i = 0; i < this.stacka.length; i ++) {
        if (this.stacka.at(i) > value) {
            break ;
        }
        targetIndex ++
    }
    return targetIndex
}

PushSwap.prototype.sort = function () {
    while (this.stacka.length > 3) {
        this.PushB()
    }
    this.SortThree()
    while (this.stackb.length) {
        targetIndex = this.FindTarget(this.stackb.at(0))
        for ( ; targetIndex > 0; targetIndex --) {
            this.RotateA()
        }
        this.PushA()
    }
    min = this.Min(this.stacka)
    while (this.stacka.at(0) != min) {
        this.ReverseRotateA()
    }
    return this.stacka
}

/* ---------------------------------- */
// Initialisation du variable source.
/* ---------------------------------- */

let src = []

while (src.length < 20) {
    let int = Math.floor(Math.random() * 100);
    if (!src.includes(int)) {
        src.push(int);
    }
}

/* ---------------------------------- */
// Point d'entree du programme.
/* ---------------------------------- */

let ps = new PushSwap(src)
ps.LogStack(src)
// console.log("-------------")
src = ps.sort()
// console.log("-------------")
// ps.LogStack(src)

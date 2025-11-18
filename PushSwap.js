/* ---------------------------------- */
// Class PushSwap.
/* ---------------------------------- */

export class PushSwap {
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
    let first = this.stacka.at(0)
    this.stacka.shift()
    let second = this.stacka.at(0)
    this.stacka.shift()

    this.stacka.unshift(first)
    this.stacka.unshift(second)
    console.log("sa")
}

PushSwap.prototype.SwapB = function () {
    let first = this.stackb.at(0)
    this.stackb.shift()
    let second = this.stackb.at(0)
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
    let first = this.stacka.at(0)
    this.stacka.shift()
    this.stacka.push(first)
    console.log("ra")
}

PushSwap.prototype.RotateB = function () {
    let first = this.stackb.at(0)
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
    let last = this.stacka.at(this.stacka.length - 1)
    this.stacka.pop()
    this.stacka.unshift(last)
    console.log("rra")
}

PushSwap.prototype.ReverseRotateB = function () {
    let last = this.stackb.at(this.stackb.length - 1)
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
    let max = elements.at(0)
    elements.forEach(element => {
        if (max < element) {
            max = element
        }
    })
    return max
}

PushSwap.prototype.Min = function(elements) {
    let min = elements.at(0)
    elements.forEach(element => {
        if (min > element) {
            min = element
        }
    })
    return min
}

PushSwap.prototype.MinPos = function() {
    let minpos = 0
    let min = this.stacka.at(0)
    for (let i = 0; i < this.stacka.length; i ++) {
        if (min > this.stacka.at(i)) {
            min = this.stacka.at(i)
            minpos = i
        }
    }
    return minpos
}

PushSwap.prototype.FindTarget = function (value) {
    let min = this.Min(this.stacka)
    let max = this.Max(this.stacka)
    if (min > value || value > max) {
        return this.MinPos()
    }
    let start = false
    let targetIndex = 0
    for (let i = 0; i < this.stacka.length; i ++) {
        if (start && this.stacka.at(i) > value) {
            break ;
        }
        if (this.stacka.at(i) < value) {
            start = true
        }
        targetIndex ++
    }
    return targetIndex
}

PushSwap.prototype.SetRotateA = function(targetIndex) {
    if (targetIndex < this.stacka.length / 2) {
        for (; targetIndex > 0; targetIndex --) {
            this.RotateA()
        }
    } else {
        let iter = this.stacka.length - targetIndex
        for (; iter > 0; iter --) {
            this.ReverseRotateA()
        }
    }
}

PushSwap.prototype.sort = function () {
    while (this.stacka.length > 3) {
        this.PushB()
    }
    this.SortThree()
    while (this.stackb.length) {
        let targetIndex = this.FindTarget(this.stackb.at(0))
        this.SetRotateA(targetIndex)
        this.PushA()
    }
    while (this.stacka.at(0) != this.Min(this.stacka)) {
        let minpos = this.MinPos()
        this.SetRotateA(minpos)
    }
    return this.stacka
}

import { PushSwap } from "./PushSwap.js";

/* ---------------------------------- */
// Initialisation du variable source.
/* ---------------------------------- */

let src = []

while (src.length < 100) {
    let int = Math.floor(Math.random() * 1000);
    if (!src.includes(int)) {
        src.push(int);
    }
}

// let src = [3, 44, 47, 96, 92, 21, 22, 99, 83, 89]

/* ---------------------------------- */
// Point d'entree du programme.
/* ---------------------------------- */

let ps = new PushSwap(src)
ps.LogStack(src)
// console.log("-------------")
src = ps.sort()
// console.log("-------------")
// ps.LogStack(src)

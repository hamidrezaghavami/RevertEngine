// writing BoundedStack Class to handle stack algorithms based on Pseudo file
export class BoundedStack {
    constructor() { 
        this.array = []; // defining empty array 
        this.maxLimit = 100; // put static limit of 100 for maxLimit
    }

    funcPush(element) { 
        this.array.push(element);

        if ( this.array.length > this.maxLimit ) { 
            this.array.shift();
        }
    }

    funcPop() {
        if ( this.array.length > 0 ) { 
            return this.array.pop(); // removing last element
        }
    }

    funcPeek() {
        return this.array[this.array.length - 1];
    }

    funcClear() {
        this.array = []; // clear the array
    }
};
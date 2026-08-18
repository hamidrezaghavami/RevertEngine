/* global describe, test, expect */
import { BoundedStack } from "./BoundedStack.js";

describe("BoundedStack Logic", () => {
    
    test("should push an item and pop the exact same item", () => {
        // 1. Setup
        const stack = new BoundedStack();
        
        // 2. Action
        stack.funcPush("Hello World");
        const result = stack.funcPop();
        
        // 3. Assertion (This is the magic Jest part!)
        expect(result).toBe("Hello World");
    });

});
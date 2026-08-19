// Manages active session stacks
import { BoundedStack } from "../ds/BoundedStack.js";

export class SessionManager {
    myMap = new Map(); // we declare variable in class without DataType in JS

    createSession(sessionId) { 
        if (!this.myMap.has(sessionId)) { 
            const session = new BoundedStack();
            this.myMap.set(sessionId, session);
        }
    }

    getSession(sessionId) { 
        if ( this.myMap.has(sessionId)) { 
            return this.myMap.get(sessionId);
        }
        return null;
    }

    removeSession(sessionId) {
        if ( this.myMap.has(sessionId) ) {
            this.myMap.delete(sessionId);
        } else {
            console.log("Error: No session found for this user.");
        }
    }

    pushAction(sessionId, actionData) {
        const userStack = this.getSession(sessionId);

        if ( userStack != null ) { 
            userStack.funcPush(actionData);
        } else { 
            console.log("Error: No session found for this user.");
        }
    }

    undoAction(sessionId) { 
        const userStack = this.getSession(sessionId);

        if ( userStack != null ) { 
            return userStack.funcPop();
        }
    }
};

export const sessionManagerInstance = new SessionManager();
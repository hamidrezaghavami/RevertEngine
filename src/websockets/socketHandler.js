import { sessionManagerInstance } from "../services/SessionManager.js";

export function initializeSockets(io) { 

    io.on("connection", (socket) => { 

        console.log(`User connected with ID: ${socket.id}`);

        // push Action section like we wrote in Pseudo file
        socket.on("pushAction", (data) => {
            const sessionId = socket.id;
            const actionData = data;

            if ( socket.id != null && actionData != null ) { 
                sessionManagerInstance.pushAction(sessionId, actionData);

                socket.emit("success", "message came back successfully");
            } 
        });

        // undo action section like we wrote in Pseudo file
        socket.on("undoAction", () => { 
            const sessionId = socket.id;
            const undoneAction = sessionManagerInstance.undoAction(sessionId);

            if ( undoneAction != null ) { 
                socket.emit("undoSuccess", undoneAction);
            } else { 
                socket.emit("undoFailed", "there is nothing left to undo.");
            }
        });

        socket.on("disconnect", () => {
            sessionManagerInstance.removeSession(socket.id)
        });
    });
}


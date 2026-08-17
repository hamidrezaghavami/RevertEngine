import express from "express";
import { sessionManagerInstance } from "../services/SessionManager.js";

const router = express.Router();

// writing push/add router like we wrote in Pseudo files
router.post("/push", (req, res) => {
    const sessionId = req.body.sessionId;
    const actionData = req.body.actionData;

    if ( sessionId == null || actionData == null ) { 
        return res.status(400).json("Error: Missing sessionId or ActionData");
    }

    sessionManagerInstance.pushAction(sessionId, actionData);
    return res.status(200).json("Action successfully added!.")
});

// writing undo router like pseudo file
router.post("/undo", (req, res) => { 

    const sessionId = req.body.sessionId;

    if ( sessionId == null ) { 
        return res.status(400).json("Error: Missing sessionId");
    }

    const undoneAction = sessionManagerInstance.undoAction(sessionId);

    if ( undoneAction != null ) { 
        res.status(200).json(undoneAction);
    } else { 
        res.status(400).json("there is nothing left to undo.");
    }
});

export default router;
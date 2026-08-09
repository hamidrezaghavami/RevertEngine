# ↺ RevertEngine

A high-performance, real-time Undo/Redo state management service built with Node.js and Stack Data Structures.

RevertEngine provides a session-based history tracking architecture for interactive visual applications, canvas tools, collaborative whiteboards, and multi-step form builders. It leverages dual-stack memory management to handle state mutations, undo/redo operations, and real-time client sync.

---

## 🚀 Key Features

- **Dual-Stack Memory Architecture:** Tracks `Undo` and `Redo` operation history independently per session.
- **Bounded Stack Memory Guard:** Custom stack implementation with strict capacity limits to prevent memory leaks.
- **Real-time WebSockets:** Instant state broadcast to connected clients upon `push`, `undo`, or `redo`.
- **Session Isolation:** Supports multiple concurrent user sessions simultaneously using efficient key-value mapped stacks.
- **Automated Clearing:** Automatically flushes the Redo stack when new state mutations occur post-undo.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express / Fastify
- **Real-Time:** Socket.io / `ws`
- **Data Structures:** Custom Bounded Stack (JS/TS)
- **Testing:** Jest / Vitest
- **Persistence (Optional):** Redis

---

## 🧠 Data Structure Architecture

RevertEngine uses two bounded **LIFO (Last-In-First-Out)** Stacks for every active session:
```
[ New Client Action ]
│
▼
┌───────────────┐                             ┌───────────────┐
│  UNDO STACK   │ ──── (Trigger: Undo) ─────► │  REDO STACK   │
├───────────────┤                             ├───────────────┤
│ Action 3 (Top)│ ◄─── (Trigger: Redo) ────── │ Action 3 (Top)│
│ Action 2      │                             └───────────────┘
│ Action 1      │  *Note: Pushing a NEW action flushes Redo Stack completely.
└───────────────┘
```
### Stack Complexity

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| `push(action)` | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ |
| `undo()` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| `redo()` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| `peek()` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |

---

## 🌐 API Overview

### REST Endpoints
```
#### `POST /api/v1/sessions`
Creates a new active history session.
```json
// Response
{
  "sessionId": "sess_89f1a23b",
  "maxDepth": 50,
  "createdAt": "2026-08-09T21:26:00.000Z"
}
```
*POST /api/v1/sessions/:sessionId/undo*
Pops the latest state from the Undo stack and moves it to the Redo stack.
*POST /api/v1/sessions/:sessionId/redo*
Pops from the Redo stack and pushes back to the Undo stack.

### 📂 Project Structure:
```
RevertEngine/
├── src/
│   ├── ds/
│   │   ├── BoundedStack.js     # Custom Stack DS implementation
│   │   └── __tests__/
│   ├── services/
│   │   └── SessionManager.js   # Manages active session stacks
│   ├── controllers/
│   │   └── historyController.js
│   ├── websockets/
│   │   └── socketHandler.js
│   └── app.js
├── package.json
└── README.md
```
### 🏃 Getting Started:
*Prerequisites*
*Node.js (v18+ recommended)*
*npm*
### installation: 
```
git clone [https://github.com/your-username/revert-engine.git](https://github.com/your-username/revert-engine.git)
cd revert-engine

npm install
npm test

npm run dev
```
<ElicitationsGroup message="What would you like to build first for RevertEngine?">

  <Elicitation label="Write the custom BoundedStack class in JS/TS" query="Write the BoundedStack class implementation for RevertEngine with unit test cases."/>

  <Elicitation label="Setup Express REST API routes for session history" query="Write the Express.js routes and SessionManager service for RevertEngine."/>

</ElicitationsGroup>
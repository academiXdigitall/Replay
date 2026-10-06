
# 🔄 Replay

> A time machine for web applications.

Replay is a developer debugging and observability platform that records important application events, detects critical failures, and lets developers rewind and replay what happened.

## ✨ Features

- 🚨 **Automatic Error Detection** — Detect critical application failures in real time.
- 🕐 **Session Timeline** — See exactly what happened before and during a failure.
- ⏪ **Time Travel / Rewind** — Go back to the state before an error occurred.
- ▶️ **Event Replay** — Reproduce the same sequence of events.
- 💳 **Impact Detection** — Detect issues such as successful payment but failed order creation.
- 🔔 **Instant Alerts** — Notify developers when critical failures occur.
- 🤖 **AI Diagnosis** — Analyze failures and suggest probable causes and fixes.
- 📊 **Developer Dashboard** — Investigate errors, sessions, timelines, and system status.

## ⚙️ How It Works

```text
User interacts with Web App
          ↓
      Replay SDK
          ↓
   Events & Errors
          ↓
    Replay Backend
          ↓
      PostgreSQL
          ↓
   Error Detection
          ↓
      🚨 Alert
          ↓
   Developer Dashboard
          ↓
   Rewind → Replay → Diagnose → Fix
````

 ## 🧪 Example

 A customer purchases a product:

```
Product Added
      ↓
Checkout Started
      ↓
Payment Successful ✅
      ↓
Order Creation Failed ❌
```

 Replay detects the inconsistent transaction and alerts the developer:

 > 🚨 Customer charged Rs. 1,500 but order creation failed.

 The developer can open the session, rewind to the relevant point, replay the sequence, and investigate the failure.

 AI can then analyze the failure and provide a probable cause and suggested fix.

 ## 🏗️ Architecture

```
┌──────────────────────┐
│     Customer App     │
│    React Web App     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Replay SDK      │
│  Events • Errors     │
│  State Changes       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Node + Express    │
│     Replay Engine    │
└──────────┬───────────┘
           │
      ┌────┴─────┐
      ▼          ▼
┌──────────┐ ┌──────────┐
│PostgreSQL│ │AI Engine │
└──────────┘ └──────────┘
      │
      ▼
┌──────────────────────┐
│ Developer Dashboard  │
│ Alerts • Timeline    │
│ Replay • Diagnosis   │
└──────────────────────┘
```

 ## 🛠️ Tech Stack

 ### Frontend

 - React
- Tailwind CSS
- React Flow

 ### Backend

 - Node.js
- Express.js
- Socket.IO

 ### Database

 - PostgreSQL
- JSONB for event and state data

 ### AI

 - LLM API for error analysis and fix suggestions

 ### Core Technology

 - Custom Replay SDK
- Event tracking
- State snapshots
- Replay engine
- Real-time error detection

 ## 🎯 Goal

 Replay helps developers answer three questions quickly:

 1. **What happened?**
2. **Why did it happen?**
3. **How can I reproduce and fix it?**

 ## 🚀 Vision

 Replay aims to make debugging production issues as simple as:

```

 **Record → Rewind → Replay → Diagnose → Fix**

```
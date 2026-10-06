🔄 Replay

Replay is a developer debugging and observability platform that acts like a time machine for web applications.

When a critical error occurs, Replay automatically records the important events leading up to the failure, alerts the developer, and allows them to rewind the session, reproduce the issue, and understand what went wrong.

✨ Features

Automatic Error Detection — Detect critical application failures in real time.

Session Timeline — See exactly what happened before and during the failure.

Time Travel / Rewind — Jump back to the application state before the error.

Event Replay — Reproduce the same sequence of actions.

Impact Detection — Identify issues such as successful payment but failed order creation.

Instant Alerts — Notify admins about critical failures automatically.

AI Diagnosis — Analyze the failure and suggest the probable cause and potential fix.

Developer Dashboard — Investigate errors, affected sessions, timelines, and system status from one place.

⚙️ How It Works
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
   🚨 Admin Alert
          ↓
   Developer Dashboard
          ↓
   Rewind → Replay → Diagnose → Fix

Example

A customer purchases a product:

Product Added
      ↓
Checkout Started
      ↓
Payment Successful ✅
      ↓
Order Creation Failed ❌


Replay detects the inconsistent transaction and alerts the developer:

🚨 Customer charged Rs. 1,500 but order creation failed.

The developer can open the session, rewind to the relevant point, replay the sequence, and inspect the failure. AI can then provide a probable cause and suggested fix.

🛠️ Tech Stack
Frontend

React

Tailwind CSS

React Flow / visualization library

Backend

Node.js

Express.js

WebSockets / Socket.IO

Database

PostgreSQL

JSONB for event/state data

AI

LLM API for error analysis and fix suggestions

Core Technology

Custom Replay SDK

Event tracking

Event/state timeline

Replay engine

Real-time error detection

🎯 Goal

Replay helps developers answer three questions quickly:

What happened?
Why did it happen?
How can I reproduce and fix it
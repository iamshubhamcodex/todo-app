# 📝 React Todo App

A modern and minimal **Todo List App** built using **React + Zustand + Typescript**, inspired by a clean UI design from [this mockup](https://raw.githubusercontent.com/x1-il/todo-app/main/public/To-Do%20List%20_%20All%20tasks.png).

Live Project 👉 [https://shubhamcdx-todo.netlify.app/](https://shubhamcdx-todo.netlify.app/)

---

## 🚀 Features

### ✅ 1. Clean UI Inspired by Reference

- UI layout closely follows this design:  
  ![Design Reference](https://raw.githubusercontent.com/x1-il/todo-app/main/public/To-Do%20List%20_%20All%20tasks.png)
- Built with Typescript for type safety and clean code.

### ✅ 2. Category-Based Task Organization

- Create custom **categories** (e.g., Work, Personal, Today).
- Tasks are grouped inside categories for better organization.

### ✅ 3. Task Management

- Add, edit, and delete tasks within specific categories.
- Each task supports:
  - Title & description
  - Due date
  - Completion status
  - Reminder time

### ✅ 4. Reminders

- Tasks can be set with a **reminder** datetime.
- Tasks with active reminders are visually highlighted.

### ✅ 5. Prioritized Tasks with Star Marking

- Star a task to **prioritize** it.
- Starred tasks appear higher in the list.

### ✅ 6. Persistent Storage via `localStorage`

- All data (categories, tasks, reminders) is saved to `localStorage`.
- Data persists between sessions without needing a backend.

### ✅ 7. Global Search

- Instant **search** through all tasks across all categories.
- Real-time filtering using task name or description.

### ✅ 8. Task Completion Progress

- Visual **progress bar** showing overall task completion percentage.
- Automatically updates based on completed tasks.

---

## 🧱 Tech Stack

- **React** – Frontend framework
- **Typescript** – For type safety
- **Zustand** – Lightweight state management
- **localStorage** – For persistent client-side storage

---

## 📦 Getting Started

```bash
git clone https://github.com/iamshubhamcodex/todo-app.git
cd todo-app
npm install
npm run dev

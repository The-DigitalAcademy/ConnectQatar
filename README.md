# QatarConnect 🕌

**QatarConnect** is a full-featured social media clone built with Angular and Tailwind CSS, powered by a mock JSON server backend. The platform replicates key social media functionalities such as user authentication, posts, stories, following system, messaging, and feed filtering.

---

## ✨ Features & User Stories

### 🔐 Authentication
- Users can **register** and **log in**.
- Sessions are securely maintained.
- **Token refresh** on new post creation for improved UX.

### 📝 Content Creation
- Users can **create posts** and **upload stories**.
- Posts appear in a **Global Feed** and **Following Feed**.

### 👥 Social Features
- **Follow/unfollow** other users.
- View feed filtered by followed users.

### 💬 Messaging
- Send and receive **direct messages**.

---

## 🛠️ Tech Stack

| Tool               | Purpose                            |
|--------------------|------------------------------------|
| **Angular**        | Frontend framework                 |
| **TypeScript**     | Programming language               |
| **Tailwind CSS**   | Utility-first CSS framework        |
| **Angular Material** | UI component library              |
| **JSON Server**    | Mock REST API backend              |
| **[Tool Name]**    | Project management (e.g., Trello, Notion, Jira) |

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/The-DigitalAcademy/ConnectQatar.git
cd ConnectQatar
```

### 2. Install Dependancies

```bash
npm install
```

### 3. Add Angualar Material UI

```bash
ng add @angular/material
```

### 4. Start and Run JSON server (Mock Backend)
  ##### a. Ensure you have a db.json file in your root
  ##### b. Run JSON server
```bash
npx json-server --watch db.json --port 3000
```
### 5. Start Angular Development Server
```bash
ng serve -o
```
## 🗂️ Project Management

We use **Trello** to organize tasks:

- **Backlog**
- **To Do**
- **In Progress**
- **Review**
- **Done**

---

> Built with ❤️ by the QatarConnect team.

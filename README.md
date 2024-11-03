# Task Manager API

The Task Manager API is a RESTful service built with **Express** and **TypeScript** for managing tasks. It supports CRUD operations (Create, Read, Update, Delete) and can be extended for use in a real-world task management application.

## Features

- **Create** new tasks
- **Retrieve** all tasks or specific tasks by ID
- **Update** task details (title or completion status)
- **Delete** tasks by ID

## Technologies

- **Node.js** and **Express** for server and routing
- **TypeScript** for type safety
- **Zod** for input validation
- **UUID** for unique task IDs
- **Jest** and **Supertest** for testing

## Project Structure

task-manager-api/ 
├── src/ │ 
├── app.ts # Main app entry 
│ 
├── routes/ # API route handlers 
│ 
├── services/ # Business logic for tasks
│ 
├── models/ # Data models and validation 
│ └── tests/ # Tests for API endpoints 
├── tsconfig.json # TypeScript configuration 
├── jest.config.js # Jest configuration 
├── package.json # Project metadata and dependencies 
└── README.md # Project documentation

markdown


## Setup

### Prerequisites

- **Node.js** (version 22.x or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   cd task-manager-api
Install dependencies:

bash

npm install
Run the server:

bash

npm start
The API will be available at http://localhost:3000.

Run tests (optional):

bash

npm test
API Endpoints
Task Routes
GET /tasks - Retrieve all tasks
POST /tasks - Create a new task
GET /tasks/
- Retrieve a specific task by ID
PUT /tasks/
- Update a task by ID
DELETE /tasks/
- Delete a task by ID
Example Requests
Create a Task
Request:

http

POST /tasks
Content-Type: application/json

{
  "title": "Complete project"
}
Response:

json

{
  "id": "unique-task-id",
  "title": "Complete project",
  "completed": false
}
Get All Tasks
Request:

http

GET /tasks
Response:

json

[
  {
    "id": "unique-task-id",
    "title": "Complete project",
    "completed": false
  }
]
Update a Task
Request:

http

PUT /tasks/unique-task-id
Content-Type: application/json

{
  "title": "Complete math homework",
  "completed": true
}
Response:

json

{
  "id": "unique-task-id",
  "title": "Complete math homework",
  "completed": true
}
Delete a Task
Request:

http

DELETE /tasks/unique-task-id
Response:

http

204 No Content
Future Improvements
Database Integration: Use a database instead of in-memory storage for persistent data.
Authentication: Add user authentication and authorization.
Error Handling: Improve error handling and validation feedback.

License
This project is licensed under the MIT License.

Thank you for using the Task Manager API!

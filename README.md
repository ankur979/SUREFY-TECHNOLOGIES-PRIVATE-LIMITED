# SUREFY TECHNOLOGIES PRIVATE LIMITED

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Configure environment variables:**  
    Create a `.env` file and add necessary configuration (e.g., database connection).
4. **Start the server:**
    ```bash
    npm start
    ```

---

## Event API Endpoints

### Endpoints

#### `GET /events`
- **Description:** Retrieve all events.
- **Response:** Array of event objects.

#### `POST /events`
- **Description:** Create a new event.
- **Body:**  
     ```json
     {
          "title": "string",
          "date": "YYYY-MM-DD",
          "location": "string",
          "capacity": "number",
     }
     ```
- **Response:** Created event object.

#### `PUT /events/{id}`
- **Description:** Update an existing event.
- **Body:**  
     ```json
     {
          "title": "string",
          "date": "YYYY-MM-DD",
          "location": "string",
          "capacity": "number",
     }
     ```
- **Response:** Updated event object.

#### `GET /events/upcoming`
- **Description:** List upcoming events.
- **Response:** Array of upcoming event objects.

#### `GET /events/{id}`
- **Description:** Get details of a specific event.
- **Response:** Event object.

#### `GET /events/{id}/stats`
- **Description:** Get statistics for a specific event.
- **Response:** Event statistics object.

#### `POST /events/{id}/register`
- **Description:** Register a user for an event.
- **Body:**  
     ```json
     {
          "userId": "integer"
     }
     ```
- **Response:** Registration confirmation.

#### `DELETE /events/{id}/{userId}/cancel`
- **Description:** Cancel a user's registration for an event.
- **Response:** Cancellation confirmation.

#### `GET /events/search`
- **Description:** Search for events by keyword or filter.
- **Query Parameters:**
     - `q` (string, optional): Search keyword.
     - `date` (string, optional): Filter by event date (YYYY-MM-DD).
- **Response:** Array of event objects matching the search criteria.

---

## User API Endpoints

### Endpoints

#### `GET /users`
- **Description:** Retrieve all users.
- **Response:** Array of user objects.

#### `GET /users/{id}`
- **Description:** Get details of a specific user.
- **Response:** User object.

#### `POST /users`
- **Description:** Create a new user.
- **Body:**  
     ```json
     {
          "name": "string",
          "email": "string"
     }
     ```
- **Response:** Created user object.

---

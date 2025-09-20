# Petition Management System

## Overview
The Petition Management System is a full-stack web application that allows users to create, sign, and track petitions. The backend is built using Spring Boot, and the frontend is developed using React. The system includes authentication, petition tracking, and a signature system to support user participation.

## Features
- User authentication and registration
- Create and manage petitions
- Sign petitions and track the number of signatures
- View petition details and status
- Secure API with authentication
- Database-backed storage for persistence

## Tech Stack
### Backend:
- Java with Spring Boot
- Spring Data JPA (MySQL database)
- Spring Security (for authentication)
- Hibernate ORM

### Frontend:
- React.js
- Axios for API communication
- React Router for navigation

### Database:
- MySQL (Relational Database)

## Installation and Setup
### Prerequisites
- Java 17+
- Node.js & npm
- MySQL Server
- Maven (for backend dependencies)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/petition-management.git
   cd petition-management/server
   ```
2. Configure database settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/petition_db
   spring.datasource.username=root
   spring.datasource.password=root
   ```
3. Build and run the backend:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints
### User Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user

### Petition Endpoints
- `POST /api/petitions` - Create a new petition
- `GET /api/petitions` - Get all petitions
- `GET /api/petitions/{id}` - Get petition details
- `POST /api/petitions/{id}/sign` - Sign a petition

## Database Schema
### Users Table
| Column      | Type         | Description        |
|------------|-------------|--------------------|
| bio_id     | INT (PK)    | Unique user ID    |
| name       | VARCHAR(50) | User's full name  |
| email      | VARCHAR(100)| User email        |
| password   | VARCHAR(255)| Hashed password   |

### Petitions Table
| Column         | Type         | Description          |
|---------------|-------------|----------------------|
| petition_id   | INT (PK)    | Unique petition ID  |
| title         | VARCHAR(255)| Petition title      |
| content       | TEXT        | Petition details    |
| status        | VARCHAR(50) | Active/Closed       |
| petition_bio_id | INT (FK)   | Creator's bio ID    |

### Signatures Table
| Column    | Type  | Description        |
|----------|------|------------------|
| petition_id | INT (FK) | Petition signed  |
| bio_id      | INT (FK) | User who signed  |

## Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -m 'Add feature XYZ'`)
4. Push to your branch (`git push origin feature-xyz`)
5. Create a Pull Request

## Contact
For queries, contact `roshanvivek2000@gmail.com`. Contributions and feedback are welcome!


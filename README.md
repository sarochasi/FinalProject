# Final Project

## Project Overview
This full-stack Java project is the culmination of our learning, integrating everything we've studied into one cohesive application. The project is designed to provide authenticated and non-authenticated views, offer full C.R.U.D. (Create, Read, Update, Delete) functionality, and include a multi-level privilege system for managing user-generated data. The front-end uses Angular, while the back-end is a Java-based RESTful API connected to a MySQL database.

This project is a collaborative effort where group members contributed to various aspects of the application, including database design, backend logic, security, and front-end development. It showcases a wide range of skills, from database schema design to front-end state management.

## Technologies Used
- **Frontend**: Angular JavaScript
- **Backend**: Java, Spring Boot (RESTful API)
- **Database**: MySQL
- **ORM**: JPA (Java Persistence API)
- **Security**: Spring Security with BCrypt password hashing for user authentication
- **Version Control**: Git and GitHub for collaboration
- **Dependency Management**: Gradle
- **Testing**: JUnit for unit testing the back-end
- **Development Environment**: Spring Tool Suite (STS), Visual Studio Code (VS Code) for Angular development
- **External Tools**: Postman for API testing, MySQL Workbench for database modeling and management

## Getting Started
This project involves multiple steps to ensure that the group’s development environments are properly synchronized, and that the project structure is cohesive across all workstations.

### Setting Up the Workspace and GitHub
The repository is set up on GitHub with a `.gitignore` file for ignoring unnecessary files like build and target directories. One team member initialized the project and invited others to collaborate. Each member cloned the repository into their own environment, ensuring consistency across the team.

### Backend Setup
- **MySQL Database**: The database schema was designed in MySQL Workbench and includes user tables with fields for authentication (username, password, roles, and enabled status).
- **Spring Boot**: This application uses Spring Boot to handle RESTful endpoints for handling data interactions.
- **JPA**: We utilized Java Persistence API for entity mapping and database management.

### Frontend Setup
For the frontend, Angular was chosen due to its component-based architecture and its ability to manage complex states and views. The Angular app interacts with the Spring Boot API to fetch and manage data. We also ensured that the application uses environment-specific configurations for easy deployment.

## Features
- **User Authentication**: The project includes both authenticated and non-authenticated views. Users must log in to access protected routes and perform C.R.U.D. operations.
- **C.R.U.D. Operations**: The application allows users to create, read, update, and delete their own data. Privileged users can manage global data.
- **Role-based Access**: Two levels of user roles—basic and privileged—determine the data manipulation capabilities within the application.
- **Security**: Spring Security and BCrypt provide robust password encryption and user authentication.

## Lessons Learned
This project brought together various technical skills and concepts learned throughout the course:
1. **Database Design**: The importance of designing a well-structured database before implementing functionality. This decision directly impacts the scalability and efficiency of the application.
2. **Spring Boot and JPA**: We deepened our understanding of how Spring Boot and JPA work together to create a cohesive and scalable REST API.
3. **Front-end/Back-end Integration**: We tackled challenges related to integrating the front-end (Angular) with the back-end (Java REST API), managing CORS issues, and synchronizing data.
4. **Team Collaboration**: Working in a group taught us valuable lessons about communication, code management via GitHub, and synchronizing our development environments to avoid conflicts.
5. **Spring Security**: Implementing security with different user roles was a challenge, but we successfully built a robust login system using Spring Security and password encryption with BCrypt.

# AeonaxyTask

# NodeJs Backend Developer Project

## Project Overview:

The goal of this project was to develop a robust backend API for an e-learning platform using Express.js. The API facilitates user registration, user profile management, course management (including CRUD operations for superadmin), and user enrollment functionalities. Additionally, the courses API implements filtering and pagination to enhance user experience. The project utilizes the free tier of neon.tech database for data storage and resend.com's free tier for handling email communications.

## Project Structure:

The project is structured as follows:

1. **User APIs**:

   - `/api/user/register`: Endpoint for user registration.
   - `/api/user/login`: Endpoint for user login.
   - `/api/user/profile`: Endpoint for viewing and updating user profile information.

2. **Course APIs**:

   - `/api/courses/page/:id`: Endpoint to fetch courses available on the platform, with filtering and pagination options.
   - `/api/courses/page_id/:id/:category/:level` Endpoint to fetch details of a specific course.
   - `/api/courses/page_level/:id/:level`: Endpoint to fetch courses based on difficulty level.

3. **User Enrollment APIs**:

   - `/api/enrollments/enroll/:username/:course_id`: Endpoint for
     course enrollment.
   - `/api/enrollments/courses_enrolled/:username`: Endpoint for users to view their enrolled courses.

4. **Security and Authentication**:

   - JWT (JSON Web Tokens) are used for secure authentication.
   - Passwords are securely hashed before storage in the database.

5. **Error Handling and Logging**:

   - Robust error handling mechanisms are implemented to provide meaningful error messages to clients.
   - Logging is utilized to track API requests, responses, and any potential errors or exceptions for debugging purposes.

6. **Database and Email Integration**:
   - Utilizes neon.tech database for storing user information, course details, and enrollment data.
   - Integrated with resend.com for handling email communications, such as user registration confirmation, password reset requests, and course enrollment notifications.

## Project Submission:

The project code is available on GitHub at [project repository URL].

For live demo, please visit [].

## Project Setup:

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the project dependencies using `npm install`.
3. Create a `.env` file in the root directory and add the following environment variables:

   - `PGHOST`: 'your_host'
   - `PGDATABASE`: 'your_database'
   - `PGUSER`: 'your_username'
   - `PGPASSWORD`: 'your_password'
   - `ENDPOINT_ID`: 'your_endpoint_id'
   - `RESEND_API_KEY`: "your_api_key"
   - `JWT_SECRET_KEY`: 'your_secret_key'

4. Run the project using `npm start`.

## Conclusion:

The project successfully implements a robust backend API for an e-learning platform using Express.js. The API provides essential functionalities for user registration, course management, and user enrollment, along with security features such as JWT authentication and password hashing. The project also integrates with neon.tech database and resend.com email service for data storage and email communications, respectively. Overall, the project demonstrates the capabilities of Node.js and Express.js for developing scalable and secure backend APIs.

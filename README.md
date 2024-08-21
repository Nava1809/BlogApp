1.intall node modules in backend and frontend using "npm i"
2.start server: npm start
3.start react app: npm start

Backend Implementation
1. Express Server Setup
Implementation:

The backend is implemented using Node.js with the Express framework.
The server is structured with separate routes for authentication, user management, and blog functionality. Key routes include:
/register: Handles user registration by creating a new user document in MongoDB.
/login: Validates the user’s credentials (email/phone and password) and returns a JWT token if successful.
/blogs: Retrieves and posts blog data, with CRUD operations controlled by user authentication.
MongoDB is used for persistent data storage, connected via the Mongoose ODM (Object Data Modeling).
Design Decisions:

JWT Authentication: JWT tokens are used for stateless authentication, stored in localStorage on the client-side. This improves scalability by eliminating the need for session management on the server.
Route Structure: Routes were divided into clear and separate concerns (authentication, blogs) to ensure maintainability and readability of the code.
Validation: User input is validated using middleware in Express, ensuring that data reaching the database is clean and meets requirements (e.g., valid email, minimum password strength).

2. Database Schema Design
Implementation:

User Schema: Stores user information such as email, phone, password (hashed using bcrypt), and user roles.

Blog Schema: Stores blog posts, including title, content, author, and createdAt.

Mongoose is used to create the schemas, manage relationships, and interact with the MongoDB database.

Design Decisions:

Normalization: Data is normalized to avoid redundancy, with references between documents (e.g., linking each post  to a specific user).
Security: Passwords are hashed using bcrypt before storing them in the database, ensuring that user credentials are secure.



Frontend Implementation
1. React Frontend Setup
Implementation:

The frontend is built using React, with React Router for navigation between different pages like Home, Blog List, Blog Details, Login, Signup.
Material UI is used to ensure a modern and responsive design across all pages, with components such as AppBar, Button, TextField, and icons.
Design Decisions:

Component-Based Architecture: React components are designed to be modular and reusable, ensuring scalability and maintainability.
Material UI Integration: Material UI was chosen for its ready-to-use components, ensuring the frontend has a professional, responsive design with minimal custom CSS.
2. Authentication Flow
Implementation:

Login and SignUp Forms: These forms handle user authentication via email or phone number. Once logged in, a JWT token is stored in localStorage and used to make authenticated API requests to the backend.
Conditional Rendering: Based on the user's authentication state, the UI adapts to show the appropriate navbar options (e.g., displaying login/register buttons for guests and profile/logout buttons for authenticated users).
Design Decisions:

Token Management: JWT tokens are stored in localStorage to persist login sessions across page reloads. This decision simplifies token handling but also ensures that secure actions can only be performed by authenticated users.
Form Validation: Input validation is handled on the client side to enhance user experience by providing immediate feedback for invalid inputs (e.g., invalid email or weak password).
3. State Management
Implementation:

State Hooks: React’s useState and useEffect hooks are utilized for managing component state and side effects (e.g., fetching data after component mounts).
Context API: The Context API is used for managing global states such as user authentication and blog data, allowing the state to be shared across multiple components without prop drilling.
Design Decisions:

Local State for Simplicity: Since the application is relatively simple, local state management with hooks was chosen over more complex solutions like Redux. This keeps the codebase easier to manage and understand.
Performance Optimization: useEffect is used to trigger data fetching only when needed, minimizing unnecessary re-renders and improving the app’s performance.
4. UI/UX Design
Implementation:

Navbar: The navigation bar changes dynamically based on whether the user is logged in or not. It includes options like  "Login"and"signup","userId","logout" to provide easy access to the app's primary features.
Forms and Buttons: Styled using Material UI with form validation to ensure a clean, modern, and responsive design that adapts to different screen sizes.
Design Decisions:

Responsive Design: Mobile responsiveness is a key consideration, ensuring that the application works well across all devices. Material UI’s grid system is used to achieve this responsiveness.
User Experience: The user experience is prioritized by keeping the design intuitive and minimizing the number of clicks required to complete tasks, such as accessing blogs.

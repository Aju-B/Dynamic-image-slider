Dynamic Image Slider
          A full-stack project that demonstrates a responsive image slider with backend support for user authentication and product management.
Table of Contents
•	About
•	Features
•	Project Structure
•	Installation & Usage
•	Tech Stack
•	API Endpoints
•	Challenges & Solutions
•	Testing
•	Contributing
•	License
About
Dynamic Image Slider is a full-stack web application that displays a responsive image slider.

The backend handles user authentication, product management, and optional order handling.
It is useful as a learning resource for building interactive frontends with a functional backend.

Features
•	Responsive Image Slider: Smooth transitions and dynamic image loading
•	User Authentication: Registration and login with JWT tokens
•	Product Management: Add, edit, and remove slider images or products
•	Protected Routes: Middleware to secure admin routes
•	Lazy Loading: Optimized performance for large image sets
•	Clean UI: Simple, modern, and responsive design
Project Structure
/ (root)
├── app.html             # Frontend page with image slider
├── server.js            # Backend server and routes
├── package.json         # Node.js project metadata & dependencies
├── package-lock.json    # Auto-generated lock file
└── README.md            # Documentation


Installation & Usage
1.	Clone this repository:
git clone https://github.com/YourUsername/Dynamic-Image-Slider.git
cd Dynamic-Image-Slider
2.	Install dependencies :  npm install
3.	Start the server :   node server.js
4.	Open the frontend in your browser : http://localhost:5500/app.html
5.	Test the slider:
•	Navigate images using “Next” and “Previous” buttons
•	Test dynamic loading and smooth transitions
Tech Stack
•	Frontend: HTML, CSS, JavaScript
•	Backend: Node.js, Express.js
•	Database: MongoDB
•	Authentication: JWT, bcrypt (for admin routes)
•	Performance: Lazy loading and optimized transitions
API Endpoints
Authentication
•	POST /api/auth/register – Register a new user
•	POST /api/auth/login – Login and receive a JWT

Products / Images
•	GET /api/products – Get all slider images
•	GET /api/products/:id – Get a single image or product
•	POST /api/products – Add a new image (auth required)
•	PUT /api/products/:id – Update an image (auth required)
•	DELETE /api/products/:id – Delete an image (auth required)
Orders (Optional)
•	POST /api/orders – Place an order (auth required)
•	GET /api/orders – Get user orders (auth required)
•	DELETE /api/orders/:id – Cancel an order (auth required)
Testing
•	Test slider functionality with multiple images
•	Use Postman to test API endpoints (auth, products, orders)
•	Manually check responsive layout and smooth transitions
•	Test with invalid inputs to verify error handling
Contributing
Thank you for considering contributing! You can:
•	Submit issues or bug reports
•	Open pull requests with new features, slider effects, or UI improvements
•	Suggest optimizations for performance or structure
License
This project is licensed under MIT License.

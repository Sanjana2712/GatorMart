 **GatorMart** 🐊

🚀 **Project Overview**

**GatorMart** is a comprehensive e-commerce platform designed for sfsu students to buy and sell products within/outside the university community. The platform provides a seamless and secure marketplace experience, allowing people to list items, connect with buyers/sellers, and manage their listings efficiently.

🧠 **Key Features**
- **User Authentication**: Secure signup with email verification token
- **Product Listings**: Create, edit, and manage product listings with images
- **Favorites System**: Save products of interest for later viewing
- **Real-time Chat**: Communicate directly with sellers about products
- **Listing Management**: Mark products as sold or available
- **Listing Preview**: Preview how your listings will appear before posting
- **Search & Filters**: Find products by category, price range, and keywords

🎬 **Demo**

https://github.com/user-attachments/assets/0e455230-ce4e-4de2-ae34-6a3b1bc701b8

## 🛠️ Technologies Used
### Frontend
- **React.js**: Modern UI component library
- **Redux**: State management across the application
- **Material UI**: Component library for consistent styling
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Web framework for handling HTTP requests
- **MongoDB**: NoSQL database for storing user and product data
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: Secure authentication with JSON Web Tokens
- **Nodemailer**: Email service for verification tokens
- **Socket.io**: Server-side real-time communication
- **Multer**: File handling for product images
- **AWS S3**: Cloud storage for user profile images

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Local Development
1. Clone the repository
   ```
   git clone https://github.com/Sanjana2712/Gatormart.git
   cd Gatormart
   ```

2. Install dependencies for both frontend and backend
   ```
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory based on `.env.example`
   - Configure MongoDB connection, JWT secret, email service credentials, etc.

4. Start the development servers
   ```
   # Start backend server
   cd applications
   cd server
   npm run dev

   # Start frontend server
   cd applications
   cd client
   npm start
   ```

5. Access the application at `http://localhost:3000`

## 🔍 User Flow

1. **Signup & Verification**
   - New users create an account with their SFSU email
   - A verification token is sent to their email
   - User verifies account by clicking the link in the email

2. **Browsing & Searching**
   - Users can browse all available products
   - Apply filters to narrow down search results
   - Save favorite products for later viewing

3. **Communication**
   - Contact sellers through the built-in chat system
   - Discuss pricing, pickup/delivery options, and product details

4. **Selling**
   - Create detailed product listings with images, description, and price
   - Preview listings before posting
   - Manage active listings and mark items as sold when completed
---

Made with ❤️

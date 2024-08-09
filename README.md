# Event Management System

## Overview

This project is a React-based application that allows users to view the event information and manage their registered events. It integrates with a backend API to fetch user data and events and uses Redux for state management.

## Features

- **User Profile**: Displays user profile information, including, username, and email.
- **Event Management**: Shows a list of events that the user has registered for.
- **Error Handling**: Provides user-friendly error messages and loading states.

## Technologies Used

- **Frontend**: React, Redux, React Router, Tailwind CSS
- **Backend**: Node.js (Express), MongoDB 
- **APIs**: Custom backend APIs for user profile and event data

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- A modern web browser (Chrome, Firefox, etc.)

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/NitinSingh07/Event-Management.git
    ```

2. **Navigate to the Project Directory**
    ```bash
    cd Backend
    cd my-project (Frontend)
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Start the Backend Server**
    ```bash
    npm run start
    ```

5. **Start the Backend Server**
    ```bash
    npm run dev
    ```   
    The client side application will be available at `http://localhost:5173`.
    The server side application will be available at `http://localhost:8000`.

### Environment Variables

Ensure that you have the following environment variables set in a `.env` file or in your development environment:

- `REACT_APP_API_URL` - http://localhost:8000/api

## Usage

- **User Profile**: Navigate to the `/user-profile` route to view user information.
- **Registered Events**: Navigate to the `/registered-events` route to view the list of events the user is registered for.

## API Endpoints

- `GET /api/auth/user-profile`: Fetches user profile data.
- `GET /api/registered-events`: Fetches the list of events registered by the user.

## Contributing

1. **Fork the Repository**: Click on the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/your-username/your-forked-repository.git
    ```
3. **Create a Branch**: Create a new branch for your changes.
    ```bash
    git checkout -b your-feature-branch
    ```
4. **Make Changes**: Implement your changes and test thoroughly.
5. **Commit Your Changes**: Commit your changes with a meaningful message.
    ```bash
    git add .
    git commit -m "Add feature or fix"
    ```
6. **Push to Your Fork**: Push your changes to your forked repository.
    ```bash
    git push origin your-feature-branch
    ```
7. **Create a Pull Request**: Go to the original repository and create a pull request from your forked repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: [nitinthakur4406@gmail.com](mailto:nitinthakur4406@gmail.com)
- **GitHub**: [NitinSingh07](https://github.com/NitinSingh07)

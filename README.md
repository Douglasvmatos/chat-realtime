<h1 align="center">
    Project Full Stack - Login and Chat
</h1>

![test](https://github.com/Douglasvmatos/chat-realtime/assets/105434742/76609d1a-942c-4729-8358-3c7c265eb79d)

## 💻 Project

This project was created to develop a login page and an online chat using MongoDB, Node.js, Express.js, and React technologies. The system allows users to sign up, log in, and participate in real-time chat rooms.

## 🖧 Technologies

### Back-end
-   [ ] Bcrypt
-   [ ] Cors
-   [ ] Dotenv
-   [ ] Express
-   [ ] Mongoose
-   [ ] Socket.io

### Web
-   [ ] React
-   [ ] Axios
-   [ ] Buffer
-   [ ] Socket.io-client
-   [ ] Styled-components
-   [ ] Uuid
-   [ ] Tailwindcss

## ▶️ How execute

After cloning the project, follow these steps:

1st: In the "server" folder, install all dependencies with **npm install**;

2nd: In the "web" folder, install all dependencies with **npm install**;

3rd: Create a database on the MongoDB website (it's free), then create a user and change the DB_USER and DB_PASS information according to your user in the ".env.example" file in the "server" folder;

4th: In the "server" folder, change the name of the ".env.example" file to ".env";

5th: Connect your database using the Drives option and replace the link on line 19 mentioned in the server/index.js file with your connection link, using the drive string from @cluster0 to majority;

6th: Start the server with ``npm run start``;

7th: Start the front with ``npm run start``;

Now the chat application will run successfully.


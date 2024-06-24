# Chat application - with RTK Query

## Documentation


# Project Plan

## Requirement Analysis

1. user can register. after registering, user will be automatically logged in, we will store login info to localStorage (for login persistance) and redirected to inbox page

2. user can login and after login we will save the login information in localStorage (for login persistance) and redirect user to inbox

3. load sidebar messages from conversation API and implement load more feature

4. load specific conversation messages when user clicks on it and implement load more feature

5. when user sends message,
   a) if conversation id is present, update conversation table and also inserts into messages table
   b) if conversation id is missing, get conversation id using filter
   _ if conversation id exists, then update that conversation and add to messages table
   _ if conversation id is missing, insert that conversation and add to messages table

6. sidebar conversation list scroll - sort by latest first and when user loads more, bring previous "10 conversations sorted by latest first" and pushed into the conversations array

7. messages list scroll - bring "10 latest messages per request sorted by oldest first". when user loads more, "bring previous 10 messages sorted again by oldest first" and unshift into the array

## Component tree



# Technology

- React
- Redux
- Typescript
- Tailwind css
- RTK Query
- Infinite scroll
- Json server
- Socket.io
- Deploy in vercel

## How to clone project

```sh
git clone https://github.com/Jahid1499/chat-application.git
```

## How to run server

1. Go to the cloned project directory

   ```sh
   cd chat-application
   ```

2. First you need run server - for this follow those step

   ```sh
   cd backend
   ```

3. Install dependency

   ```sh
   npm i
   ```

4. Run project

   ```sh
   npm start
   ```

The server run in http://localhost:9000

> Note: when run server, in the terminal show, which port running the server

## How to run react application

1.  Go to the cloned project directory

    ```sh
    cd chat-application
    ```

2.  Setup environment - create a .env file in root directory and add those variable

    ```sh
    VITE_APP_URL=http://localhost:9000
    VITE_ENVIRONMENT_SERVER="development"
    VITE_APP_CONVERSATIONS_PER_PAGE=13
    VITE_APP_MESSAGES_PER_PAGE=12
    ```

> Note: if you want build this project, before build the VITE_ENVIRONMENT_SERVER should be production, like this, VITE_ENVIRONMENT_SERVER="production"

3. Install dependencies

   ```sh
   npm i
   ```

4. Run application

   ```sh
   npm run dev
   ```

5. Build application

   ```sh
   npm run build
   ```

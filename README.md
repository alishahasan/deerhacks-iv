READ THIS FIRST TO GET SET UP :D

git clone the repo from github

open it in vscode or some text editor like that (or terminal if you want)
then, go into the backend folder (cd backend) and run
- `npm install`
- `npm start`

then open another terminal in the project directory, go into the frontend folder (cd frontend) and run
- `npm install`
- `npm start`

this should open a `localhost` window in a browser with the app working

if you have any issues try gpting it or text me

some issues you probably won't face but just in case:

if you have mac and get permission denied run: `pip install -g npm` OR `sudo npm install -g npm`

i don't think this will happen but in case it does: if you get an error that says "`port 3000 already in use`" run

- WINDOWS: `netstat -ano | findstr :3000` AND THEN `taskkill /PID <PID> \F` (NOTE THESE ARE TWO SEPARATE COMMANDS)
- MAC: `lsof -i :3000` AND THEN `kill -9 <PID>` (NOTE THESE ARE TWO SEPARATE COMMANDS)

CODE INFO:

you'll mostly be working in frontend for today (i think)
- `frontend/public/index.html` does not need to be touched
- `frontend/src/App.js` is probably where most of the work will be done. 
- `frontend/src/styles.css` is to make it look pretty if you want to change the design of the buttons and stuff
- `frontend/src/index.js` i don't think needs to be changed at this point. mainly work in App.js and styles.css. notice that App.js has some HTML embedded within it


idk what you guys are thinking so i'm okay with whatever but here are just some ideas i had
- add a button to the front page that asks whether or not you're a student or a TA (if you're a student you get a learning style quiz and if you're a TA you get a teaching style quiz)
- we're going to need to do some backend work to configure an algorithm that matches student to TA
- after the quiz is over, there should be a final page with some stats shown (we can figure this out after we figure out the backend algorithm)
- also we need to come up with actually good questions to ask that are relevant to figure out learning styles etc. so maybe look into that and change the text in App.js to configure this
    - might need to add more quiz questions - i just put five as a placeholder but we can change ofc

if you guys want to change it up completely that's fine this is just what i did tonight

# Database Setup Instructions

## Prerequisites
- PostgreSQL installed on your machine
- Node.js and npm installed

## Setup Steps

1. Install PostgreSQL if you haven't already:
   ```bash
   # macOS (using Homebrew)
   brew install postgresql
   brew services start postgresql

   # Windows
   # Download and install from https://www.postgresql.org/download/windows/

   # Linux (Ubuntu/Debian)
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   ```
   (the `brew install postgresql` might take REALLY long guys don't stress)

2. Install project dependencies:
   ```bash
   cd backend
   npm install
   npm install dotenv pg
   ```

3. Create your local environment file:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your local PostgreSQL credentials
   # Use your preferred text editor
   ```

4. Set up the database:
   ```bash
   # Make the setup script executable
   chmod +x scripts/setup-db.sh
   
   # Run the setup script
   ./scripts/setup-db.sh
   ```

   Or manually:
   ```bash
   # Create database
   psql -U postgres -c "CREATE DATABASE learning_style_quiz;"
   
   # Run schema
   psql -U postgres -d learning_style_quiz -f db/schema.sql
   ```

## Troubleshooting

### Common Issues:

1. "psql: command not found"
   - Make sure PostgreSQL is installed and added to your PATH

2. "permission denied"
   - Try running the commands with sudo (Linux/macOS)
   - Check your PostgreSQL user permissions

3. "database already exists"
   - You can either drop the existing database or skip this step

4. Connection issues
   - Check that PostgreSQL service is running
   - Verify your credentials in .env file
   - Make sure the port isn't blocked by firewall

## Note for Contributors

- Never commit your .env file to git
- Always use environment variables for sensitive information
- Update .env.example if you add new environment variables
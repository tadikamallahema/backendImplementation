# Curvvtech
Backend Assignment 

1. Project Overview

A concise summary of the project purpose (e.g., "Curvvtech backend assignment – API server built with Node.js (Express), managing X, Y, Z entities").

Brief description of architecture: mention major folders like controllers, models, routes, middleware, services, jobs, and the main entrypoint Server.js .

2. Prerequisites

Required software: Node.js ,Express.js, mongoDB

3. Installation & Setup


# 1. Clone the repository
git clone https://github.com/kl-2200030647/Curvvtech.git

# 2. Navigate to project directory
cd Curvvtech

# 3. Install dependencies
npm install

# 4. Create a .env file at the root (with examples)
cp .env.example .env

# 5. Start the server (development mode)
nodemon Server.js

4. Configuration

List and explain each required environment variable, for example:

PORT=2025 — default server port

MONGODB_URI- mongodb://localhost:27017/

JWT_SECRET=<a-secure-token> — for authentication (if applicable)


5. Running the Server

How to start: nodemon Server.js 

Outputs of all the routers are mentioned in the assests folder of the code itself .
and used api's are 

for user :
1.To register an user 
post --> http://localhost:2025/auth/signup
2.To login the registered user 
post --> http://localhost:2025/auth/login


for devices :
-->Used middleware userAuth to check wether a user id logged in to perform operations on the device 
--> All these operations will be working only in case the user is logged in else these cannot be performed .
1.Create a device 
post --> http://localhost:2025/device/

2.Get all the devices list 
get --> http://localhost:2025/device/list

3.Update any device by using it's mongoose user._id
patch --> http://localhost:2025/device/:id

4. Delete the device by using the device id 
delete --> http://localhost:2025/device/:id

5.To update the last activity time 
post --> http://localhost:2025/device/:id/heartbeat 


for logs :
1. Create log entry
POST --> http://localhost:2025/devices/:id/logs 

2.Fetch last 10 logs
GET --> http://localhost:2025/devices/:id/logs?limit=10 

3.Aggregated usage
GET --> http://localhost:2025/devices/:id/usage?range=24h  


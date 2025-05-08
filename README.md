# 🚀 GIF Explorer

A full-stack application with a React frontend and a Node.js Express backend that fetches and displays trending GIFs from the Giphy API.  
Built for responsive, mobile-friendly viewing with Dockerized services ready for local development and production deployment.

---

## 📦 Features

✅ React frontend (Vite + TypeScript)  
✅ Node.js backend proxy (Express + Axios)  
✅ Pagination + search support  
✅ Responsive CSS grid layout  
✅ Loading spinners and smooth UX
✅ Docker multi-stage builds
✅ Docker setup for both local and production  

---

## 🏗 Project Structure

```
/backend        → Express backend service
/frontend       → React frontend (Vite)
/docker-compose.yml → Local dev orchestration
```

---

## ⚙ Environment Variables


### Backend `.env`

```
PORT=3000
GIPHY_API_KEY=your_giphy_api_key
GIPHY_API_BASE_URL=https://api.giphy.com
GIPHY_API_VERSION=v1
GIPHY_API_RESOURCE_PATH=gifs
REACT_APP_URL=https://your-frontend-url.com
```

### Frontend `.env`

```
VITE_BASE_BE_URL=https://your-backend-url.com
```

Be sure to replace `GIPHY_API_KEY` in your .env file with your own valid Giphy API key, which you can obtain from https://developers.giphy.com/.

For production only: Make sure to update `REACT_APP_URL` and `VITE_BASE_BE_URL` in `.env.prod` files to point to your actual production server URLs.

---

## 🏗 Local Development Setup

1️⃣ Clone the repo:

```bash
git clone https://github.com/your-repo/gif-explorer.git
cd gif-explorer
```

2️⃣ Run with Docker Compose:

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 🚀 Production Deployment

1️⃣ SSH into production server.

2️⃣ Backend deployment:

```bash
./deploy.sh
```

3️⃣ Frontend deployment:

```bash
./deploy.sh
```

✅ These scripts:

- Build Docker images
- Stop old containers
- Start new ones on correct ports

---

## 🔨 Available Commands

| Command                     | Location      | Description                        |
| --------------------------- | ------------- | ---------------------------------- |
| `npm run dev`               | frontend      | Run frontend locally               |
| `npm start`                 | backend       | Run backend locally                |
| `docker-compose up --build` | project root  | Run full stack locally with Docker |
| `./deploy.sh`               | backend       | Deploy backend (prod)              |
| `./deploy.sh`               | frontend      | Deploy frontend (prod)             |
| `npm run test`              | both services | Run unit + integration tests       |

---

## 🍌 Banana Bonus 😉

```
 _
 //\
V  \
 \  \_
  \,'.`-.
   |\ `. `.
   ( \  `. `-.                        _,.-:\
    \ \   `.  `-._             __..--' ,-';/
     \ `.   `-.   `-..___..---'   _.--' ,'/
      `. `.    `-._        __..--'    ,' /
        `. `-_     ``--..''       _.-' ,'
          `-_ `-.___        __,--'   ,'
             `-.__  `----"""    __.-'
                    `--..____..--'
```

---

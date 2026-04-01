# DevFolio — Programmer Portfolio Builder

A full-stack web application that lets programmers create and share their personal portfolio. Each user gets a public shareable URL to showcase their work.

## Features

- **Authentication** — Register & login with JWT-based security
- **Projects** — Showcase your work with links, tech stack, and images
- **Skills** — List technical skills by category and proficiency level
- **Work Experience** — Career history with date ranges
- **Education & Certifications** — Degrees, courses, and certifications
- **Activities & Hobbies** — Contributions, volunteering, hobbies, and more
- **Public Portfolio** — Shareable URL at `/u/your-username`

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS, React Router v6 |
| State / Forms | TanStack Query v5, React Hook Form, Zod |
| Backend | Spring Boot 3.2, Java 21, Spring Security |
| Auth | JWT (jjwt 0.12) |
| Database | PostgreSQL + Spring Data JPA |
| Build | Maven (backend), npm (frontend) |

## Getting Started

### Prerequisites

- Java JDK 21+ (tested on JDK 25)
- Maven 3.9+
- Node.js 18+
- PostgreSQL running locally

### 1. Database Setup

```sql
createdb -U postgres portfolio_db
```

### 2. Configure Backend

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/portfolio_db
    username: postgres
    password: YOUR_PASSWORD
```

### 3. Start the Backend

```bash
cd backend
mvn spring-boot:run
# API available at http://localhost:8080
```

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

Vite proxies all `/api/*` requests to `http://localhost:8080` — no CORS configuration needed in development.

## Project Structure

```
devfolio/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/portfolio/
│   │   ├── auth/                     # JWT auth (register, login)
│   │   ├── config/                   # Security, CORS, exception handler
│   │   ├── user/                     # User entity & service
│   │   └── portfolio/
│   │       ├── profile/              # Profile section
│   │       ├── project/              # Projects section
│   │       ├── skill/                # Skills section
│   │       ├── experience/           # Work experience section
│   │       ├── education/            # Education section
│   │       ├── activity/             # Activities & hobbies section
│   │       └── PublicPortfolioController.java
│   └── src/main/resources/
│       └── application.yml
│
├── frontend/                         # React application
│   └── src/
│       ├── api/                      # Axios instance + API calls
│       ├── components/
│       │   ├── ui/                   # Button, Input, Card, etc.
│       │   ├── layout/               # Navbar
│       │   └── sections/             # Per-section form & card components
│       ├── context/                  # AuthContext (JWT storage)
│       ├── pages/                    # Landing, Login, Register, Dashboard, Public
│       └── router/                   # Routes + ProtectedRoute
│
├── CLAUDE.md                         # Developer notes & architecture reference
└── README.md
```

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET/PUT | `/api/profile` | Yes | Own profile |
| GET | `/api/portfolio/public/{username}` | No | Full public portfolio |
| CRUD | `/api/projects` | Yes | Projects |
| CRUD | `/api/skills` | Yes | Skills |
| CRUD | `/api/experiences` | Yes | Work experience |
| CRUD | `/api/educations` | Yes | Education |
| CRUD | `/api/activities` | Yes | Activities |

## Screenshots

| Landing Page | Dashboard | Public Portfolio |
|---|---|---|
| Home with feature overview and CTA | Sidebar editor for all sections | Clean read-only portfolio view |

## License

MIT

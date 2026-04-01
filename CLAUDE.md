# DevFolio — Programmer Portfolio Builder

## Project Overview
A full-stack web app for programmers to build and share their personal portfolio. Multi-user, each user manages their own portfolio sections and gets a public shareable URL.

## Tech Stack
- **Frontend:** React 18 + Vite 5, Tailwind CSS v3, React Router v6, TanStack Query v5, React Hook Form + Zod, Axios
- **Backend:** Spring Boot 3.2.3, Java 21 (running on JDK 25), Spring Security + JWT (jjwt 0.12.3), Spring Data JPA, PostgreSQL
- **Build:** Maven (backend), npm (frontend)

## Project Structure
```
claude2/
├── frontend/          # React app — port 5173
├── backend/           # Spring Boot — port 8080
└── CLAUDE.md
```

## Running the App

### Prerequisites
- Java JDK 25 (compiles to Java 21 release target)
- Maven 3.9+
- Node.js 22+
- PostgreSQL 17 (database: `portfolio_db`, user: `postgres`, password: `linkdev`)

### Start Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Start Frontend
```bash
cd frontend
npm install   # first time only
npm run dev
# Runs on http://localhost:5173
```

Vite proxies `/api/*` → `http://localhost:8080` (no CORS issues).

## Architecture

### Database (PostgreSQL)
| Table | Purpose |
|---|---|
| `users` | Auth accounts (username, email, bcrypt password) |
| `profiles` | Bio, avatar, social links (1-to-1 with user) |
| `projects` | Portfolio projects (title, tech stack, URLs) |
| `skills` | Technical skills with proficiency levels |
| `work_experiences` | Job history with date ranges |
| `educations` | Degrees and certifications |
| `activities` | Hobbies, contributions, volunteering, other |

### Auth Flow
- JWT-based (1 day expiry), stored in `localStorage`
- All API requests send `Authorization: Bearer <token>`
- `JwtAuthFilter` validates token on every request
- `/api/auth/**` and `GET /api/portfolio/public/**` are public

### REST API
| Method | Path | Auth |
|---|---|---|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET/PUT | `/api/profile` | Yes |
| GET | `/api/portfolio/public/{username}` | No |
| CRUD | `/api/projects` | Yes |
| CRUD | `/api/skills` | Yes |
| CRUD | `/api/experiences` | Yes |
| CRUD | `/api/educations` | Yes |
| CRUD | `/api/activities` | Yes |

### Frontend Pages
| Route | Component | Auth Required |
|---|---|---|
| `/` | LandingPage | No |
| `/login` | LoginPage | No |
| `/register` | RegisterPage | No |
| `/dashboard` | DashboardPage | Yes |
| `/u/:username` | PublicPortfolioPage | No |

## Key Files
- `backend/src/main/resources/application.yml` — DB config, JWT secret, port
- `backend/pom.xml` — Dependencies (Lombok 1.18.38 required for Java 25 compat)
- `frontend/src/api/axios.js` — Axios instance with JWT interceptor
- `frontend/src/context/AuthContext.jsx` — Auth state (token, username)
- `frontend/src/router/index.jsx` — Routes + ProtectedRoute wrapper
- `frontend/src/components/sections/SectionManager.jsx` — Generic CRUD list manager

## Known Issues & Notes
- Lombok 1.18.38 is pinned in pom.xml — required for Java 25 JDK compatibility (older versions crash with `TypeTag :: UNKNOWN` error)
- HikariPool shows "clock leap detected" warnings after long idle periods — harmless, reconnects automatically
- `spring.jpa.open-in-view` warning is expected — can disable by adding `spring.jpa.open-in-view=false` to application.yml if needed
- PostgreSQL dialect warning is harmless (Spring Boot auto-detects it)

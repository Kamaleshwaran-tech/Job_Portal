# JOB_PORTAL

JOB_PORTAL is a full-stack job marketplace where candidates can discover jobs, upload resumes, and apply online, while recruiters can register their company, publish openings, manage visibility, and review applicants.

## Highlights

- Candidate authentication with Clerk
- Recruiter/company authentication with JWT
- Job listing, search, filter, and detail pages
- Resume upload support via Cloudinary
- Recruiter dashboard for posting jobs and reviewing applications
- MongoDB persistence with Mongoose models
- Sentry instrumentation in the backend

## Tech Stack

### Client

- React 19
- Vite
- React Router
- Material UI
- Clerk React
- Axios
- React Toastify
- Quill

### Server

- Node.js
- Express 5
- MongoDB + Mongoose
- Clerk Express
- JWT + bcrypt
- Cloudinary + multer
- Sentry

## Project Structure

```text
Job_Portal/
|-- client/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- context/
|   |   `-- pages/
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- package.json
|   |-- server.js
|   `-- vercel.json
`-- README.md
```

## Main Workflows

### Candidate flow

1. Sign in with Clerk.
2. Browse jobs on the home page.
3. Open a job detail page.
4. Upload a resume from the applications page.
5. Apply for jobs and track application status.

### Recruiter flow

1. Create a company account or log in.
2. Access the dashboard.
3. Post a new job.
4. Toggle job visibility.
5. Review applicants and accept or reject applications.

## Environment Variables

Create `.env` files in both `client/` and `server/`.

### Client `.env`

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Server `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_without_db_name
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

SENTRY_DSN=optional_if_you_move_it_from_code
```

Note: the backend currently appends `/job-portal` to `MONGODB_URI`, so the URI should point to the cluster or server root instead of a database-specific connection string.

## Local Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Run the backend

```bash
cd server
npm run server
```

### 3. Run the frontend

```bash
cd client
npm run dev
```

Frontend default URL: `http://localhost:5173`

Backend default URL: `http://localhost:5000`

## API Overview

### Public routes

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/company/register`
- `POST /api/company/login`
- `POST /webhooks`

### Protected user routes

- `GET /api/users/user`
- `GET /api/users/application`
- `POST /api/users/apply`
- `POST /api/users/update-resume`

### Protected recruiter routes

- `GET /api/company/company`
- `GET /api/company/applicants`
- `GET /api/company/list-jobs`
- `POST /api/company/post-job`
- `POST /api/company/change-status`
- `POST /api/company/change-visibility`

## Current Strengths

- Clear separation between candidate and recruiter workflows
- Sensible folder split between routes, controllers, models, and utilities
- Clerk user sync strategy helps keep candidate data aligned with auth
- Recruiter dashboard already supports the core hiring loop

## Improvement Roadmap

### High priority

- Add backend validation for job posting, application payloads, file uploads, and auth errors
- Restrict access to hidden jobs and prevent applications to invisible or expired jobs
- Move secrets and observability settings fully into environment variables
- Add pagination, sorting, and server-side filtering for jobs and applicants
- Introduce proper HTTP status codes and consistent error handling

### Product improvements

- Company profile pages and richer job/company branding
- Saved jobs, application withdrawal, and recruiter notes
- Email or in-app notifications for status changes
- Resume parsing and candidate profile completion score
- Advanced search filters such as salary range, remote/on-site, and experience level

### Engineering improvements

- Add unit/integration tests for controllers and auth middleware
- Add a shared API client layer in the frontend
- Replace some effect-driven derived state with memoized selectors
- Split large client bundle with route-based lazy loading
- Add `.env.example` files and deployment documentation

## Build Notes

- The client production build completes successfully.
- The current client lint run reports React Hook and state-in-effect issues that should be cleaned up before scaling the codebase further.

## Deployment Notes

- The backend includes `vercel.json`, so it appears intended for Vercel deployment.
- If you deploy the frontend separately, update `VITE_BACKEND_URL` to the live backend URL.
- Configure Clerk webhook delivery to the deployed `/webhooks` endpoint.

## Future Documentation Ideas

- Add screenshots or a short demo GIF
- Add `.env.example` files
- Add Postman collection or OpenAPI spec
- Add architecture diagram for auth and data flow

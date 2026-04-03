## SchoolApp – Tech Stack

Modern school management SaaS built with a clean Node/Express backend and a React/Vite frontend.

### Tech Stack (with logos)

<div align="left">
  <img alt="Node.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="38" />
  <img alt="Express" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="38" />
  <img alt="MongoDB" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="38" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000?logo=jsonwebtokens&logoColor=white" height="28" />
  <img alt="Vite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="38" />
  <img alt="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="38" />
  <img alt="Tailwind" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" height="38" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3068B7?logo=buffer&logoColor=white" height="28" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" height="28" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white" height="28" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=000" height="28" />
  <img alt="Three.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" height="38" />
</div>

- Frontend walkthrough:

<video src="./images/frontend.mp4" controls width="100%"></video>

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, rate limiting, cookie-based sessions
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, GSAP, Three.js (@react-three/fiber)
- **Validation/UX**: Zod validation, React Hot Toast for feedback
- **HTTP**: Axios with `withCredentials` for cookie auth

### Key Backend Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/check`, `PUT /api/auth/update`
- Students: `POST /api/createstudent`, `GET /api/students`, `GET /api/getAllunpaidstudents`, `GET /api/getallstudentsbyclassname`, `GET /api/getAllunpaidstudentsbyclassname`, `GET /api/StudentByName`, `PUT /api/updatestudent/:id`, `PUT /api/setunpaidstudent/:id`, `DELETE /api/deletestudent/:id`
- Teachers: `POST /api/createTeacher`, `GET /api/getAllteacher`, `PUT /api/updateTeacher/:teacherid`, `DELETE /api/deleteTeacher/:teacherid`, `GET /api/searchTeacher`
- Dashboard: `GET /api/dashboradData`

### Screenshots

Below are some app screenshots located in the `images/` folder:

![Home](./images/schoolHome.png)
![Login](./images/schoolLogin.png)
![Register](./images/schoolregister.png)
![Dashboard](./images/Dashboardschool.png)
![Student Management](./images/studentManagement,png.png)
![Teacher Management](./images/TeacherManagemnt.png)
![Settings](./images/Setting.png)
![Features](./images/schoolFeatures.png)
![Privacy Policy](./images/schoolPrivacypolicy.png)

### System Structure

![System Structure](./images/strucureflow.png)

If you find this project helpful, please consider giving it a star. Thank you!

### Authentication
- **Token-based auth with cookies**:
  - On successful login/register, server issues a signed JWT and sets it in an `HttpOnly` cookie `jwt` (Lax, not Secure in dev).
  - Subsequent requests to protected routes automatically include the cookie (Axios `withCredentials`).
  - Middleware accepts either cookie or `Authorization: Bearer <token>` header, but the primary flow uses the cookie.
  - Session validation: `GET /api/auth/check` returns school profile if the token is valid.

### Environment Variables (names only)
- Backend:
  - `Mongoose_URI`
  - `JWT_Secret`
- Frontend:
  - `VITE_API_BASE_URL`

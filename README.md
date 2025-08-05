# Teslovel

Teslovel is a modern web application built with a powerful full-stack architecture, aiming for scalability, performance, and clean code.

## 🛠️ Tech Stack

### Frontend

- [React](https://reactjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- [Vite](https://vitejs.dev/) — Fast build tool and dev server
- [React SWC plugin](https://github.com/vitejs/vite-plugin-react-swc) — Ultra-fast compilation
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — Code quality and formatting
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling framework
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) — Internationalization support (`uk`, `en`, `ru`)
- [React Router](https://reactrouter.com/) — Client-side routing
- [Framer Motion](https://www.framer.com/motion/) — Animation and transitions
- [React Toastify](https://fkhadra.github.io/react-toastify/) — Toast notifications
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker) — Date picker for range and single selection
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) — Lightweight and customizable image lightbox
- [usehooks-ts](https://usehooks-ts.com/) — TypeScript-first React utility hooks
- [Swiper](https://swiperjs.com/react) — Modern touch slider for carousels and galleries
- [React Icons](https://react-icons.github.io/react-icons/) — Popular icon packs as React components
- [react-phone-input-2](https://github.com/bl00mber/react-phone-input-2) — International telephone input with flag dropdown
* [react-quill-new](https://www.npmjs.com/package/react-quill-new) — Rich text editor for blog content and formatted input

### ✅ Backend

* [**Django**](https://www.djangoproject.com/) — Python web framework
* [**Django REST Framework**](https://www.django-rest-framework.org/) — A powerful and flexible toolkit for building Web APIs. DRF simplifies serialization, request validation, authentication, permissions, pagination, and more — enabling clean and maintainable API endpoints to power the React frontend.
* [**requests**](https://pypi.org/project/requests/) — Elegant and simple HTTP library for Python (used for Telegram bot messaging and other external API integrations)
* [**djangorestframework-simplejwt**](https://github.com/jazzband/djangorestframework-simplejwt) — A JSON Web Token authentication plugin for Django REST Framework
* [**django-otp**](https://pypi.org/project/django-otp/) — Pluggable framework for adding one-time passwords (OTP), used to build two-factor authentication with TOTP tokens
* [**qrcode**](https://pypi.org/project/qrcode/) — Python library to generate QR codes, used for displaying TOTP secrets that users can scan in authenticator apps
* [**django-two-factor-auth**](https://github.com/Bouke/django-two-factor-auth) — Ready-to-use 2FA integration for Django using OTP via TOTP or static backup tokens; simplifies device setup and verification
* [**phonenumbers**](https://pypi.org/project/phonenumbers/) — Library for parsing, formatting, and validating international phone numbers (used internally by `django-two-factor-auth`)
* [**Pillow**](https://pypi.org/project/Pillow/) — Imaging library used for generating and manipulating image files (required by `qrcode` for PNG output)
* [**cloudinary**](https://pypi.org/project/cloudinary/) — A cloud-based image and video management solution. Used in combination with [`django-cloudinary-storage`](https://github.com/klis87/django-cloudinary-storage) to enable direct uploads and delivery of optimized images through Cloudinary CDN. All image fields in the `Bike` model are now managed via Cloudinary.

### Dev & Build Tools

- [Python-dotenv](https://pypi.org/project/python-dotenv/)
- [npm](https://www.npmjs.com/) / [Node.js](https://nodejs.org/)
- [Gunicorn](https://gunicorn.org/)
- [Tailwind CLI / PostCSS](https://tailwindcss.com/docs/installation)

---

## 🌐 Internationalization (i18n)

This app includes full multi-language support via **i18next**, with translations for:

- 🇺🇦 Ukrainian (`uk`)
- 🇬🇧 English (`en`)
- 🇷🇺 Russian (`ru`)

More languages can be added as the project evolves.

---

## 📄 Documentation

Here's a cleaner, more beautiful, and professional version of your project structure documentation for `README.md`:

---

## 📁 Project Structure

This project is a full-stack web application powered by **Django** (backend) and **ReactJS** (frontend). Below is an overview of the key directories and files:

```bash
├── .vscode/               # VSCode settings to prevent common TypeScript issues
├── backend/               # Core Django backend (settings.py, urls.py, wsgi.py, etc.)
├── backendApps/           # All Django apps used in the project
├── frontend/              # ReactJS frontend application
├── templates/             # Django HTML templates (entry point: index.html)
├── .gitignore             # Git ignore rules (e.g., node_modules, __pycache__)
├── manage.py              # Django project management CLI
├── package.json           # Node.js config for Heroku compatibility (React buildpack)
├── Procfile               # Heroku deployment configuration
└── requirements.txt       # Python dependencies for virtual environment
```

## 🔧 Key Notes

* **`.vscode/`** – Helps maintain consistent TypeScript development experience across environments.
* **`backend/`** – Contains project-wide Django configuration files.
* **`backendApps/`** – Modular Django apps live here (e.g., accounts, API, auth).
* **`frontend/`** – Contains all React components, assets, and build logic.
* **`templates/`** – Includes `index.html` and other Django-served templates.
* **`Procfile` & `package.json`** – Enable Heroku to build and serve both backend and frontend correctly.
* **`requirements.txt`** – All Python libraries needed (used by Heroku and for local setup).

Here's a clean and professional version of the `## 📁 backendApps` section for your `README.md`:

---

## 📁 `backendApps`

This directory contains all modular Django apps that power the backend functionality of the project:

| App Name               | Description                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`accounts`**         | Manages the extended user model, authentication endpoints, token management, and profile settings such as 2FA. |
| **`blogs`**            | Implements the blog system, including models, endpoints, and admin features.                                   |
| **`catalog`**          | Contains models and APIs for bikes and all items displayed on the store page.                                  |
| **`customer_support`** | Handles "Contact Us" functionality, including user inquiries and related models.                               |
| **`expenses`**         | Manages expense tracking models and related admin panel endpoints.                                             |
| **`orders`**           | Contains the `Order` model and endpoints for order placement, validation, and management.                      |
| **`specs_type`**       | Defines specification models such as battery types, brake types, engine positions, etc.                        |

Each app is self-contained with its own models, serializers, views, and URLs, following Django's app-based architecture.


Here's a refined and professional version of your `## 📁 frontend` section for `README.md`:

---

## 📁 `frontend`

This folder contains the **React + TypeScript + Vite** frontend application, optimized with the **SWC compiler** for faster builds. For a deeper understanding of the structure, refer to the [Vite official documentation](https://vitejs.dev/).

Below is a brief overview of custom additions and key files:

| Path/File      | Description                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **`views.py`** | Django view that serves `index.html` with all necessary context tokens (e.g., CSRF, session). Enables seamless Django integration for the SPA. |
| **`public/`**  | Contains static assets such as the favicon (tab icon).                                                                                         |
| **`src/`**     | Core of the frontend app: includes pages, components, hooks, API logic, styles, and more.                                                      |

The frontend is designed as a **Single Page Application (SPA)** and is configured to work smoothly when served by Django in production or development.


Here's a clean and well-structured version of your `## 📁 frontend/src` section for `README.md`:

---

## 📁 `frontend/src`

This is the core folder of the **React + TypeScript** frontend application. Below is a breakdown of the main subdirectories:

| Folder/File       | Description                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **`assets/`**     | Contains images and static assets used across pages.                                     |
| **`components/`** | Main directory for all reusable React components.                                        |
| **`endpoints/`**  | Contains modular API utility functions for interacting with Django backend endpoints.    |
| **`lib/`**        | Core utilities including custom hooks, fetchers, route helpers, and global types.        |
| **`locales/`**    | i18n configuration and localization files for multi-language support.                    |
| **`pages/`**      | All route-based pages of the application. Each file here corresponds to a main view.     |
| **`types/`**      | Additional TypeScript definitions, including support for external libraries like Swiper. |

For details about application setup files such as `App.tsx`, `main.tsx`, and `index.css`, refer to the [official Vite + React documentation](https://vitejs.dev/guide/).

---

## 📌 Status

🚧 **Under active development** — Feel free to explore, contribute, or follow the progress!

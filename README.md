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

Here's the updated backend documentation section with **Cloudinary** added:

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
- [Gunicorn](https://gunicorn.org/) _Planned for deployment_
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

More documentation will be added as the project grows, including setup instructions, API usage, deployment guides, and architecture decisions.

---

## 📌 Status

🚧 **Under active development** — Feel free to explore, contribute, or follow the progress!
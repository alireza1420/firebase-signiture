# **App Name**: SignLink

## Core Features:

- Admin Login: Admin login with username and password for secure access to the admin dashboard.
- Consent Form Upload: Upload a PDF or paste plain text for the consent form to be signed.
- Link Generation: Generate a unique, non-searchable public link (UUID) for each consent form.
- Custom Form Fields: Allow users to fill out customizable form fields before and after viewing the consent form.
- Submission Tracking: Record the user's name data and timestamp upon submission of the consent form.

## Style Guidelines:

- Primary color: Use a professional and trustworthy blue (#29ABE2) similar to Scrive's main color.
- Secondary color: Light gray (#F7F7F7) for backgrounds to create a clean and modern feel, similar to Scrive.
- Accent: A brighter, contrasting color (e.g., #00AEEF) for call-to-action buttons to draw attention, inspired by Scrive's use of vibrant accents.
- Use clean, modern sans-serif fonts like Open Sans or Lato for readability and a professional look, mirroring Scrive's font choices.
- Implement a clean, organized layout with clear sections and intuitive navigation, focusing on a user-friendly experience like Scrive.
- Employ a consistent and professional icon set with clear visual metaphors for actions and elements, similar to the iconography used by Scrive.
- Incorporate subtle and purposeful animations for transitions and feedback to enhance user engagement without being distracting, drawing inspiration from Scrive's subtle animations.

## Original User Request:
Description:
We are seeking a skilled developer (or small team) to build a web-based platform for collecting
simple electronic signatures (SES) from parents/guardians, related to child participation in a
research study. The goal is to create a clean, secure, and easy-to-use interface for both
administrators and recipients (parents/guardians).

✅ What We Need:
Admin Functionality:
 Login with username and password.
 Upload a PDF file or paste plain text as a consent form.
 Optionally support OneDrive-hosted documents (if no upload).
 Generate a non-searchable, public link (UUID).
 Admin will manually send the link via SMS (you don’t need to build SMS integration).
 Define 4 custom form field titles (2 appear before, 2 after the consent form).
 View and export submitted consents (CSV or table export).
User Experience (Parents/Guardians):
 Open a public link (no login required).
 Fill out 2 form fields before the consent form (customizable headings).
 View the consent form (PDF viewer or plain text).
 Fill out 2 more form fields below the form.
 Click “Consent” or “Decline”.
 Store name data + timestamp on submission.

 Preferred Tech Stack (Open to Suggestions):
 Frontend: React (or similar)
 Backend: Node.js with Express (or Firebase)
 File Storage: Firebase Storage or AWS S3
 Database: Firebase Firestore or PostgreSQL
 Hosting: Vercel, Netlify, or similar
  
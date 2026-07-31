# 🩸 Blood Bank Management System - API & Environment Documentation

This document centralizes all **Render Backend APIs**, **Environment Variables**, and **Endpoints Map** so developers and AI tools can access them without manual input.

---

## 🌐 Deployed Services URLs

- **Production Backend (Render)**: `https://blood-bank-urer.onrender.com`
- **Production Frontend (Vercel)**: `https://blood-bank-tan.vercel.app`
- **GitHub Repository**: `https://github.com/MayankRai89/Blood_Bank`

---

## 🔑 Render Environment Variables

To configure your Render backend service (`blood-bank-urer`), add the following environment variables under **Render Dashboard -> Environment**:

```env
MONGO_URI=mongodb+srv://dhananjaiy413_db_user:iw4IDuXRirRKL9YX@bloodbank.nwhk7hx.mongodb.net/bloodbank?retryWrites=true&w=majority
JWT_SECRET=cb30d965391514c78e3fac05967b95ff02692797ea6a139e141b0182f552a3b1
PORT=5000

# Google OAuth2 & Nodemailer Email Service
GOOGLE_USER=raimayank245@gmail.com
GOOGLE_CLIENT_ID=310224542593-qi5ae6b72717m09d665fubvgae2knceo.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-... (Stored in secrets)
GOOGLE_REFRESH_TOKEN=1//... (Stored in secrets)
```

---

## 🚀 Complete API Endpoint Registry

### 🔐 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Unified user registration (Donor / Hospital / Blood Lab). Enforces strict email verification. |
| `POST` | `/api/auth/login` | Unified login with Email ID & Password. |
| `POST` | `/api/auth/google` | Google OAuth2 ID Token login & automatic account registration. |
| `GET` | `/api/auth/verify-email?token=...` | Verifies user email address via token link. |

### 🩸 2. Donor Routes (`/api/donor`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/donor/profile` | Fetch authenticated donor's profile details. |
| `PUT` | `/api/donor/profile` | Update donor's personal & contact details. |
| `GET` | `/api/donor/history` | Fetch donor's complete blood donation history. |

### 🏥 3. Facility Routes (`/api/facility`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/facility/blood-stock` | Retrieve real-time blood group inventory levels. |
| `POST` | `/api/facility/record-donation` | Record new blood donation and send official Certificate of Donation to donor email. |
| `POST` | `/api/facility/request-blood` | Submit urgent blood group request to neighboring facilities. |

### 🏕️ 4. Blood Camps Routes (`/api/camps`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/camps` | Fetch all upcoming and active blood donation camps. |
| `POST` | `/api/camps` | Create a new blood donation camp event. |

---

## 💡 Where to Paste APIs on Render Dashboard

1. Go to **[dashboard.render.com](https://dashboard.render.com)**
2. Click on your Web Service **`blood-bank-urer`**
3. Select **Environment** from the left sidebar
4. Click **Add Environment Variable** or **Edit Secret Files**
5. Paste `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_*` credentials as shown above!

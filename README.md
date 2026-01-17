# 📁 Secure Share

### _A File Sharing Application_

A modern, secure, and user-friendly **file-sharing web application** built with **Node.js** and **Express.js**.  
Upload files, generate shareable links, and send downloads via email with ease.

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)
![Express](https://img.shields.io/badge/Express-5.2-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)

---

## ✨ Features

- 🚀 **Fast File Upload** – Upload files up to **100MB** with drag-and-drop support
- 🔗 **Shareable Links** – Unique, secure URLs for every uploaded file
- 📧 **Email Sharing** – Send download links via email using elegant templates
- ⏰ **Auto-Expiration** – File links expire after **24 hours** for security
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI** – Clean, minimal, and intuitive interface
- 🔒 **Secure Access** – UUID-based file identification

---

## 🛠️ Tech Stack

| Category        | Technology                     |
| --------------- | ------------------------------ |
| Backend         | Node.js, Express.js            |
| Database        | MongoDB (Mongoose)             |
| Template Engine | EJS                            |
| File Upload     | Multer                         |
| Email Service   | Nodemailer                     |
| Frontend        | HTML5, CSS3, JavaScript (ES6+) |
| Package Manager | Yarn                           |

---

## 📋 Prerequisites

Ensure the following are installed:

- Node.js **v14+**
- Yarn or npm
- MongoDB (Local or Atlas)
- Git

---

### Installing Yarn

**Windows / MacOS**

```bash
npm install -g yarn

brew install yarn
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dhanush-alagandula/secure-share.git
cd secure-share

```

### 2️⃣ Install Dependencies

```bash
yarn install

(or if using npm)

npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the project root:

```bash
# Server Configuration
PORT=3000
APP_BASE_URL=http://localhost:3000

# MongoDB Configuration
MONGO_URI=
# MongoDB Atlas example:
# mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>

# CORS
ALLOWED_CLIENTS=http://localhost:3000,http://localhost:3001

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

```

### 4️⃣ Creating a MongoDB Database

**MongoDB Atlas**

```
- Create a cluster
- Add database user
- Whitelist IP (`0.0.0.0/0`)
- Copy connection string into `MONGO_URI`

```

---

### 📝 Scripts

```bash
yarn dev      # Development
yarn serve    # Production

```

---

## 🔌 API Endpoints

### Upload File

```md
POST Request : /api/files
Content-Type: multipart/form-data
Body: { myfile: File }
```

### Send Email

```md
POST Request : /api/files/send
Content-Type: application/json
```

### Download File

```md
GET Request : /files/:uuid
```

## 📁 Project Structure

```text
file-share/
├── config/
│   └── db.js
├── models/
│   └── file.js
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── routes/
│   ├── files.js
│   ├── show.js
│   └── download.js
├── services/
│   ├── email.js
│   └── emailTemplate.js
├── uploads/
├── views/
│   ├── index.ejs
│   └── download.ejs
├── .env
├── server.js
├── package.json
└── README.md
```

## 🐛 Troubleshooting

| Issue             | Solution                         |
| ----------------- | -------------------------------- |
| Yarn not found    | npm install -g yarn              |
| MongoDB error     | Verify URI & service             |
| Upload fails      | Check file size & uploads folder |
| Email not sending | Verify SMTP credentials          |
| CORS error        | Update ALLOWED_CLIENTS           |

## 🚧 Future Enhancements

- User authentication
- File preview
- Multi-file upload
- Cloud storage (S3, Cloudinary)
- Download analytics
- Password-protected files

## 🤝 Contributing

- Fork the repository
- Create a feature branch
- Commit changes
- Push and open a Pull Request

## 📄 License

Licensed under the MIT License

## ⭐ Support

If you find this project useful, please star the repository.

<br>
<div align="center">
Made with ❤️ using Node.js & Express  
<br/>
<a href="https://github.com/dhanush-alagandula/secure-share">⬆ Back to Top</a>
</div>

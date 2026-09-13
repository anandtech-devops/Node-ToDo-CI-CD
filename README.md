# Node Todo App — Jenkins CI/CD with Docker

A simple **Node.js Todo application** built to practice a real-world **CI/CD pipeline using GitHub, Jenkins, Docker, and GitHub Webhooks**.

The project demonstrates how a developer push can automatically trigger Jenkins, build a Docker image, replace the existing container, and deploy the latest application version.

---

## 🚀 Project Overview

This project implements an automated CI/CD workflow:

```text
Developer
    |
    | git push
    ↓
GitHub Repository
    |
    | Webhook
    ↓
Jenkins
    |
    | Checkout source code
    ↓
Docker Build
    |
    | Build image
    ↓
Docker Container
    |
    | Port 8000
    ↓
Node.js Todo Application
```

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **JavaScript**
* **HTML / CSS**
* **Git & GitHub**
* **Jenkins**
* **Docker**
* **GitHub Webhooks**
* **Linux / Ubuntu**
* **AWS EC2**

---

## 📁 Project Structure

```text
Node-ToDo-CI-CD/
│
├── app.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
│
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 💻 Application Features

The Todo application provides:

* Add Todo
* Mark Todo as completed
* Delete Todo
* REST API endpoints
* Health check endpoint
* Simple web-based UI

### Health Check

```text
GET /health
```

Example response:

```json
{
  "status": "UP",
  "application": "node-todo-app"
}
```

---

# 🔄 CI/CD Pipeline

The Jenkins pipeline is configured as a **Freestyle Project** without a Jenkinsfile.

### Pipeline Flow

```text
GitHub Push
     ↓
GitHub Webhook
     ↓
Jenkins Freestyle Job
     ↓
Git Checkout
     ↓
Docker Image Build
     ↓
Stop Existing Container
     ↓
Remove Existing Container
     ↓
Start New Container
     ↓
Application Deployment
```

---

## 🔗 GitHub Webhook

The Jenkins job uses:

```text
GitHub hook trigger for GITScm polling
```

When code is pushed to the GitHub repository, GitHub sends a webhook request to Jenkins.

Jenkins automatically starts the build.

This removes the need to manually click **Build Now**.

---

# 🐳 Docker

The application is packaged into a Docker image.

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

### Build Docker Image

```bash
docker build -t todoappimage .
```

### Run Container

```bash
docker run -d \
  --name todoappcontainer \
  -p 8000:8000 \
  todoappimage
```

---

# ⚙️ Jenkins Deployment Script

The Jenkins Freestyle job uses an Execute Shell build step.

```bash
#!/bin/bash

docker build -t todoappimage .

docker stop todoappcontainer || true
docker rm todoappcontainer || true

docker run -d \
  --name todoappcontainer \
  -p 8000:8000 \
  todoappimage
```

### Why `|| true`?

On the first deployment, the container may not exist.

Without `|| true`, this command could cause the Jenkins build to fail:

```bash
docker stop todoappcontainer
```

Using:

```bash
docker stop todoappcontainer || true
```

allows the deployment to continue when the container doesn't already exist.

---

# 🔧 Troubleshooting

This project also includes real CI/CD troubleshooting scenarios.

## 1. Docker Permission Denied

### Error

```text
permission denied while trying to connect to the Docker API
at unix:///var/run/docker.sock
```

### Cause

The Jenkins user did not have permission to access the Docker daemon.

### Fix

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

Verify:

```bash
sudo -u jenkins docker ps
```

---

## 2. Docker Container Name Conflict

### Error

```text
Conflict. The container name "/todoappcontainer"
is already in use
```

### Cause

The previous deployment container was still present.

### Diagnosis

```bash
docker ps -a
```

### Manual Fix

```bash
docker stop todoappcontainer
docker rm todoappcontainer
```

### Permanent CI/CD Fix

The Jenkins deployment script automatically handles the old container:

```bash
docker stop todoappcontainer || true
docker rm todoappcontainer || true
```

---

## 3. Jenkins Git SSH Host Key Warning

Jenkins displayed:

```text
known_hosts file does not exist
```

This means Jenkins was configured to verify GitHub's SSH host key using a known-hosts file, but the expected file was not present.

The warning did not prevent the build, but it should be properly configured for a production-style Jenkins environment.

---

# 🧪 Local Development

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

The application starts on:

```text
http://localhost:8000
```

Health endpoint:

```text
http://localhost:8000/health
```

---

# 📦 Docker Verification

Check running containers:

```bash
docker ps
```

Check all containers:

```bash
docker ps -a
```

Check application logs:

```bash
docker logs todoappcontainer
```

Expected log:

```text
Node Todo App running on port 8000
```

---

# 🔐 GitHub Authentication

Jenkins uses an SSH credential to authenticate with GitHub.

The SSH private key is stored securely inside Jenkins credentials.

**Never commit or push the private SSH key to GitHub.**

Only the public key should be added to GitHub.

---

# ☁️ AWS Deployment

The Jenkins server and Docker deployment are hosted on an **AWS EC2 Ubuntu instance**.

Application port:

```text
8000
```

The EC2 Security Group must allow inbound TCP traffic on port `8000` if the application needs to be accessed externally.

---

# 📊 CI/CD Result

The final automated workflow successfully demonstrates:

* GitHub repository integration
* GitHub SSH authentication
* GitHub Webhook
* Jenkins automated trigger
* Jenkins Freestyle project
* Git checkout
* Docker image creation
* Docker container deployment
* Automated container replacement
* CI/CD troubleshooting
* AWS EC2 deployment

---

# 🎯 Learning Objectives

This project was created to gain practical experience with:

1. Git and GitHub
2. GitHub Webhooks
3. Jenkins Freestyle Jobs
4. Jenkins Build Triggers
5. Docker image creation
6. Docker container management
7. Linux permissions
8. CI/CD troubleshooting
9. Application deployment on AWS EC2

---

# 👨‍💻 Author

**Anand Srivastava**

DevOps Engineer

### Skills Demonstrated

```text
AWS
Linux
Git
GitHub
Jenkins
Docker
CI/CD
GitHub Webhooks
Node.js
```

---

## ⭐ Project

If you find this project useful, feel free to star the repository.


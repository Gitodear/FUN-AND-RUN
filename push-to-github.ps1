# GitHub Push Script for FUN-AND-RUN
# Scheduled to run on March 31, 2026

# Navigate to project directory
cd "C:\Users\abhim\OneDrive\Desktop\FUN AND RUN"

# Initialize git and add project description
echo "# FUN-AND-RUN" >> README.md

# Git commands
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Gitodear/FUN-AND-RUN.git
git push -u origin main

Write-Host "✅ Project pushed to GitHub successfully!" -ForegroundColor Green

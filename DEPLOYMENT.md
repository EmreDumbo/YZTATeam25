# 🚀 PharmAI Deployment Guide

## Quick Start Options

### Option 1: One-Click Deployment (Recommended)
```bash
./deploy.sh
```

### Option 2: Manual Deployment

## 📦 Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy Frontend:**
```bash
cd client
vercel --prod
```

3. **Set Environment Variables in Vercel Dashboard:**
- `NEXT_PUBLIC_API_URL`: Your backend URL

## 🚂 Backend Deployment (Railway)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Deploy Backend:**
```bash
cd server
railway up
```

4. **Set Environment Variables in Railway Dashboard:**
- `JWT_SECRET`: Your JWT secret key
- `GEMINI_API_KEY`: Your Gemini API key
- `DATABASE_URL`: SQLite database path
- `PORT`: 4000

## 🐳 Docker Deployment

1. **Build Backend Image:**
```bash
cd server
docker build -t pharmai-backend .
```

2. **Run Container:**
```bash
docker run -p 4000:4000 -e JWT_SECRET=your-secret pharmai-backend
```

3. **For Frontend:**
```bash
cd client
docker build -t pharmai-frontend .
docker run -p 3000:3000 pharmai-frontend
```

## 🦸 Heroku Deployment

1. **Install Heroku CLI:**
```bash
# macOS
brew install heroku/brew/heroku

# Or download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create and Deploy:**
```bash
heroku create pharmai-app
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python
git push heroku main
```

4. **Set Environment Variables:**
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set GEMINI_API_KEY=your-gemini-key
```

## 🔧 Environment Variables

### Required Variables:
- `JWT_SECRET`: Secret key for JWT tokens
- `GEMINI_API_KEY`: Google Gemini API key
- `DATABASE_URL`: Database connection string
- `PORT`: Server port (default: 4000)

### Optional Variables:
- `NODE_ENV`: Environment (production/development)
- `CORS_ORIGIN`: Allowed CORS origins
- `PYTHON_PATH`: Python executable path

## 📋 Pre-Deployment Checklist

- [ ] Set up environment variables
- [ ] Test locally with `npm run dev`
- [ ] Ensure all dependencies are installed
- [ ] Check Python script paths
- [ ] Verify database connections
- [ ] Test API endpoints

## 🔍 Post-Deployment Verification

1. **Test API Endpoints:**
```bash
curl https://your-backend-url.railway.app/api/drug/info/parol
```

2. **Test Frontend:**
- Visit your frontend URL
- Test login/register functionality
- Test drug search features

3. **Monitor Logs:**
```bash
# Railway
railway logs

# Heroku
heroku logs --tail

# Docker
docker logs container-name
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Python Script Not Found:**
   - Ensure Python is installed on the server
   - Check file paths in the deployment

2. **CORS Errors:**
   - Update CORS_ORIGIN in environment variables
   - Check frontend-backend URL configuration

3. **Database Issues:**
   - Ensure database file is writable
   - Check database path configuration

4. **API Key Issues:**
   - Verify Gemini API key is valid
   - Check API key environment variable

## 📊 Monitoring & Analytics

### Recommended Tools:
- **Vercel Analytics** (Frontend)
- **Railway Metrics** (Backend)
- **Sentry** (Error tracking)
- **LogRocket** (User session replay)

## 🔒 Security Considerations

1. **Environment Variables:**
   - Never commit secrets to git
   - Use platform-specific secret management

2. **CORS Configuration:**
   - Restrict origins to your domains only
   - Use HTTPS in production

3. **Database Security:**
   - Use strong JWT secrets
   - Implement rate limiting
   - Add input validation

## 💰 Cost Optimization

### Free Tier Options:
- **Vercel**: Free for personal projects
- **Railway**: $5/month for basic usage
- **Heroku**: Free tier discontinued
- **Render**: Free tier available

### Scaling Considerations:
- Monitor usage and upgrade when needed
- Use CDN for static assets
- Implement caching strategies

## 🚀 Advanced Deployment

### CI/CD Pipeline:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
```

### Multi-Environment Setup:
- Development: Local development
- Staging: Pre-production testing
- Production: Live application

## 📞 Support

If you encounter issues:
1. Check the logs for error messages
2. Verify environment variables
3. Test endpoints individually
4. Check platform-specific documentation

---

**Happy Deploying! 🎉** 
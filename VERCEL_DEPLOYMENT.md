# Vercel Deployment Guide for Pulse Watches

This guide will help you deploy your Pulse Watches full-stack application on Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket Account**: Your code needs to be in a Git repository
3. **MongoDB Atlas**: Your database connection string

## Project Structure

Vercel will use this structure:
```
pulse-watches/
├── api/
│   └── index.js          # Serverless function wrapper
├── client/               # React frontend
├── server/               # Express backend
├── vercel.json          # Vercel configuration
└── package.json         # Root package.json
```

## Step 1: Push to Git Repository

If you haven't already, initialize Git and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Create .vercelignore File

Create `.vercelignore` in the root directory:

```bash
# .vercelignore
server/node_modules/
client/node_modules/
*.md
.git/
.env.local
```

## Step 3: Environment Variables Setup

You'll need to set these environment variables in Vercel:

### Required Environment Variables

Go to your Vercel project settings → Environment Variables and add:

1. **MONGO_URI**
   ```
   mongodb+srv://wajeeh:pulsewatches@cluster0.drx1hgs.mongodb.net/?appName=Cluster0
   ```

2. **JWT_SECRET**
   ```
   mySuperSecretKey123
   ```

3. **CLIENT_URL**
   ```
   https://your-app-name.vercel.app
   ```
   (Update this after deployment with your actual Vercel URL)

4. **NODE_ENV**
   ```
   production
   ```

### Optional Environment Variables

5. **VITE_API_URL** (for client)
   ```
   https://your-app-name.vercel.app/api
   ```
   (Will be set automatically, but you can override)

6. **Email Configuration** (if using nodemailer)
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as root (`.`)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm run install:all`
5. Add environment variables (from Step 3)
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 5: Update Client API URL

After deployment, update the client API URL:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Update `VITE_API_URL`:
   ```
   https://your-app-name.vercel.app/api
   ```
3. Redeploy the project

Or update `client/.env`:
```env
VITE_API_URL=https://your-app-name.vercel.app/api
```

## Step 6: Configure Build Settings

In Vercel Dashboard → Settings → General:

- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `cd client && npm install && cd ../server && npm install`
- **Node Version**: 18.x or 20.x

## Step 7: Test Deployment

1. Visit your deployed URL: `https://your-app-name.vercel.app`
2. Check API health: `https://your-app-name.vercel.app/api/health`
3. Test API endpoints: `https://your-app-name.vercel.app/api/products`

## Troubleshooting

### Issue: API Routes Return 404

**Solution**: 
- Check that `api/index.js` exists
- Verify `vercel.json` routes are correct
- Ensure server app is exported correctly

### Issue: Client Shows API Errors

**Solution**:
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Check CORS settings in `server/app.js`
- Ensure API base URL includes `/api`

### Issue: MongoDB Connection Failed

**Solution**:
- Verify `MONGO_URI` is set in Vercel environment variables
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- Ensure connection string is correct

### Issue: Build Fails

**Solution**:
- Check Node version in Vercel (should be 18.x or 20.x)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Issue: Environment Variables Not Working

**Solution**:
- Environment variables with `VITE_` prefix need to be set in Vercel
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

## Post-Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB connection working
- [ ] API endpoints accessible (`/api/health`, `/api/products`)
- [ ] Client can fetch data from API
- [ ] CORS configured correctly
- [ ] Update `CLIENT_URL` with actual Vercel URL
- [ ] Update `sitemap.xml` with production URL
- [ ] Update `robots.txt` if needed
- [ ] Test authentication flow
- [ ] Test product display
- [ ] Test cart functionality

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `CLIENT_URL` and `VITE_API_URL` with custom domain

## Continuous Deployment

Vercel automatically deploys on every push to your main branch:
- Push to `main` branch → Auto-deploy
- Create Pull Request → Preview deployment
- Merge PR → Production deployment

## File Structure for Vercel

```
pulse-watches/
├── .vercelignore        # Files to ignore
├── vercel.json          # Vercel configuration
├── package.json         # Root dependencies
├── api/
│   └── index.js         # Serverless function
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── dist/            # Build output
│   └── ...
└── server/
    ├── package.json
    ├── app.js
    └── ...
```

## Performance Optimizations on Vercel

1. **Serverless Functions**: API routes run as serverless functions
2. **Edge Caching**: Static assets cached at edge
3. **CDN**: Built-in CDN for fast global delivery
4. **Auto-scaling**: Functions scale automatically

## Additional Notes

- Vercel functions have a 10-second timeout (Hobby plan) or 60 seconds (Pro plan)
- Cold starts may take a few seconds on first request
- MongoDB connection should use connection pooling
- Consider using Vercel's serverless database for better performance

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check function logs in Vercel dashboard
3. Verify environment variables
4. Test API endpoints directly

Good luck with your deployment! 🚀


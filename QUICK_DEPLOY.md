# Quick Vercel Deployment Guide

## 🚀 Fast Deployment Steps

### 1. Push to GitHub (if not done)

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Framework Preset**: Other
4. **Root Directory**: Leave as `.` (root)
5. **Build Command**: `cd client && npm install && npm run build`
6. **Output Directory**: `client/dist`
7. **Install Command**: `cd client && npm install && cd ../server && npm install`

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### 3. Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
MONGO_URI=mongodb+srv://wajeeh:pulsewatches@cluster0.drx1hgs.mongodb.net/?appName=Cluster0
JWT_SECRET=mySuperSecretKey123
CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

**After first deployment**, update:
```
VITE_API_URL=https://your-app-name.vercel.app/api
CLIENT_URL=https://your-app-name.vercel.app
```

Then redeploy!

### 4. MongoDB Atlas Whitelist

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow from anywhere)
   - Or add Vercel's IP ranges if you want more security

### 5. Test Your Deployment

Visit: `https://your-app-name.vercel.app`
- Homepage should load
- API health: `https://your-app-name.vercel.app/api/health`
- Products: `https://your-app-name.vercel.app/api/products`

## 📁 Files Created

✅ `vercel.json` - Vercel configuration
✅ `api/index.js` - Serverless function wrapper
✅ `.vercelignore` - Files to exclude
✅ `package.json` - Root package.json with scripts

## 🔧 Troubleshooting

**API returns 404?**
- Check `vercel.json` routes are correct
- Verify `api/index.js` exists
- Check function logs in Vercel dashboard

**MongoDB connection fails?**
- Verify `MONGO_URI` in environment variables
- Check MongoDB Atlas IP whitelist
- Check function logs for connection errors

**Client can't fetch data?**
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure API base URL includes `/api`

## 🎉 You're Done!

After deployment, your app will be live at:
- Frontend: `https://your-app-name.vercel.app`
- API: `https://your-app-name.vercel.app/api/*`

For detailed instructions, see `VERCEL_DEPLOYMENT.md`


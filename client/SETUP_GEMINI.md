# 🔑 Setting Up Gemini API for Natural Responses

Your PharmAI system is currently using fallback responses because the Gemini API key is missing. Here's how to get natural, conversational responses:

## 🚀 Quick Setup (2 minutes)

### Step 1: Get a FREE Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### Step 2: Add to Your Project
Create a file called `.env.local` in the `client/` folder:

```bash
cd client
touch .env.local
```

Add this line to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied.

### Step 3: Restart Your Server
```bash
npm run dev
```

## ✅ Test It Works

Try asking:
- "Tell me about benzodiazepines"
- "Can I take ibuprofen with aspirin?"
- "What are some other medicines for pain?"

You should now get natural, conversational responses like:

> "Oh, great question about NSAIDs! So you're wondering about taking ibuprofen and aspirin together. Here's the thing - while they're both NSAIDs that work similarly, taking them together actually isn't the best idea..."

## 🆓 Free Usage

- **Free tier**: 15 requests per minute, 1500 requests per day
- **Perfect for development and testing**
- **No credit card required**

## 🔧 Without Gemini API

If you prefer not to use the API, the system will still work with enhanced fallback responses that include real drug information - they'll just be less conversational.

---

**Need help?** The system will tell you if the API key is working in the browser console. 
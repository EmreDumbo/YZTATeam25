#!/bin/bash

echo "🚀 PharmAI Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root"
    exit 1
fi

# Function to deploy to Vercel
deploy_vercel() {
    echo "📦 Deploying Frontend to Vercel..."
    cd client
    vercel --prod
    cd ..
}

# Function to deploy to Railway
deploy_railway() {
    echo "🚂 Deploying Backend to Railway..."
    cd server
    railway up
    cd ..
}

# Function to deploy with Docker
deploy_docker() {
    echo "🐳 Building and deploying with Docker..."
    
    # Build frontend
    cd client
    npm run build
    cd ..
    
    # Build backend
    cd server
    docker build -t pharmai-backend .
    cd ..
    
    echo "✅ Docker images built successfully!"
    echo "To run locally: docker run -p 4000:4000 pharmai-backend"
}

# Function to deploy to Heroku
deploy_heroku() {
    echo "🦸 Deploying to Heroku..."
    
    # Create Heroku app if it doesn't exist
    heroku create pharmai-app --buildpack heroku/nodejs
    
    # Add Python buildpack for drug API
    heroku buildpacks:add heroku/python
    
    # Deploy
    git push heroku main
}

# Main menu
echo "Choose deployment option:"
echo "1. Deploy Frontend to Vercel"
echo "2. Deploy Backend to Railway"
echo "3. Deploy with Docker"
echo "4. Deploy to Heroku"
echo "5. Deploy All (Vercel + Railway)"
echo "6. Exit"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        deploy_vercel
        ;;
    2)
        deploy_railway
        ;;
    3)
        deploy_docker
        ;;
    4)
        deploy_heroku
        ;;
    5)
        deploy_vercel
        deploy_railway
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "✅ Deployment completed!" 
pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        CI = 'true'
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
    }

    options {
        ansiColor('xterm')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                powershell 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                powershell 'npm run lint'
            }
        }

        stage('Build Project') {
            steps {
                powershell 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy to Netlify') {
            when {
                branch 'main'
            }
            steps {
                powershell '''
                npm install -g netlify-cli
                netlify deploy --prod --dir=dist --site=$env:NETLIFY_SITE_ID --auth=$env:NETLIFY_AUTH_TOKEN
                '''
            }
        }
    }

    post {
        always {
            echo 'Build pipeline completed'
            cleanWs()
        }
        success {
            echo 'Pipeline SUCCESS - Ready for production'
        }
        failure {
            echo 'Pipeline FAILED - Check logs'
        }
    }
}
pipeline {
    agent any

    stages {

        stage('Verify Pipeline') {
            steps {
                echo 'Pipeline Started Successfully'
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Project Check') {
            steps {
                echo 'Fashion Retail Commerce Platform CI/CD Successful'
            }
        }
    }
}
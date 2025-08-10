pipeline {
  agent any
  environment {
    IMAGE_NAME = "nodejs-mysql-ci-cd"
    DOCKER_REGISTRY = "your-dockerhub-username"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch : 'master',
            credentialsId: 'github-credentials',
            url: 'https://github.com/rlmuthukumargit/nodejs-mysqlapp.git'
            }
      }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:${BUILD_NUMBER} ."
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push $DOCKER_REGISTRY/$IMAGE_NAME:${BUILD_NUMBER}"
        }
      }
    }

    stage('Approval by Manager') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          input message: 'Approve deployment?', ok: 'Approve'
        }
      }
    }

    stage('Deploy') {
      steps {
        echo "Deploying image $DOCKER_REGISTRY/$IMAGE_NAME:${BUILD_NUMBER}"
        sh "docker compose up -d"
      }
    }
  }
}


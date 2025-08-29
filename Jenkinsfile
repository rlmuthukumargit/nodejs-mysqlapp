pipeline {
  agent any

  environment {
<<<<<<< HEAD
    IMAGE_NAME = 'your-dockerhub-username/your-app'
    DOCKER_CREDENTIALS_ID = 'docker-hub-creds' // Jenkins credentials ID
    DEPLOY_SERVER = '192.168.222.128'
    DEPLOY_USER = 'your-user'
    DEPLOY_DIR = '/data/app' // where docker-compose.yml is stored
=======
    IMAGE_NAME = "nodejs-mysql-ci-cd"
    DOCKER_REGISTRY = "rlmuthukumar/nodejsdemoapp"
>>>>>>> b457c5d76a722910d9a79dac4f31638261abda2c
  }

  stages {
    stage('Checkout') {
      steps {
<<<<<<< HEAD
        checkout scm
=======
        git branch : 'master',
            credentialsId: 'github-credentials',
            url: 'https://github.com/rlmuthukumargit/nodejs-mysqlapp.git'
            }
      }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
>>>>>>> b457c5d76a722910d9a79dac4f31638261abda2c
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
          sh 'docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest'
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME:$BUILD_NUMBER
            docker push $IMAGE_NAME:latest
          '''
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sshagent(credentials: ['ssh-key-id']) {
          sh """
            ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_SERVER '
              cd $DEPLOY_DIR &&
              docker-compose pull &&
              docker-compose up -d
            '
          """
        }
      }
    }
  }
<<<<<<< HEAD
}
=======
}


>>>>>>> b457c5d76a722910d9a79dac4f31638261abda2c

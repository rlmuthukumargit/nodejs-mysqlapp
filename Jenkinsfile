pipeline {
  agent {
    	node {
    	label  "master"
    	}
      }


  environment {
    IMAGE_NAME = "nodejs-mysql-ci-cd"
    DOCKER_REGISTRY = "rlmuthukumar/nodejsdemoapp"
  }

  stages {
    stage('Checkout') {
      steps {
	dir('/home/devops/nodeapp'{
        checkout scm
        git branch : 'master',
            credentialsId: 'github-credentials',
            url: 'https://github.com/rlmuthukumargit/nodejs-mysqlapp.git'
            }
        }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh 'sudo docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
          sh 'sudo docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest'
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
}

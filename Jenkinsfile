pipeline {
  agent {
    	node {
    	label  "master"
    	    }
      }

  environment {
    IMAGE_NAME = "nodejs-mysql-ci-cd"
    DOCKER_REGISTRY = "rlmuthukumar/nodejs-mysql-ci-cd"
    IMAGE_TAG = "$BUILD_NUMBER"
  }

  stages {
    stage('Checkout') {
      steps {
	dir('/home/devops/nodeapp') {
        checkout scm
        git branch : 'master',
            credentialsId: 'github-credentials',
            url: 'https://github.com/rlmuthukumargit/nodejs-mysqlapp.git'
            }
        }
    }
  
    stage('Build Docker Image') {
      steps {
	dir('/home/devops/nodeapp/app') {
        script {
          sh 'sudo docker build -t $IMAGE_NAME:$IMAGE_TAG .'
          sh 'sudo docker tag $IMAGE_NAME:$IMAGE_TAG rlmuthukumar/$IMAGE_NAME:$IMAGE_TAG'
        }
      }
    }
    } 
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "docker-hub-creds", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            sudo docker push rlmuthukumar/$IMAGE_NAME:$IMAGE_TAG
          '''
        }
      }
   }

   stage('Update Image Tag') {
    steps {
        sh """
            cd /home/devops/nodeapp/
            sed -i 's|rlmuthukumar/nodejs-mysql-ci-cd:.*|rlmuthukumar/nodejs-mysql-ci-cd:${IMAGE_TAG}|' docker-compose.yml
        """
          }
      }

    stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh """
                        cd /home/devops/nodeapp/   # path where docker-compose.yml exists
                        sudo docker compose up -d --force-recreate
                    """
        }
      }
    }
  }
 }



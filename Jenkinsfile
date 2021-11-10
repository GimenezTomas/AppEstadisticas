pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
 
   stages {
      
      stage('Install App Dependencies') {
      steps {
         sh 'npm install'
      }
   }
      
     stage('Add Android Platform') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova platform add android@9 --verbose'
        }
     }
   }
      
     stage('Remove whitelist') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova plugin rm cordova-plugin-whitelist'
        }
     }
   }
      
     stage('Build Android APK') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova build android'
        }
     }
   }
      
      stage('Remove Android Platform'){
      steps {
         dir('./appEstadisticas/') {
         sh 'ionic cordova platform rm android'
         }  
       }
     }
       
  }
}

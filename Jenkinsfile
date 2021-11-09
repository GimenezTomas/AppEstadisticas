pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
 
   stages {
      
      stage('Install app dependencies') {
      steps {
         sh 'npm install'
      }
   }
      
     stage('Android Remove'){
        steps {
          dir('./appEstadisticas/') {
          sh 'ionic cordova platform rm'
          }  
        }
      }
     stage('Android Add') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova platform add android@9 --verbose'
        }
     }
   }
      
     stage('remove whitelist') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova plugin rm cordova-plugin-whitelist'
        }
     }
   }
      
     stage('Android Build') {
     steps {
        dir('./appEstadisticas/') {
        sh 'ionic cordova build android'
        }
     }
   }
       
  }
}

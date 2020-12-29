pipeline {
    agent {
        node {
            label 'master'
        }
    }
    
    environment {
        NVM_NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node/'
        NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node/'
        PATH = "${env.PATH}:${env.HOME}/.nvm/versions/node/v8.11.1/bin:/usr/local/bin"
        SKIP_BUNDLING = true
        DINGDING_ROBOT_URL = 'https://oapi.dingtalk.com/robot/send?access_token=0f4b945c05dd436200cd094ab8cdc03c03233568f7669b4a662db19c4d711491'
    }    
  
    stages {
        stage('拉取最新代码'){
             parallel {
                stage('拉取RN代码'){
                    steps {
                        checkout([$class: 'GitSCM', 
                            branches: [[name: '$RN_BRANCH']], 
                            doGenerateSubmoduleConfigurations: false, 
                            extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'RN']], 
                            submoduleCfg: [],
                            userRemoteConfigs: [[credentialsId: '1', url: 'https://gitlab.casstime.net/wholion-fe/lionet-merchant-app.git']]])
                        }
                }
                stage('拉取Native代码'){
                    steps {
                        checkout([$class: 'GitSCM', 
                            branches: [[name: '$NATIVE_BRANCH']], 
                            doGenerateSubmoduleConfigurations: false, 
                            extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'Native']], 
                            submoduleCfg: [],
                            userRemoteConfigs: [[credentialsId: '1', url: 'https://gitlab.casstime.net/wholion-fe/lionetformerchant.git']]])
                    }
                }
            }
        }
        stage('打包'){     
            stages{
                stage('打包RN') {
                    steps {
                        sh "chmod 777 ./Native/lionet-merchant/package_rn.sh"
                        sh "./Native/lionet-merchant/package_rn.sh ${env.ENVIRONMENT}"
                    }
                }
                stage('导出ipa') {
                    steps {
                        script {
                            sh "chmod 777 ./Native/lionet-merchant/package_ipa.sh"
                            sh "./Native/lionet-merchant/package_ipa.sh ${env.ENVIRONMENT}"
                            createPackageName()
                            echo env.PACKAGE_NAME_TEST;
                            echo env.PACKAGE_NAME_APPSTORE;
                            sh "chmod 777 Package/LionetForMechant/小狮快送.ipa"
                            sh "cp Package/LionetForMechant/小狮快送.ipa Package/LionetForMechant/${env.PACKAGE_NAME_TEST}"
                            def isDistributionIpaExist = fileExists './Package/Distribution/小狮快送.ipa'
                            if(isDistributionIpaExist) {
                                sh "chmod 777 Package/Distribution/小狮快送.ipa"
                                sh "cp Package/Distribution/小狮快送.ipa Package/Distribution/${env.PACKAGE_NAME_APPSTORE}"
                            }
                            createSourceMapName()
                            echo env.MAP_NAME
                            sh "rm -rf ./Package/sourcemap/ && mkdir -p ./Package/sourcemap/ios/${env.ENVIRONMENT}"
                            def isExist = fileExists './main.sourcemap'
                            if(isExist) {
                                sh "chmod 777 main.sourcemap"
                                sh "cp main.sourcemap Package/sourcemap/ios/${env.ENVIRONMENT}/${env.MAP_NAME}"
                            }
                        }
                    }
                }
                stage('归档成品') {
                    steps {
                        archiveArtifacts allowEmptyArchive: true, artifacts: "Package/LionetForMechant/${env.PACKAGE_NAME_TEST}"
                        archiveArtifacts allowEmptyArchive: true, artifacts: "Package/sourcemap/ios/${env.ENVIRONMENT}/*"
                        script {
                            if (env.ENVIRONMENT == 'production') {
                                archiveArtifacts allowEmptyArchive: true, artifacts: "Package/Distribution/${env.PACKAGE_NAME_APPSTORE}"
                            }
                        }
                    }
                }
                stage('上传蒲公英') {
                    steps {
                        script {
                            if(env.UPLOAD_PGY == 'true') {
                                // curl -F 'file=@/tmp/example.ipa' -F '_api_key=fe3defebb6e504e8bb142ac18672f27c' https://www.pgyer.com/apiv2/app/upload
                                sh 'curl -F "file=@./Package/LionetForMechant/小狮快送.ipa" \
                                    -F "_api_key=fe3defebb6e504e8bb142ac18672f27c" \
                                    -F "buildInstallType=1" \
                                    http://www.pgyer.com/apiv2/app/upload \
                                    -o ./pgy.json'
                            } else {
                                echo '不上传'
                            } 
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo 'success'
                def rawmsg = successNotifyData()
                sh "curl -H 'Content-Type:application/json' -X POST --data '${rawmsg}' ${env.DINGDING_ROBOT_URL}"
            }
        }

        failure {
            script {
                echo 'fail'
                def rawmsg = failNotifyData()
                sh "curl -H 'Content-Type:application/json' -X POST --data '${rawmsg}' ${env.DINGDING_ROBOT_URL}"
            }
        }
    }
}


def failNotifyData() {
  def title = "小狮快送-iOS-${env.BUILD_VERSION}-${env.ENVIRONMENT} 构建失败[${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### 摘要 > buildUrl: ${env.BUILD_URL} \n > [点击查看](${env.BUILD_URL}console)"
  return buildJSON(title, markdown)
}

def successNotifyData() {
  def url = "${env.BUILD_URL}/Package/LionetForMechant/小狮快送.ipa";
  def title = "小狮快送-iOS-${env.BUILD_VERSION}-${env.ENVIRONMENT} 构建成功 [${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### 构建结果: \n描述: ${DESCRIPTION}\n * [小狮快送.ipa](${url}) \n > buildUrl: ${env.BUILD_URL} \n"
  if(env.UPLOAD_PGY == 'true') {
    def downloadUrl = createPGYDownloadURL()
    def qrUrl = createPGYQRURL()
    markdown = "### ${title}\n #### 构建结果: \n描述: ${DESCRIPTION}\n * [小狮快送.ipa](${url}) \n * buildUrl: ${env.BUILD_URL} \n * pgyUrl: ${downloadUrl}\n ![alt](${qrUrl})"
  }

  return buildJSON(title, markdown)
}

def buildJSON(title, markdown) {
  return """
  {
    "msgtype": "markdown",
    "markdown": {
      "title":"${title}",
      "text":"${markdown}"
    }
  }
  """
}

def createPGYDownloadURL() {
  def buildShortcutUrl = sh(returnStdout: true, script: 'cat pgy.json | jq -r ".data.buildShortcutUrl"')
  echo buildShortcutUrl
  def downloadUrl = "http://www.pgyer.com/${buildShortcutUrl}"
  echo downloadUrl
  return downloadUrl
}

def createPGYQRURL() {
  def buildQRCodeURL = sh(returnStdout: true, script: 'cat pgy.json | jq -r ".data.buildQRCodeURL"')
  echo buildQRCodeURL
  return buildQRCodeURL
}

def createPackageName() {
  def appFlag = '小狮快送'

  // 环境标识
  def envFlagMap = [
    'alpha': 'A',
    'beta': 'B',
    'gamma': 'G',
    'production': 'P'
  ]
  def envFlag = envFlagMap.get(env.ENVIRONMENT)
  
  // 版本号
  // def appVersion = '2.0.1'
  pwd
  def appVersion = sh(returnStdout: true, script: '/usr/libexec/PlistBuddy -c "print CFBundleShortVersionString" "./Native/lionet-merchant/LionetForMechant/SupportFiles/Info.plist"').trim()

  // 构建时间，注意时区
  def buildTime = new Date().format('yyyy-MM-dd_HH_mm', TimeZone.getTimeZone('GMT+8:00'));

  // 上架标识，ios production distribution包才设置成U
  // def uploadFlag = 'T'
  // if (environment == 'production') {
  //   uploadFlag = 'U'
  // }

  // 文件后缀
  def subfix = "ipa"
  
  def devPackageName = "${appFlag}_${envFlag}${appVersion}_${buildTime}_T.${subfix}"
  env.PACKAGE_NAME_TEST = devPackageName
  def distributionPackageName = "${appFlag}_${envFlag}${appVersion}_${buildTime}_U.${subfix}"
  env.PACKAGE_NAME_APPSTORE = distributionPackageName
  env.BUILD_VERSION = appVersion

  return;
}

def checkShouldUploadSourceMap () {
  def uploadFlag = 0;
  if (env.ENVIRONMENT == 'production') {
    uploadFlag = 1;
  }

  return uploadFlag;
}

def createSourceMapName () {
  // 版本号
  // def appVersion = '2.0.1'
  def appVersion = sh(returnStdout: true, script: '/usr/libexec/PlistBuddy -c "print CFBundleShortVersionString" "./Native/lionet-merchant/LionetForMechant/SupportFiles/Info.plist"').trim()
  def buildNumber = sh(returnStdout: true, script: '/usr/libexec/PlistBuddy -c "print CFBundleVersion" "./Native/lionet-merchant/LionetForMechant/SupportFiles/Info.plist"').trim()
  def mapName = "ios_n_v${appVersion}_${buildNumber}.sourcemap"
  env.MAP_NAME = mapName;
  return mapName;
}

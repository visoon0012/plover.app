# 项目简介

    Plover app for Android and IOS
    采用 IONIC3 + Cordova

## 启动项目

    ionic serve --address 0.0.0.0 --port 8101 --livereload-port 35730 --dev-logger-port 53704 --no-open

## build

    ionic cordova build android --prod --release

## 签名

    jarsigner -verbose -keystore android.keystore -signedjar platforms/android/app/build/outputs/apk/release/plover.apk platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  android.keystore

    其他：plovercloud
    密码：plovercloud.com

## 生成新的页面/指令等

    ionic generate pipes, components, pages, directives, providers, and tabs
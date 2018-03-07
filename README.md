# 项目简介

    Plover app for Android and IOS
    采用 IONIC3 + Cordova
    是plover.cloud的前端应用
    目前提供 豆瓣电影信息预览与关联资源下载、资源搜索、唤起后台爬虫

## 项目准备

### 安装环境

    在项目目录中执行：
    npm install -g ionic cordova
    npm install

## 启动项目

    ionic serve

## build

    ionic cordova build android --prod --release

## 签名

    jarsigner -verbose -keystore plovercloud.keystore -signedjar platforms/android/app/build/outputs/apk/release/plover.apk platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  plovercloud.keystore

    其他：plovercloud
    密码：plovercloud.com

## 生成新的页面/指令等

    ionic generate pipes, components, pages, directives, providers, and tabs

# 学校项目提交说明

## 项目信息

- 项目中文名：创作者多平台发布助手
- 项目英文名：Creator Publish Assistant
- 选题：题目二：多平台内容发布工具
- GitHub 仓库链接：https://github.com/17shawww/creator-publish-assistant
- GitHub Pages 在线演示链接：https://17shawww.github.io/creator-publish-assistant/
- Demo 视频链接：请在提交前替换为实际 Demo 视频链接

## 项目简介

本项目是一个中文 MVP Web App，面向需要在多个内容平台发布作品的创作者。用户输入一篇原始内容后，可以选择微信公众号、小红书、B站、知乎中的一个或多个平台，系统会根据平台规则生成适配后的标题、正文、标签和元数据，并支持预览和模拟发布。

项目不接入真实微信公众号、小红书、B站或知乎 API，不进行真实发布。模拟发布结果会保存到浏览器 LocalStorage 的发布历史中。

## 核心功能

- 输入原始内容并查看字数统计、预计阅读时间和内容长度等级。
- 多选微信公众号、小红书、B站、知乎四个平台。
- 支持填入示例内容、清空内容、全选平台和取消全选平台。
- 根据不同平台规则生成平台专属标题、正文、标签和元数据。
- 使用分组式平台预览卡片展示适配评分、内容摘要、正文、标签、预览字数和预计阅读时间。
- 点击“模拟发布”后显示 Toast 成功反馈，并保存到本地发布历史。
- 支持更完整的发布历史展示，默认显示摘要、时间、平台数量和平均评分，可展开查看平台明细。
- 桌面端采用左右分栏工作台布局，移动端自动切换为单列布局。
- 使用轻量交互动效优化页面载入、平台选择、预览切换、评分条和按钮状态。

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage
- GitHub Pages
- GitHub Actions

## 架构说明

项目使用平台适配器模式。每个平台都有独立的适配器逻辑，包括平台 id、名称、说明、图标、标题生成函数、正文转换函数、元数据生成函数和适配评分函数。

这种结构便于后续扩展新平台。例如需要增加抖音、微博或快手时，只需要新增对应平台适配器，并在适配器入口文件中注册即可。

## 本地运行方式

```bash
npm install
npm run dev
```

本地开发地址：

```text
http://127.0.0.1:5173/creator-publish-assistant/
```

## 构建方式

```bash
npm run build
```

## 部署方式

项目已配置 GitHub Pages 自动部署 workflow。推送到 `main` 分支后，GitHub Actions 会自动运行构建并部署 `dist` 目录。

如果在线演示链接暂时无法打开，请等待 1-3 分钟后刷新，或检查仓库设置：

```text
Settings → Pages → Build and deployment → Source 选择 GitHub Actions
```

## 学校提交表单建议

第 16 题建议填写：

```text
https://github.com/17shawww/creator-publish-assistant
```

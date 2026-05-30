# 创作者多平台发布助手

一个基于 React、TypeScript、Vite 和 Tailwind CSS 的中文 MVP Web App。用户输入一篇原始内容后，可以选择微信公众号、小红书、B站、知乎等平台，系统会通过本地规则适配不同平台的标题、正文、标签与元数据，并支持将模拟发布结果保存到浏览器 LocalStorage 历史记录中。

## 项目链接

- GitHub 仓库链接：https://github.com/17shawww/creator-publish-assistant
- GitHub Pages 在线演示链接：https://17shawww.github.io/creator-publish-assistant/

## 功能亮点

- 原始内容输入、字数统计和预计阅读时间
- 多平台选择与平台专属预览
- 平台适配器模式，便于后续扩展抖音、微博、快手等平台
- 模拟发布，不调用任何真实平台 API
- LocalStorage 发布历史记录与清空功能
- 响应式中文 SaaS 风格界面

## 本地运行

```bash
npm install
npm run dev
```

本地开发默认地址为：

```text
http://127.0.0.1:5173/creator-publish-assistant/
```

## 构建

```bash
npm run build
```

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage

## 部署说明

项目已配置 GitHub Pages 自动部署 workflow。代码推送到 `main` 分支后，GitHub Actions 会自动安装依赖、运行构建，并将 `dist` 目录部署到 GitHub Pages。

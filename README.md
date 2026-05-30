# 创作者多平台发布助手

一个基于 React、TypeScript、Vite 和 Tailwind CSS 的中文 MVP Web App。用户输入一篇原始内容后，可以选择微信公众号、小红书、B站、知乎等平台，系统会通过本地规则适配不同平台的标题、正文、标签与元数据，并支持将模拟发布结果保存到浏览器 LocalStorage 历史记录中。

## 项目链接

- GitHub 仓库链接：https://github.com/17shawww/creator-publish-assistant
- GitHub Pages 在线演示链接：https://17shawww.github.io/creator-publish-assistant/

## 功能亮点

- 原始内容输入、字数统计和预计阅读时间
- 响应式工作台布局，桌面端左右分栏、移动端单列适配
- 多平台选择与平台专属预览，支持全选 / 取消全选平台
- 更清晰的平台预览卡片，分组展示标题、摘要、正文、标签、元数据和评分
- 平台适配器模式，便于后续扩展抖音、微博、快手等平台
- 模拟发布，不调用任何真实平台 API
- Toast 成功反馈，发布后保留当前输入内容
- LocalStorage 发布历史记录、折叠明细展示与清空确认
- 轻量交互动效，包括页面载入、平台选择、预览切换、评分条和按钮状态过渡
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

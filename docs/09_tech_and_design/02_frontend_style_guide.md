> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 前端 UI 设计规范

本规范旨在为 AutoPPT Agent 的 Web 用户界面（UI）定义一套统一、专业、富有现代感的设计语言。所有前端开发都必须严格遵守此规范，以确保品牌一致性和卓越的用户体验。

## 1. 设计理念

- **简洁 (Minimalism)**: 界面应保持简洁，避免不必要的装饰和视觉噪音。让用户专注于核心任务——创建演示文稿。
- **直观 (Intuitive)**: 交互流程应符合用户直觉，无需学习即可轻松上手。
- **高效 (Efficient)**: 设计应服务于效率，帮助用户快速完成从输入主题到下载演示文稿的全过程。
- **专业 (Professional)**: 视觉风格应体现出专业感和信赖感，符合商业和学术用户的审美标准。

## 2. 色彩系统 (Color Palette)

我们将采用一种以蓝色为主色调，搭配中性灰和功能色的色彩方案。

| 颜色 | Hex | Tailwind CSS 类名 | 用途 |
| :--- | :--- | :--- | :--- |
| **主色 (Primary)** | `#3B82F6` | `bg-blue-500`, `text-blue-500` | 主要按钮、链接、图标、高亮状态 |
| 主色 (Hover) | `#2563EB` | `hover:bg-blue-600` | 主色悬停状态 |
| **背景 (Background)** | `#F9FAFB` | `bg-gray-50` | 页面主背景色 |
| **卡片/面板 (Surface)** | `#FFFFFF` | `bg-white` | 卡片、输入框、模态框等容器背景 |
| **边框 (Border)** | `#E5E7EB` | `border-gray-200` | 分割线、输入框边框 |
| **主文本 (Text Primary)** | `#111827` | `text-gray-900` | 标题、正文等主要文字 |
| **次要文本 (Text Secondary)**| `#6B7280` | `text-gray-500` | 辅助性文字、提示信息、占位符文本 |
| **成功 (Success)** | `#10B981` | `bg-green-500`, `text-green-500` | 成功提示、完成状态 |
| **警告 (Warning)** | `#F59E0B` | `bg-amber-500`, `text-amber-500` | 警告信息、需要用户注意的状态 |
| **危险 (Danger)** | `#EF4444` | `bg-red-500`, `text-red-500` | 错误提示、删除操作 |

## 3. 字体排版 (Typography)

- **主字体**: `Inter` (一个现代、清晰的无衬线字体)，通过字体服务（如 Google Fonts）引入。
- **备用字体**: `sans-serif`

| 元素 | 字重 | 字号 (Tailwind) | 行高 (Tailwind) | 颜色 (Tailwind) |
| :--- | :--- | :--- | :--- | :--- |
| **页面大标题 (H1)** | Bold (700) | `text-3xl` (30px) | `leading-tight` | `text-gray-900` |
| **卡片标题 (H2)** | Semi-bold (600) | `text-xl` (20px) | `leading-snug` | `text-gray-900` |
| **正文 (Body)** | Regular (400) | `text-base` (16px) | `leading-relaxed` | `text-gray-800` |
| **标签/次要信息 (Label)** | Medium (500) | `text-sm` (14px) | `leading-normal` | `text-gray-500` |
| **按钮文本 (Button)** | Semi-bold (600) | `text-base` (16px) | `leading-none` | `text-white` |

## 4. 布局与间距 (Layout & Spacing)

- **基础单位**: 我们采用 `4px` 作为基础间距单位。所有间距、内外边距都应是这个单位的整数倍 (e.g., 4px, 8px, 12px, 16px)。这对应于 Tailwind CSS 的默认间距尺度。
- **页面布局**: 采用居中对齐的最大宽度布局。主内容区域的最大宽度为 `1280px` (`max-w-7xl`)。
- **网格系统**: 需要时使用 CSS Grid 或 Flexbox 进行布局。对于表单等场景，推荐使用两列或三列网格。

## 5. 组件规范 (Component Specification)

### 5.1 按钮 (Buttons)

- **主按钮 (Primary)**: `bg-blue-500 text-white`，用于最重要的操作（如“生成PPT”）。
- **次要按钮 (Secondary)**: `bg-white border border-gray-300 text-gray-700`，用于次要操作（如“取消”）。
- **通用样式**: 圆角 `rounded-lg`，内边距 `px-5 py-2.5`，带有平滑的过渡效果 `transition-colors`。

### 5.2 输入框 (Inputs)

- **样式**: `bg-white border border-gray-300 rounded-lg`，内边距 `px-4 py-3`。
- **焦点状态**: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`，提供清晰的视觉反馈。
- **标签**: 标签应放置在输入框上方，使用 `text-sm font-medium text-gray-700`。

### 5.3 卡片 (Cards)

- **样式**: `bg-white rounded-xl shadow-md`，提供清晰的层级感。
- **内边距**: `p-6` 或 `p-8`。

## 6. 交互与动效 (Interaction & Motion)

- **原则**: 动效应用于提供反馈和引导注意力，而不是为了装饰。
- **通用动效**: 所有交互元素（按钮、链接）的 `hover` 和 `focus` 状态都应有平滑的颜色或尺寸过渡 (`transition-all duration-200`)。
- **加载状态**: 对于耗时操作（如生成PPT），必须提供清晰的加载指示器（如 Spinner 或进度条），并禁用相关按钮，防止重复提交。

## 7. 页面流程示例

1.  **主页**: 一个简洁的英雄区域，包含一个大的文本输入框（用于输入主题）和一个主按钮“生成演示文稿”。
2.  **生成中页面**: 显示一个进度条或动画，实时反馈当前PPT的生成阶段（例如，“正在研究主题...”、“正在生成页面内容...”）。下方可以提供一个“取消”按钮。
3.  **结果页面**: 显示生成的PPT的预览（可以是封面图），提供一个醒目的“下载 .pptx 文件”按钮，并可能附带一个“重新生成”或“返回首页”的选项。

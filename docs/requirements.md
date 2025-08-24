# 前端化重构 - Requirements Document

将MagicMaker项目从依赖后端API的架构改造为纯前端架构，重新设计数据结构，实现前端文件解析和处理能力

## Core Features

### 1. 数据架构重构
- 重新设计Resource和Track数据结构，建立清晰的继承关系
- 统一资源管理，消除upload和generated的重复存储
- 实现Track对Resource的引用关系，避免数据冗余

### 2. 前端文件解析能力
- 实现前端视频文件元信息解析（宽高、时长、格式等）
- 实现前端音频文件元信息解析（时长、格式等）
- 实现前端图片文件元信息解析（宽高、格式等）
- 提供统一的文件解析工具函数

### 3. API调用移除
- 移除所有后端API调用（32个文件涉及）
- 改造上传逻辑为纯前端处理
- 将数据存储完全依赖本地Store
- 保持现有功能不变的前提下去除服务端依赖

## User Stories

### 开发者故事
- 作为开发者，我希望项目可以纯前端部署，这样可以降低部署复杂度和成本
- 作为开发者，我希望数据结构清晰统一，这样可以减少维护成本和bug
- 作为开发者，我希望文件处理逻辑在前端完成，这样可以提升用户体验

### 用户故事
- 作为用户，我希望上传文件后立即获得反馈，而不需要等待服务器处理
- 作为用户，我希望在离线环境下也能使用基本的编辑功能
- 作为用户，我希望我的数据完全本地化，不依赖外部服务

## Acceptance Criteria

### 数据结构重构
- [ ] 定义新的BaseResource、AudioResource、VideoResource、ImageResource、TextResource接口
- [ ] 定义新的BaseTrack和各类型Track接口，建立与Resource的引用关系
- [ ] 保证新接口向后兼容现有组件使用

### 前端文件解析
- [ ] 实现getVideoMetaInfo函数，支持获取视频宽高、时长
- [ ] 实现getAudioMetaInfo函数，支持获取音频时长
- [ ] 实现getImageMetaInfo函数，支持获取图片宽高
- [ ] 所有解析函数支持常见格式（mp4、mp3、jpg、png等）

### API移除和Store重构
- [ ] 移除resourceState.ts中的所有API调用（delRecord等）
- [ ] 移除projectState.ts中的API调用（getProjectInfo、updateProject等）
- [ ] 重构UploadContainer.vue使用前端解析替代uploadMaterial API
- [ ] 统一resourceState中的upload和generated资源管理逻辑

### 组件兼容性
- [ ] 所有现有组件无需修改接口调用方式
- [ ] 编辑器、播放器等核心功能正常工作
- [ ] 项目保存和加载功能正常工作

## Non-functional Requirements

### 性能要求
- 文件解析响应时间 < 1s（对于100MB以内的文件）
- 内存使用优化，避免大文件导致页面崩溃
- 保持现有播放器性能不下降

### 兼容性要求
- 支持Chrome 90+、Firefox 88+、Safari 14+
- 支持常见文件格式：mp4、webm、mp3、wav、jpg、png、gif
- 向后兼容现有项目数据格式

### 安全要求
- 文件处理完全在客户端完成，无数据泄露风险
- 文件解析使用Web标准API，避免安全漏洞
- 本地存储数据使用Pinia持久化，保证数据安全

### 可维护性要求
- 代码结构清晰，类型定义完整
- 提供完整的工具函数和类型声明
- 保持现有代码风格和架构模式

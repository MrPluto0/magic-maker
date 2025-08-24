# 前端化重构 - Design Document

## Overview

本设计采用渐进式重构策略，通过三个阶段完成从后端依赖到纯前端的架构转换：
1. **数据层重构** - 重新设计类型定义和数据关系
2. **功能层替换** - 前端文件解析替代API调用
3. **接口层兼容** - 保持组件接口不变，确保平滑迁移

设计原则遵循Linus的"好品味"哲学：
- 简化数据结构，消除特殊情况
- 使用最直接的Web标准API
- 确保零破坏性，向后兼容

## Architecture

### 整体架构图
```
┌─────────────────────────────────────────┐
│                Components               │
│  UploadContainer │ ResourceList │ ...   │
├─────────────────────────────────────────┤
│              Stores (Pinia)             │
│  ResourceState │ ProjectState │ ...     │
├─────────────────────────────────────────┤
│              Utils Layer                │
│  FileParser │ ResourceFactory │ ...     │
├─────────────────────────────────────────┤
│              Data Layer                 │
│  Resource Types │ Track Types │ ...     │
└─────────────────────────────────────────┘
```

### 关键架构决策

#### 1. 数据架构重构
- **Resource作为数据源**：存储文件的元信息和URL
- **Track作为使用实例**：通过resourceId引用Resource，存储轨道特定属性
- **统一资源管理**：消除upload/generated双重存储

#### 2. 前端解析引擎
```typescript
// 核心解析接口
interface FileParser {
  parseVideo(file: File): Promise<VideoMetaInfo>
  parseAudio(file: File): Promise<AudioMetaInfo>
  parseImage(file: File): Promise<ImageMetaInfo>
}
```

#### 3. 兼容性桥接
- 保持现有组件接口不变
- 在utils层提供兼容性转换函数
- 渐进式替换，不影响现有功能

## Components and Interfaces

### 1. 文件解析工具 (`src/utils/fileParser.ts`)

```typescript
export class FileParser {
  // 视频元信息解析
  static async parseVideo(file: File): Promise<VideoMetaInfo> {
    const video = document.createElement('video')
    video.muted = true
    const url = URL.createObjectURL(file)
    video.src = url

    return new Promise((resolve, reject) => {
      video.addEventListener('loadedmetadata', () => {
        URL.revokeObjectURL(url)
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          format: file.type
        })
      })
      video.addEventListener('error', reject)
    })
  }

  // 音频元信息解析
  static async parseAudio(file: File): Promise<AudioMetaInfo>

  // 图片元信息解析
  static async parseImage(file: File): Promise<ImageMetaInfo>
}
```

### 2. 资源工厂 (`src/utils/resourceFactory.ts`)

```typescript
export class ResourceFactory {
  // 从文件创建资源对象
  static async createFromFile(file: File): Promise<Resource> {
    const id = nanoid()
    const baseResource = {
      id,
      name: file.name,
      createdAt: new Date().toISOString(),
      file
    }

    if (file.type.startsWith('video/')) {
      const metaInfo = await FileParser.parseVideo(file)
      return {
        ...baseResource,
        type: 'video',
        url: URL.createObjectURL(file),
        format: file.type,
        ...metaInfo
      } as VideoResource
    }
    // ... 其他类型处理
  }
}
```

### 3. Store重构 (`src/stores/resourceState.ts`)

```typescript
export const useResourceState = defineStore("resource", () => {
  // 统一资源列表（移除upload/generated分离）
  const resources = ref<Resource[]>([])

  // 添加资源（替代API调用）
  const addResource = async (file: File): Promise<Resource> => {
    const resource = await ResourceFactory.createFromFile(file)
    resources.value.push(resource)
    return resource
  }

  // 移除资源（纯本地操作）
  const removeResource = (id: string) => {
    const index = resources.value.findIndex(r => r.id === id)
    if (index > -1) {
      resources.value.splice(index, 1)
    }
  }

  // 按类型获取资源
  const getResourcesByType = (type: Resource['type']) => {
    return computed(() => resources.value.filter(r => r.type === type))
  }
})
```

## Data Models

### 资源数据模型

```typescript
// 基础资源接口
interface BaseResource {
  id: string
  name: string
  type: 'audio' | 'image' | 'video' | 'text'
  createdAt: string
  file?: File
}

// 具体资源类型
interface VideoResource extends BaseResource {
  type: 'video'
  url: string
  format: string
  duration: number
  width: number
  height: number
  cover?: string
}

interface AudioResource extends BaseResource {
  type: 'audio'
  url: string
  format: string
  duration: number
}

interface ImageResource extends BaseResource {
  type: 'image'
  url: string
  format: string
  width: number
  height: number
}

interface TextResource extends BaseResource {
  type: 'text'
  content: string
  role?: 'user' | 'system'
}
```

### 轨道数据模型

```typescript
// 基础轨道接口
interface BaseTrack {
  id: string
  resourceId: string // 引用Resource ID
  start: number
  end: number
  frameCount: number
}

// 具体轨道类型
interface VideoTrack extends BaseTrack {
  type: 'video'
  // 轨道特定属性
  transform: TransformConfig
  opacity: number
}

interface AudioTrack extends BaseTrack {
  type: 'audio'
  volume: number
  mute: boolean
  subtitle?: SubtitleConfig
}
```

### 数据迁移策略

```typescript
// 兼容性适配器
export class DataMigration {
  // 将旧Resource格式转换为新格式
  static migrateOldResource(oldResource: OldResource): Resource {
    return {
      id: oldResource.id,
      name: oldResource.name,
      type: oldResource.type as Resource['type'],
      createdAt: new Date().toISOString(),
      url: oldResource.url,
      format: oldResource.format,
      duration: oldResource.duration,
      width: oldResource.width,
      height: oldResource.height
    } as VideoResource
  }
}
```

## Error Handling

### 文件解析错误处理

```typescript
export class FileParseError extends Error {
  constructor(
    message: string,
    public fileType: string,
    public fileName: string
  ) {
    super(message)
    this.name = 'FileParseError'
  }
}

// 统一错误处理
export const handleFileParseError = (error: unknown, file: File) => {
  if (error instanceof FileParseError) {
    ElMessage.error(`文件解析失败: ${error.message}`)
  } else {
    ElMessage.error(`不支持的文件格式: ${file.name}`)
  }
  console.error('File parse error:', error)
}
```

### 兼容性错误处理

- **格式不支持**：提供友好的错误提示和格式建议
- **文件过大**：实现文件大小检查和内存优化
- **浏览器兼容**：检测API支持情况，提供降级方案

## Testing Strategy

### 单元测试重点

1. **文件解析器测试**
   ```typescript
   describe('FileParser', () => {
     it('should parse video metadata correctly', async () => {
       const mockFile = new File([''], 'test.mp4', { type: 'video/mp4' })
       const result = await FileParser.parseVideo(mockFile)
       expect(result).toHaveProperty('duration')
       expect(result).toHaveProperty('width')
       expect(result).toHaveProperty('height')
     })
   })
   ```

2. **资源工厂测试**
   - 测试各种文件类型的Resource创建
   - 测试错误文件的处理

3. **Store逻辑测试**
   - 测试资源的增删改查
   - 测试数据持久化

### 集成测试策略

1. **组件集成测试**
   - UploadContainer与FileParser集成
   - ResourceList与ResourceState集成

2. **向后兼容测试**
   - 现有项目数据加载测试
   - 现有组件功能测试

### 性能测试

1. **文件解析性能**
   - 大文件解析时间测试
   - 内存使用监控

2. **Store性能**
   - 大量资源管理性能
   - 数据持久化性能

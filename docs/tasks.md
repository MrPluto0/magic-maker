# 前端化重构 - Task List

## Implementation Tasks

- [x] **阶段1: 数据结构重构** 
    - [x] 1.1. 重构资源类型定义
        - *Goal*: 创建新的Resource和Track类型定义，建立清晰的继承关系
        - *Details*: 
          - 重写 `src/types/resource.d.ts` 定义BaseResource和具体资源类型
          - 重写 `src/types/track.d.ts` 定义BaseTrack和具体轨道类型
          - 添加兼容性字段保证向后兼容
        - *Requirements*: 数据结构重构 - 定义新接口
    - [x] 1.2. 创建文件解析工具
        - *Goal*: 实现前端文件元信息解析，替代后端API
        - *Details*: 
          - 创建 `src/utils/fileParser.ts` 实现FileParser类
          - 实现parseVideo、parseAudio、parseImage方法
          - 使用HTMLVideoElement、HTMLAudioElement、HTMLImageElement解析
          - 添加错误处理和格式验证
        - *Requirements*: 前端文件解析 - 实现解析函数
    - [x] 1.3. 创建资源工厂
        - *Goal*: 实现从File对象创建Resource的工厂模式
        - *Details*: 
          - 创建 `src/utils/resourceFactory.ts` 实现ResourceFactory类
          - 实现createFromFile方法，支持所有资源类型
          - 集成FileParser进行元信息解析
          - 生成唯一ID和URL
        - *Requirements*: 数据结构重构 - 资源创建流程

- [x] **阶段2: Store层重构**
    - [x] 2.1. 重构ResourceState
        - *Goal*: 移除API调用，统一资源管理逻辑
        - *Details*: 
          - 修改 `src/stores/resourceState.ts` 移除所有API import
          - 合并upload和generated资源列表为统一的resources
          - 重写addResource使用ResourceFactory
          - 重写removeResource为纯本地操作
          - 添加getResourcesByType等辅助方法
        - *Requirements*: API移除和Store重构 - 移除resourceState API调用
    - [x] 2.2. 重构ProjectState
        - *Goal*: 移除项目相关API调用，实现纯本地项目管理
        - *Details*: 
          - 修改 `src/stores/projectState.ts` 移除getProjectInfo、updateProject等API
          - 重写saveProject为纯本地存储
          - 重写setProduct加载逻辑，使用新的Resource结构
          - 保持exportVideo功能不变
        - *Requirements*: API移除和Store重构 - 移除projectState API调用
    - [x] 2.3. 重构TrackState兼容性
        - *Goal*: 确保TrackState与新的Resource结构兼容
        - *Details*: 
          - 修改 `src/stores/trackState.ts` 中createTrack方法
          - 适配新的Resource接口
          - 确保Track创建时正确引用Resource
          - 维护现有轨道操作逻辑
        - *Requirements*: 组件兼容性 - Track与Resource关联

- [x] **阶段3: 组件层重构**
    - [x] 3.1. 重构上传组件
        - *Goal*: 改造文件上传逻辑使用前端解析
        - *Details*: 
          - 修改 `src/components/editor/resource/UploadContainer.vue`
          - 移除uploadMaterial API调用
          - 使用ResourceFactory.createFromFile处理文件
          - 添加解析进度提示和错误处理
          - 保持现有UI交互不变
        - *Requirements*: API移除和Store重构 - 重构UploadContainer
    - [x] 3.2. 更新资源列表组件
        - *Goal*: 确保资源展示组件与新数据结构兼容
        - *Details*: 
          - 检查 `src/components/editor/resource/ResourceList.vue` 数据绑定
          - 确保所有Resource字段正确显示
          - 处理可能的undefined字段
          - 维持现有列表操作功能
        - *Requirements*: 组件兼容性 - 资源展示兼容
    - [x] 3.3. 更新轨道相关组件
        - *Goal*: 确保轨道组件正确处理Resource引用
        - *Details*: 
          - 检查轨道组件中对source字段的使用
          - 确保通过resourceId正确获取Resource信息
          - 更新属性面板组件的数据绑定
          - 维持现有轨道操作功能
        - *Requirements*: 组件兼容性 - 轨道组件兼容

- [ ] **阶段4: 兼容性处理**
    - [x] 4.1. 实现数据迁移
        - *Goal*: 处理旧版本项目数据的兼容性
        - *Details*: 
          - 创建 `src/utils/dataMigration.ts` 实现DataMigration类
          - 实现migrateOldResource、migrateOldProject方法
          - 在项目加载时自动检测和转换旧数据
          - 保证无缝升级体验
        - *Requirements*: 组件兼容性 - 向后兼容
    - [x] 4.2. 错误处理和用户反馈
        - *Goal*: 完善错误处理和用户体验
        - *Details*: 
          - 创建 `src/utils/errorHandler.ts` 统一错误处理
          - 实现FileParseError自定义异常
          - 添加loading状态和进度提示
          - 完善不支持格式的友好提示
        - *Requirements*: 非功能需求 - 错误处理
    - [x] 4.3. 类型更新和清理
        - *Goal*: 更新全项目的类型引用，清理废弃代码
        - *Details*: 
          - 更新所有文件中的Resource类型引用
          - 检查并修复TypeScript编译错误
          - 移除不再使用的API接口定义
          - 更新auto-imports类型定义
        - *Requirements*: 可维护性要求 - 类型定义完整

- [ ] **阶段5: 测试和清理**
    - [x] 5.1. 功能测试验证
        - *Goal*: 验证所有功能正常工作
        - *Details*: 
          - 测试文件上传和解析功能
          - 测试资源管理（增删改查）
          - 测试轨道创建和编辑
          - 测试项目保存和加载
          - 测试视频导出功能
        - *Requirements*: 所有验收标准
    - [x] 5.2. 性能优化和监控
        - *Goal*: 确保性能符合要求
        - *Details*: 
          - 测试大文件解析性能
          - 监控内存使用情况
          - 优化文件URL管理，及时释放blob URL
          - 测试多文件并发处理
        - *Requirements*: 非功能需求 - 性能要求
    - [x] 5.3. 清理API文件
        - *Goal*: 移除不再使用的API相关文件
        - *Details*: 
          - 删除 `src/api/` 目录下不再使用的文件
          - 移除相关的API类型定义
          - 清理Vite配置中的API代理设置
          - 更新CLAUDE.md文档移除API相关描述
        - *Requirements*: API移除 - 清理废弃文件

## Task Dependencies

**串行依赖关系：**
- 阶段1必须完成后才能开始阶段2
- 阶段2完成后才能开始阶段3
- 阶段3完成后才能开始阶段4

**并行执行机会：**
- 阶段1内部：1.1完成后，1.2和1.3可并行
- 阶段2内部：2.1、2.2、2.3可并行执行
- 阶段3内部：3.1、3.2、3.3可并行执行
- 阶段4内部：4.1、4.2、4.3可并行执行
- 阶段5内部：5.1完成后，5.2和5.3可并行

**关键路径：**
1.1 → 1.2 → 2.1 → 3.1 → 4.1 → 5.1 → 5.3

## Estimated Timeline

**阶段1: 数据结构重构**
- 1.1 重构资源类型定义: 4小时
- 1.2 创建文件解析工具: 8小时
- 1.3 创建资源工厂: 4小时
- **阶段1小计: 16小时**

**阶段2: Store层重构**
- 2.1 重构ResourceState: 6小时
- 2.2 重构ProjectState: 6小时
- 2.3 重构TrackState兼容性: 4小时
- **阶段2小计: 16小时**

**阶段3: 组件层重构**
- 3.1 重构上传组件: 6小时
- 3.2 更新资源列表组件: 4小时
- 3.3 更新轨道相关组件: 6小时
- **阶段3小计: 16小时**

**阶段4: 兼容性处理**
- 4.1 实现数据迁移: 6小时
- 4.2 错误处理和用户反馈: 4小时
- 4.3 类型更新和清理: 4小时
- **阶段4小计: 14小时**

**阶段5: 测试和清理**
- 5.1 功能测试验证: 8小时
- 5.2 性能优化和监控: 4小时
- 5.3 清理API文件: 2小时
- **阶段5小计: 14小时**

**项目总计: 76小时 (约9.5工作日)**

## SOP执行建议

1. **每日standby**: 开始前检查依赖任务完成状态
2. **增量提交**: 每个子任务完成后立即commit，保证回滚能力
3. **测试优先**: 每个阶段完成后立即进行基础功能测试
4. **文档同步**: 重要变更及时更新CLAUDE.md和代码注释
5. **性能监控**: 阶段2开始后持续监控内存和性能指标

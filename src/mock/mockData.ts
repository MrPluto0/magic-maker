import { IUser } from "@/types/user";
import { TrainModel } from "@/types/model";
import { Material } from "@/types/draw";
import { Resource, TextResource } from "@/types/resource";
import { IProject } from "@/types/project";
import { Workflow } from "@/types/workflow";
import { IAuthRes } from "@/api/user";
import { IVoice } from "@/api/generate";

// 用户相关mock数据
export const mockAuthRes: IAuthRes = {
    accessToken: "mock_access_token_12345",
    tokenType: "Bearer"
};

export const mockUser: IUser = {
    id: 1,
    username: "gypsophlia",
    nickname: "走马观花",
    avatarUrl: "https://avatars.githubusercontent.com/u/54534553?s=400&u=05ae11f6517aef111a98bb14ac2a4f0158dc8edd&v=4",
    email: "710852553@qq.com",
    phone: "18912345678",
    phoneCountryCode: "+86",
    direction: "前端开发",
    profession: "软件工程师",
    introduction: "这是一个测试用户的介绍",
    createAt: "2024-01-01T00:00:00Z"
};

export const mockUserLimits = {
    textGeneration: { used: 10, total: 100 },
    imageGeneration: { used: 5, total: 50 },
    audioGeneration: { used: 2, total: 20 },
    videoGeneration: { used: 1, total: 10 }
};

// 模型相关mock数据
export const mockTrainModels: TrainModel[] = [
    {
        domain: "image",
        modelUuid: "model-uuid-001",
        modelName: "测试图像模型",
        trainParam: {
            loraName: "test_lora",
            conceptSentence: "sks person",
            imgcaptionAndId: {
                uniqueId: "unique-001",
                imgCaptionList: [
                    {
                        name: "image1.jpg",
                        caption: "a photo of sks person",
                        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/test/image1.jpg"
                    }
                ]
            },
            steps: 1000,
            lr: 0.0001,
            rank: 16,
            fluxModel: "flux-dev",
            lowVram: "false"
        }
    }
];

export const mockTrainProcess = {
    detail: "模型训练中...",
    percent: 75,
    status: "training"
};

export const mockGenByModelResult = [
    "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/image1.png",
    "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/image2.png"
];

// 素材相关mock数据
export const mockMaterials: Material[] = [
    {
        id: 1,
        category: "template_psd",
        width: 1920,
        height: 1080,
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/services/magicmaker/material/zP94c2nuVz.png",
        psdMetadata: []
    },
    {
        id: 2,
        category: "background",
        width: 1920,
        height: 1080,
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/services/magicmaker/material/zP94c2nuVz.png",
        psdMetadata: []
    }
];

export const mockCategoryList = [
    {
        records: mockMaterials.slice(0, 1),
        category: "template_psd"
    },
    {
        records: mockMaterials.slice(1, 2),
        category: "background"
    }
];

export const mockMaterialList = {
    records: mockMaterials,
    total: 2
};

export const mockProductBoard = [
    {
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/product/board1.png",
        description: "产品展示板1"
    },
    {
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/product/board2.png",
        description: "产品展示板2"
    }
];

export const mockStoryBoard = [
    {
        prompt: "全景 , 自然光 , 劳力士手表整体 , 时尚展示台 , 现代时尚氛围",
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215621_00001_.png",
        basicInfo: { width: 1920, height: 1080 }
    },
    {
        prompt: "大特写 , 柔光 , 手表表盘细节 , 简约背景 , 精致设计感",
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215650_00001_.png",
        basicInfo: { width: 1920, height: 1080 }
    }
];

// 生成相关mock数据
export const mockTextExpandResult = {
    expandedText: "这是扩展后的文本内容，包含了更多的细节和描述..."
};

export const mockTextSplitResult = [
    "这是第一个分段的文本内容。",
    "这是第二个分段的文本内容。",
    "这是第三个分段的文本内容。"
];

export const mockText2ImageResult: Resource[] = [
    {
        id: "img-001",
        name: "生成图片1",
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/text2img1.png",
        cover: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/text2img1_thumb.png",
        format: "png",
        width: 1024,
        height: 1024,
        duration: 0,
        type: "image",
        meta: {
            recordId: 1,
            prompt: "测试提示词",
            style: "realistic",
            keywords: ["测试", "AI生成"],
            sizeStr: "1024x1024",
            model: "stable-diffusion",
            len: 0,
            color: "#FF0000",
            voiceUrl: ""
        }
    }
];

export const mockText2MoodboardResult = [
    {
        id: 1,
        basicInfo: { width: 1920, height: 1080 },
        url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/moodboard/board1.png"
    }
];

export const mockText2StoryboardResult = [
    {
        scene: "开场镜头",
        description: "产品展示的开场画面"
    }
];

export const mockText2AudioResult: Resource = {
    id: "audio-001",
    name: "生成音频1",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/audio1.mp3",
    cover: "",
    format: "mp3",
    width: 0,
    height: 0,
    duration: 30,
    type: "audio",
    meta: {
        recordId: 1,
        prompt: "轻松的背景音乐",
        style: "ambient",
        keywords: ["背景音乐"],
        sizeStr: "",
        model: "musicgen",
        len: 30,
        color: "",
        voiceUrl: ""
    }
};

export const mockSpeechList: IVoice[] = [
    {
        voiceUrl: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/voices/voice1.mp3",
        voiceName: "温柔女声"
    },
    {
        voiceUrl: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/voices/voice2.mp3",
        voiceName: "磁性男声"
    }
];

export const mockText2VideoResult: Resource = {
    id: "video-001",
    name: "生成视频1",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/video1.mp4",
    cover: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/generated/video1_thumb.jpg",
    format: "mp4",
    width: 1920,
    height: 1080,
    duration: 10,
    type: "video",
    meta: {
        recordId: 1,
        prompt: "美丽的自然风景",
        style: "cinematic",
        keywords: ["自然", "风景"],
        sizeStr: "1920x1080",
        model: "cogvideox",
        len: 10,
        color: "",
        voiceUrl: ""
    }
};

export const mockAnalyzeFileResult = "这是文件分析的结果文本...";

export const mockUploadFileResult = {
    path: "/uploads/test-file.jpg",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/uploads/test-file.jpg"
};

// 记录相关mock数据
export const mockRecords = {
    total: 10,
    records: [
        {
            id: 1,
            userId: 1,
            type: "image",
            model: "stable-diffusion",
            prompt: "测试图片生成",
            promptFileUrl: "",
            url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/records/img1.png",
            textResult: "",
            size: 1024000,
            configs: "{}",
            basicInfo: { width: 1024, height: 1024 },
            createdAt: "2024-01-01T00:00:00Z"
        }
    ]
};

// 支付相关mock数据
export const mockPrepayResult = {
    codeUrl: "weixin://wxpay/bizpayurl?pr=test123",
    orderId: "order-12345"
};

export const mockGoodsPrice = [
    {
        code: "BASIC_PLAN",
        name: "基础套餐",
        price: 99
    }
];

// 工具相关mock数据
export const mockPartialDrawResult = "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/tools/partial_draw.png";
export const mockExtendImageResult = "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/tools/extend_image.png";
export const mockTransferImageResult = "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/tools/transfer_image.png";

export const mockRandomClipResult: Resource = {
    id: "clip-001",
    name: "随机剪辑结果",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/clips/random_clip.mp4",
    cover: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/clips/random_clip_thumb.jpg",
    format: "mp4",
    width: 1920,
    height: 1080,
    duration: 60,
    type: "video",
    meta: {
        recordId: 1,
        prompt: "",
        style: "",
        keywords: [],
        sizeStr: "1920x1080",
        model: "auto-clip",
        len: 60,
        color: "",
        voiceUrl: ""
    }
};

export const mockPreClipResults = [
    {
        name: "测试剪辑项目",
        batchUuid: "batch-uuid-001"
    }
];

// 工作流相关mock数据
export const mockWorkflow: Workflow = {
    workflowId: 1,
    scenes: [
        {
            startTime: "00:00:00",
            endTime: "00:00:10",
            description: "开场画面",
            basicInfo: { type: "intro" }
        },
        {
            startTime: "00:00:10",
            endTime: "00:00:20",
            description: "主要内容",
            basicInfo: { type: "main" }
        }
    ]
};

export const mockWorkflowList = {
    total: 5,
    records: [
        {
            id: 1,
            name: "工作流模板1",
            description: "这是一个测试工作流模板",
            createdAt: "2024-01-01T00:00:00Z"
        }
    ]
};

export const mockTaskInfo = {
    taskId: "task-001",
    status: "completed",
    progress: 100,
    result: "任务执行完成"
};

export const mockProject: IProject = {
    id: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    userId: 1,
    description: "测试项目描述",
    projectName: "测试项目",
    previewUrl: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/projects/preview1.jpg",
    clipParam: [],
    drawParam: [],
    analyzeUrl: "",
    analyzeResult: "",
    aiEngineModelName: "",
    aiEngineTrigger: "",
    aiEngineUploadPath: "",
    aiEngineCaptions: {},
    aiEngineChosenModel: "",
    aiEngineDescription: "",
    generateSpeechRecords: [],
    generateTextRecords: [],
    generateImageRecords: [],
    generateMusicRecords: [],
    generateVideoRecords: [],
    uploadImageRecords: [],
    uploadMusicRecords: [],
    uploadSpeechRecords: [],
    uploadVideoRecords: []
};

export const mockProjectList = {
    total: 3,
    records: [mockProject]
};

export const mockGenerateVideoResult = "task-video-001";

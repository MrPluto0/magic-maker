// Mock工具函数
export function delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomDelay(min: number = 500, max: number = 2000): Promise<void> {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return delay(ms);
}

export function mockSuccess<T>(data: T): Promise<T> {
    return randomDelay().then(() => data);
}

export function mockError(message: string = "Mock API Error"): Promise<never> {
    return randomDelay().then(() => {
        throw new Error(message);
    });
}

// 模拟分页数据
export function mockPagination<T>(
    allData: T[],
    page: number = 1,
    pageSize: number = 10
) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const records = allData.slice(start, end);

    return {
        records,
        total: allData.length,
        page,
        pageSize
    };
}

export const proxyUrl = (url: string): string => {
	// tos资源下载
	url = url.replace(
		"https://ark-content-generation-v2-cn-beijing.tos-cn-beijing.volces.com",
		"/tos",
	);
	return url;
};

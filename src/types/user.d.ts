// 本地模式用户信息（无账号体系，仅用于个人资料展示表单）
export interface IUser {
	id: number;
	username: string;
	nickname: string;
	avatarUrl: string;
	email: string;
	phone: string;
	phoneCountryCode: string;
	direction: string;
	profession: string;
	introduction: string;
	createAt: string;
}

import type {
	GitHubFile,
	GitHubFileContent,
	GitHubRepoConfig,
} from "@/lib/github";

export interface GitHubFileBrowserProps {
	repoConfig: GitHubRepoConfig;
	title?: string;
}

export interface FileListPanelProps {
	files: GitHubFile[];
	selectedFile: GitHubFile | null;
	isLoading: boolean;
	error: boolean;
	title: string;
	onSelectFile: (file: GitHubFile) => void;
	onRetry: () => void;
}

export interface FileContentPanelProps {
	selectedFile: GitHubFile | null;
	fileContent: GitHubFileContent | null;
	isLoading: boolean;
	error: boolean;
	showMarkdownFormatted: boolean;
	onToggleMarkdownView: (formatted: boolean) => void;
	onError: () => void;
}

export interface MobileFileSelectorProps {
	files: GitHubFile[];
	selectedFile: GitHubFile | null;
	onSelectFile: (file: GitHubFile) => void;
}

export interface FileContentViewerProps {
	fileContent: GitHubFileContent;
	showMarkdownFormatted: boolean;
}

export interface ErrorCardProps {
	repoConfig: GitHubRepoConfig;
	onRetry: () => void;
}

export interface LoadingStateProps {
	message?: string;
}

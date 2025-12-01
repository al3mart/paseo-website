export function formatFileSize(bytes: number): string {
	const kb = bytes / 1024;
	if (kb < 1) return `${bytes} B`;
	if (kb < 1024) return `${kb.toFixed(1)} KB`;
	return `${(kb / 1024).toFixed(1)} MB`;
}

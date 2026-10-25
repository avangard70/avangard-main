import { readdir } from "node:fs/promises";
import path from "node:path";

export async function getCertificationImages(): Promise<string[]> {
    try {
        const entries = await readdir(path.join(process.cwd(), 'public', 'certification'), { withFileTypes: true });

        return entries
            .filter(entry => entry.isFile() && /\.(jpe?g|png|webp|avif|gif)$/i.test(entry.name))
            .map(entry => entry.name)
            .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
            .map(name => `/certification/${encodeURIComponent(name)}`);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return [];
        }

        throw error;
    }
}

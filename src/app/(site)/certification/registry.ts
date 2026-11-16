import { parse } from 'csv-parse/sync';

export const registryCsvUrl = process.env.EXPERT_REGISTRY_CSV_URL
    || 'https://docs.google.com/spreadsheets/d/1YGG4FsmHO4W7L9PTDeGvJYiML1Jp7gOArdzgDQV3lG4/export?format=csv&gid=0';

export const registryColumns = [
    { key: 'registrationDate', label: 'Дата оформления' },
    { key: 'certificateNumber', label: 'Номер сертификата' },
    { key: 'fullName', label: 'ФИО' },
    { key: 'issueDate', label: 'Дата выдачи' },
    { key: 'validUntil', label: 'Срок действия' },
    { key: 'specialty', label: 'Направление' },
    { key: 'status', label: 'Статус' },
] as const;

export type ExpertRecord = Record<typeof registryColumns[number]['key'], string>;

export function parseExpertRegistry(csv: string): ExpertRecord[] {
    const [headers, ...rows]: string[][] = parse(csv, {
        bom: true,
        trim: true,
        skip_empty_lines: true,
        relax_column_count: true,
    });

    const columnIndexes = registryColumns.map(({ label }) => {
        const index = headers?.indexOf(label) ?? -1;

        if (index === -1 || headers.lastIndexOf(label) !== index) {
            throw new Error(`Missing or duplicate registry column: ${label}`);
        }

        return index;
    });

    return rows
        .map(row => columnIndexes.map(index => (row[index] ?? '').trim()))
        .filter(values => values.some(Boolean))
        .map(values => Object.fromEntries(
            registryColumns.map(({ key }, index) => [key, values[index]])
        ) as ExpertRecord);
}

export async function loadExpertRegistry(): Promise<ExpertRecord[]> {
    const response = await fetch(registryCsvUrl, {
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
        throw new Error(`Registry request failed: HTTP ${response.status}`);
    }

    if (!response.headers.get('content-type')?.toLowerCase().includes('text/csv')) {
        throw new Error('Registry response is not CSV');
    }

    return parseExpertRegistry(await response.text());
}

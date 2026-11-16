import { unstable_cache } from 'next/cache';
import { ExpertRecord, loadExpertRegistry, registryColumns, registryCsvUrl } from './registry';
import styles from './ExpertRegistry.module.css';

// Cache parsed data explicitly: the parent page uses force-dynamic.
// Failed loads throw, so they cannot replace valid cached records with an empty list.
const getExpertRegistry = unstable_cache(
    loadExpertRegistry,
    ['certified-experts', registryCsvUrl],
    { revalidate: 300 }
);

export default async function ExpertRegistry() {
    let experts: ExpertRecord[];

    try {
        experts = await getExpertRegistry();
    } catch (error) {
        console.error('Unable to load the expert registry:', error instanceof Error ? error.message : 'Unknown error');

        return (
            <p className={styles.message} role="status">
                Не удалось загрузить реестр. Пожалуйста, попробуйте обновить страницу позже.
            </p>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.scrollArea}
                role="region"
                aria-labelledby="expert-registry-title"
                tabIndex={0}
            >
                <table className={styles.table} aria-labelledby="expert-registry-title">
                    <colgroup>
                        {registryColumns.map(column => <col key={column.key} className={styles[column.key]} />)}
                    </colgroup>
                    <thead>
                        <tr>
                            {registryColumns.map(column => <th key={column.key} scope="col">{column.label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {experts.map((expert, index) => (
                            <tr key={`${expert.certificateNumber}-${index}`}>
                                {registryColumns.map(column => (
                                    <td key={column.key} className={styles[`${column.key}Cell`]}>
                                        {column.key === 'status' && expert.status ? (
                                            <span className={styles.status}>{expert.status}</span>
                                        ) : expert[column.key] || '—'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {experts.length === 0 && (
                <div className={styles.empty} role="status">
                    <span className={styles.emptyIcon} aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="3" width="14" height="18" rx="2" />
                            <path d="M9 8h6M9 12h6M9 16h3" />
                        </svg>
                    </span>
                    <p className={styles.emptyTitle}>В реестре пока нет записей</p>
                    <p className={styles.emptyText}>Здесь появятся сведения о сертифицированных экспертах.</p>
                </div>
            )}
            <p className={styles.scrollHint}>
                <span aria-hidden="true">↔</span>
                Листайте таблицу влево и вправо
            </p>
        </div>
    );
}

import { Metadata } from "next";
import Link from "next/link";
import HTag from "@/src/components/shared/HTag/HTag";
import { specialties } from "./specialties";
import gStyles from '../../Global.module.css';
import styles from '../Certification.module.css';

export const metadata: Metadata = {
    title: "Экспертные специальности | Сертификация экспертов | ООО «Авангард»",
    description: "Перечень экспертных специальностей для сертификации в экспертно-оценочной системе «Авангард».",
};

export default function SpecialtiesPage() {
    return (
        <div className={gStyles.wrapper}>
            <HTag tag="h1" direction="fromRight">Экспертные специальности</HTag>
            <div className={gStyles.sectionWrapper}>
                <div className={gStyles.withLine}>
                    Укажите выбранную экспертную специальность при подаче документов на сертификацию.
                    <br />Коды по ОК 029-2014 (ОКВЭД): 71.20.2 — Судебно-экспертная деятельность.
                </div>
                <ul className={styles.specialties}>
                    {specialties.map(specialty => (
                        <li key={specialty.code} className={styles.specialty}>
                            <span className={styles.code}>{specialty.code}.</span>
                            <span>{specialty.text}</span>
                        </li>
                    ))}
                </ul>
                <Link href="/certification" className={styles.button}>Вернуться к сертификации</Link>
            </div>
        </div>
    );
}

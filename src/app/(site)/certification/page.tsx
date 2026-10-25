import { Metadata } from "next";
import Link from "next/link";
import HTag from "@/src/components/shared/HTag/HTag";
import Info from "@/src/components/shared/Info/Info";
import Important from "@/src/components/shared/Important/Important";
import ImageSlider from "@/src/components/shared/ImageSlider/ImageSlider";
import { getCertificationImages } from "./images";
import gStyles from '../Global.module.css';
import styles from './Certification.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Сертификация экспертов | ООО «Авангард»",
    description: "Дистанционная сертификация судебных экспертов в системе «Авангард». Независимое подтверждение квалификации и выдача сертификата до 3 рабочих дней по всей России.",
};

const conditions = [
    { title: 'До 3 рабочих дней', text: 'Срок выдачи сертификата.' },
    { title: 'Полностью дистанционно', text: 'Вся процедура выдачи сертификата проводится удалённо.' },
    { title: 'Копия и оригинал', text: 'Скан-копию направляем на электронную почту, а оригинал отправляем заказным письмом.' },
    { title: 'По всей России', text: 'Сертификат действует на всей территории Российской Федерации.' },
];

const advantages = [
    {
        title: 'Подтверждение компетентности',
        text: 'Сертификат — официальный документ, который показывает: специалист прошёл независимую оценку образования, стажа, опыта, знаний и практических работ и подтвердил уровень в конкретной экспертной области. Это весомый аргумент в профессиональной среде.',
    },
    {
        title: 'Доверие заказчиков и судов',
        text: 'Способ выделить свою квалификацию среди коллег и повысить доверие заказчиков. Дополнительный аргумент при оценке доказательной силы заключения.',
    },
    {
        title: 'Конкурентное преимущество',
        text: 'На рынке, где много специалистов, сертификат помогает выделиться.',
    },
    {
        title: 'Более сложные задачи',
        text: 'Подтверждённая компетентность открывает доступ к экспертизам повышенной сложности и ответственности, где заказчик или суд изначально ищет специалиста с документально подтверждённым статусом.',
    },
    {
        title: 'Профессиональный рост',
        text: 'Сам процесс подготовки к сертификации — анализ опыта, обновление знаний, освоение новых методик — способствует развитию специалиста.',
    },
];

const documents = [
    'Копия паспорта.',
    'Документ об образовании.',
    'Ранее выданный сертификат (при наличии).',
    'Образцы экспертных заключений (при наличии).',
    'Контактный номер телефона.',
];

const steps = [
    'Подача документов с указанием экспертной специальности.',
    'Рассмотрение заявки.',
    'Проверка документов.',
    'Оценка компетентности.',
    'Выдача сертификата.',
];

export default async function CertificationPage() {
    const images = await getCertificationImages();

    return (
        <div className={`${gStyles.wrapper} ${styles.wrapper}`}>
            <HTag tag="h1" direction="fromRight">Сертификация экспертов</HTag>
            <div className={gStyles.sectionWrapper}>
                <Info title="Сертификация судебных экспертов" className={styles.fullWidth}>
                    Это механизм независимой оценки и документального подтверждения квалификации специалистов, которые проводят различные экспертизы.
                </Info>
                <Important>
                    «ЭКСПЕРТНО-ОЦЕНОЧНАЯ СИСТЕМА АВАНГАРД» зарегистрирована в едином реестре зарегистрированных систем сертификации.
                    <p className={styles.registration}>Регистрационный № РОСС RU.З3268.04АГД0</p>
                </Important>
                <div className={gStyles.fourGrid}>
                    {conditions.map(condition => (
                        <Info key={condition.title} title={condition.title}>{condition.text}</Info>
                    ))}
                </div>
            </div>

            <HTag tag="h2" direction="fromRight">Преимущества сертификата</HTag>
            <div className={gStyles.sectionWrapper}>
                <div className={styles.cards}>
                    {advantages.map(advantage => (
                        <Info key={advantage.title} title={advantage.title}>{advantage.text}</Info>
                    ))}
                </div>
            </div>

            <HTag tag="h2" direction="fromRight">Как проходит сертификация</HTag>
            <div className={gStyles.sectionWrapper}>
                <ol className={styles.steps}>
                    {steps.map((step, index) => (
                        <li key={step} className={styles.step}>
                            <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
                <div className={`${gStyles.withLine} ${styles.withLine}`}>
                    Коды по ОК 029-2014 (ОКВЭД): 71.20.2 — Судебно-экспертная деятельность.
                </div>
                <Link href="/certification/specialties" className={styles.button}>Экспертные специальности</Link>
            </div>

            <HTag tag="h2" direction="fromRight">Документы для получения сертификата</HTag>
            <div className={gStyles.sectionWrapper}>
                <div className={styles.documentsLayout}>
                    <div className={styles.documentsColumn}>
                        <div className={`${styles.documentsContent} ${gStyles.withLine} ${styles.withLine}`}>
                            <Info title="Подготовьте и отправьте документы" className={styles.documentsInfo}>
                                <ul className={styles.documents}>
                                    {documents.map(document => <li key={document}>{document}</li>)}
                                </ul>
                            </Info>
                            <a href="mailto:expert233800@mail.ru?subject=Заявка%20на%20сертификацию%20эксперта" className={styles.button}>Отправить документы</a>
                        </div>
                        <Important className={styles.fullWidth}>
                            Документы необходимо отправить на электронную почту{' '}
                            <a className={styles.textLink} href="mailto:expert233800@mail.ru">expert233800@mail.ru</a>.
                        </Important>
                    </div>
                    <div className={styles.documentsGallery}>
                        <p className={styles.galleryTitle}>Сертификаты и документы</p>
                        <ImageSlider images={images} label="Сертификаты и документы" />
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';
import { JSX } from "react";
import gStyles from '../Global.module.css';
import styles from './Bankruptcy.module.css';
import HTag from "@/src/components/shared/HTag/HTag";
import Info from "@/src/components/shared/Info/Info";
import { parseToHTML } from "@/src/helpers";
import Important from "@/src/components/shared/Important/Important";
import Star from './icons/star.png';
import Secur from './icons/secur.png';
import Cash from './icons/cash.png';
import Exp from './icons/exp.png';
import Success from './icons/success.png';
import Button from "@/src/components/shared/Button/Button";

const advantages = [
    {
        text: 'Более /bold/750 успешных процедур//bold//',
        icon: Star
    },
    {
        text: 'Свыше /bold/390 миллионов рублей//bold// долгов списано',
        icon: Cash
    },
    {
        text: '/bold/11 лет//bold// практики',
        icon: Exp
    },
    {
        text: 'Гарантия в договоре',
        icon: Secur
    },
];

const actions = [
    {
        text: 'Оценим вашу ситуацию и взвесим риски',
    },
    {
        text: 'Соберём и подадим документы в суд',
    },
    {
        text: 'Возьмём переговоры с кредиторами и приставами на себя',
    },
    {
        text: 'Проведём процедуру под ключ — от консультации до решения суда',
    },
];

const disclaimerText = `/italic//bold/Банкротство//bold// - это серьёзный шаг, который имеет последствия://italic///n//n/ 
                        ㅤ• Запрет на новые кредиты во время процедуры банкротства (10-12 мес.)/n/ 
                        ㅤ• Повторная процедура не ранее чем через 5 лет/n/ 
                        ㅤ• Контроль финансового управляющего/n//n/
                        Поэтому сначала обратитесь к кредитору или в МФЦ. Мы всегда рекомендуем начинать с переговоров. Но если это не помогло - мы рядом.`;

const actionText = `/bold/Оставьте заявку на бесплатную консультацию//bold// — наш специалист свяжется, задаст вопросы, разберёт вашу ситуацию и предложит план действий.`;

export default function BankruptcyPage(): JSX.Element { 

    return (
        <>
            <div className={gStyles.wrapper}>
                <HTag tag="h1" direction="fromRight">Долги стали неподъёмными? В России есть законный выход – банкротство.</HTag>
                <div className={gStyles.sectionWrapper}>
                    <div className={styles.heroWrapper}>
                        <span className={styles.heroTitle}>Не паникуйте. Разберитесь. Обратитесь к экспертам.</span>
                        <span className={styles.heroText}>
                            Вы пришли к оценщикам, потому что у вас возник спор, суд или вопрос с недвижимостью. И часто за этим стоит ещё одна проблема — долги. Кредиты, микрозаймы, коммуналка, поручительства. Они тянут, давят, не дают дышать.
                            <br /><br />Но в России есть законная процедура банкротства для граждан. Она позволяет перераспределить обязательства, а в большинстве случаев — полностью освободиться от долгов.
                        </span>
                    </div>
                    <Important gloss>
                        {parseToHTML(`Каждый случай - как отдельная головоломка. Его нельзя решить по шаблону. Нужен разбор у юриста, который видит все детали. Мы Агентство защиты прав заёмщиков — эксперты по банкротству физических лиц с 2015 года.`)}
                    </Important>
                </div>
                <HTag tag="h3" direction="fromRight">Цифры, которые говорят за себя:</HTag>
                <div className={gStyles.sectionWrapper}>
                    <div className={gStyles.fourGrid}>
                        {advantages.map(adv => <Info key={adv.text} image={adv.icon.src}>{parseToHTML(adv.text)}</Info>)}
                    </div>
                    <div className={gStyles.withLine}>
                        Мы в Томске, но работаем по всей России — дистанционно, через видеосвязь и онлайн-документы.
                    </div>
                </div>
                <HTag tag="h3" direction="fromRight">Что мы сделаем для вас:</HTag>
                <div className={gStyles.sectionWrapper}>
                    <div className={gStyles.fourGrid}>
                        {actions.map(act => <Info key={act.text} image={Success.src}>{act.text}</Info>)}
                    </div>
                    <div className={gStyles.withLine}>
                        Нас называют профессионалами высшего класса. Сотни положительных отзывов от клиентов - лучшее доказательство.
                    </div>
                </div>
                <HTag tag="h3" direction="fromRight">Первый шаг к свободе</HTag>
                <div className={gStyles.sectionWrapper}>
                    <div className={styles.heroWrapper}>
                        <span className={styles.heroTitle}>Никаких обязательств. Просто разговор.</span>
                        <span className={styles.heroText}>
                            {parseToHTML(actionText)}
                        </span>
                        <a
                            className={styles.link}
                            href="https://b24-whgp32.bitrix24site.ru/crm_form_a9jol/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Button className={styles.button}>Записаться на консультацию</Button>
                        </a>
                    </div>
                </div>
                <div className={gStyles.sectionWrapper}>
                    <Important>
                        {parseToHTML(disclaimerText)}
                    </Important>
                </div>
            </div>
        </>
    );
}

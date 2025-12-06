import classNames from 'classnames';
import styles from './Hero.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Logo from './logo.png';
import Arrow from './arrow.svg';
import ImgTag from '../../shared/ImgTag/ImgTag';


export interface HeroProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string
}

export default function Hero({ className, ...props }: HeroProps) {
    
    return (
        <div className={classNames(styles.hero, className)} {...props}>
            <div className={styles.title}>
                <ImgTag className={styles.logo} src={Logo}></ImgTag>
                <h1>АВАНГАРД</h1>
            </div>
            
            <div className={styles.heroText}>
                <span className={styles.first}>быстро</span>
                <div className={classNames(styles.slicer, styles.first)} />
                <span className={styles.second}>качественно</span>
                <div className={classNames(styles.slicer, styles.third)} />
                <span className={styles.third}>надежно</span>
            </div>
            <div className={styles.arrowContainer}>
                <Arrow className={classNames(styles.arrow, styles.blinkingArrow)} />
                <Arrow className={classNames(styles.arrow, styles.blinkingArrow)} />
                <Arrow className={classNames(styles.arrow, styles.blinkingArrow)} />
            </div>
        </div>
    );
}
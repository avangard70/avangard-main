import { DetailedHTMLProps, HTMLAttributes} from "react";
import styles from './Important.module.css';
import classNames from "classnames";

interface ImportantProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    gloss?: boolean
    children?: React.ReactNode;
    className?: string,
}

export default function Important({ gloss=false, children, className, ...props }: ImportantProps) {
    return (
        <div className={classNames(styles.important, className, {
            [styles.glossImportant]: gloss
        })} {...props}>
            <div className={styles.line}></div>
            <div className={styles.title}>ВАЖНО
                {gloss ? <span className={styles.exclaim}>!</span> : '!'}
            </div>
            <div className={styles.mainText}>
                {children}
            </div>
        </div>
    );
}
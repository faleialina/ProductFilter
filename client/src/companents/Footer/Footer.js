import Options from '../Options/Options';
import style from './style.module.css';
function Footer() {
    const array = ['Home', 'Textbook', 'Statistics'];

    return (
        <div className={style.wrapper}>
            <div className={style.nav}>
                <div className={style.transition}>
                    <Options array={array} />
                </div>
            </div>
            <div className={style.line}></div>
            <div className={style.end}>
                <div className={style.img}></div>
                <div className={style.signature}>©2024 Company. Project for Company.</div>
            </div>
        </div>
    )
};

export default Footer;
import { Link } from 'react-router-dom';
import style from './style.module.css';
function Header() {
    return (
        <div className={style.wrapper}>
            <h1><Link to={'/'}>Company</Link> </h1>
            <div className={style.btns}>
                <div className={style.login}><Link to={'/auth'}>Login →</Link> </div>
                <div className={style.reg}><Link to={'/reg'}>Sign Up</Link> </div>
            </div>
        </div>
    )
};

export default Header;
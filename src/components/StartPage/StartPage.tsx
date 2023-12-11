import {selectUserIsLogin} from "../../store/reducers/userSlice.ts";
import {useAppSelector} from "../../hooks.ts";
import Account from "../Account/Account.tsx";
import {CreateGame} from "../CreateGame/CreateGame.tsx";
import classes from './StartPage.module.scss';
function StartPage () {
    const isLogin = useAppSelector(selectUserIsLogin);

    return (
        <>
            <main className={classes.main}>
                <div className={'page_wrapper'}>
                  <div className={classes.container}>
                    <div className={classes.start_page}>
                      {isLogin ?
                        <div>
                          <CreateGame/>
                        </div>
                        :
                        <Account />
                      }
                    </div>
                  </div>
                </div>
            </main>
        </>
    )
}

export default StartPage

import {selectUserIsLogin} from "../../store/reducers/userSlice.ts";
import {useAppSelector} from "../../hooks.ts";
import Account from "../Account/Account.tsx";
function StartPage () {
    const isLogin = useAppSelector(selectUserIsLogin);

    return (
        <>
            <main>
                <div className={'page_wrapper'}>

                  {isLogin ?
                    'Start Page'
                    :
                    <Account />
                  }

                </div>
            </main>
        </>
    )
}

export default StartPage

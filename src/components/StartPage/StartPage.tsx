import {selectUserIsLogin} from "../../store/reducers/userSlice.ts";
import {useAppSelector} from "../../hooks.ts";
import Account from "../Account/Account.tsx";
import {CreateGame} from "../CreateGame/CreateGame.tsx";
function StartPage () {
    const isLogin = useAppSelector(selectUserIsLogin);

    return (
        <>
            <main>
                <div className={'page_wrapper'}>

                  {isLogin ?

                    <CreateGame />
                    :
                    <Account />
                  }

                </div>
            </main>
        </>
    )
}

export default StartPage

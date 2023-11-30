import {selectUserIsLogin} from "../../store/reducers/userSlice.ts";
import {useAppSelector} from "../../hooks.ts";
import Account from "../Account/Account.tsx";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import QuestionApi from "../../api/QuestionApi.ts";
import Token from "../../utils/Token.ts";
function Personal () {
  const isLogin = useAppSelector(selectUserIsLogin);
  const [catTitle, setCatTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [cats, setCats] = useState([]);

  useEffect( () => {
    getCats();
  }, []);

  const getCats = async () => {
    const result: any = await QuestionApi.getQuestionsCats(Token.getToken().token);
    if(Array.isArray(result?.cats)) {
      setCats(result?.cats);
      return result?.cats;
    }
    setCats([]);
    return [];
  }
  const createCat = async (e: any) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const result = await QuestionApi.createQuestionCat({title: catTitle, slug: catSlug}, Token.getToken().token);
    console.log(result);
  }

  return (
    <>
      <main>

        <div className={'page_wrapper'}>

          <ul>
            {cats.map((c:any) => <li>{c?.title}</li>)}
          </ul>

          {isLogin ?

            <>
              <div>

                <h3>Создать категорию вопроса</h3>

                <form onSubmit={createCat}>

                  <TextField
                    sx={{width: '100%', mb: 1}}
                    required={true}
                    onInput={(e: any) => {
                      setCatTitle(e.target.value);
                      setCatSlug(cyrillicToTranslit().transform(e.target.value, '_').toLowerCase())
                    }}
                    id="cat-title-input"
                    label="Название"
                    variant="outlined"
                    type="text"
                    name={'title'}
                    value={catTitle}
                  />

                  <TextField
                    sx={{width: '100%', mb: 1}}
                    required={true}
                    onInput={(e: any) => setCatSlug(e.target.value)}
                    id="cat-slug-input"
                    label="Slug"
                    variant="outlined"
                    type="text"
                    name={'slug'}
                    value={catSlug}
                    disabled={true}
                  />

                  <Button sx={{width: '100%'}} type="submit" variant="contained" disabled={submitDisabled}>Создать</Button>
                </form>
              </div>
            </>
            :
            <Account />
          }

        </div>
      </main>
    </>
  )
}

export default Personal

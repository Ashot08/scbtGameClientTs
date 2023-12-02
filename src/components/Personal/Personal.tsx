import {selectUserIsLogin} from "../../store/reducers/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import Account from "../Account/Account.tsx";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import QuestionApi from "../../api/QuestionApi.ts";
import Token from "../../utils/Token.ts";
import {show} from "../../store/reducers/notificationSlice.ts";
function Personal () {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectUserIsLogin);
  const [catTitle, setCatTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [cats, setCats] = useState([]);
  const [checkedCats, setCheckedCats] = useState([] as number[]);

  useEffect( () => {
    getCats();
  }, [submitDisabled]);

  const getCats = async () => {
    const result: any = await QuestionApi.getQuestionsCats(Token.getToken().token);
    if(Array.isArray(result?.cats)) {
      setCats(result?.cats);
      return result?.cats;
    }
    setCats([]);
    return [];
  }
  async function createCat (e: any) {
    e.preventDefault();
    setSubmitDisabled(true);

    const result: any = await QuestionApi.createQuestionCat({title: catTitle, slug: catSlug}, Token.getToken().token);
    setSubmitDisabled(false);
    dispatch(show({
      status: result.status,
      text: result.message,
    }));
  }

  const changeCheckbox = (e: any) => {
    if(e.target.checked) {
      setCheckedCats([
        ...checkedCats,
        e.target.value
      ])
    } else {
      setCheckedCats([
        ...checkedCats.filter(id => id !== e.target.value),
      ])
    }
  }

  const deleteCats = async () => {
    setSubmitDisabled(true);
    const result = await QuestionApi.deleteQuestionCats({catsIds: checkedCats}, Token.getToken().token);
    console.log(result)
    setSubmitDisabled(false);
  }

  return (
    <>
      <main>

        <div className={'page_wrapper'}>

          {isLogin ?

            <>
              <div style={{textAlign: 'left'}}>
                <ul>
                  {cats.map((c:any) => <li><label><input key={'cat_checkbox_' + c.id} onChange={changeCheckbox} type={'checkbox'} name={'category'} value={c.id} />{c?.title}</label></li>)}
                </ul>
                <div>
                  <button disabled={submitDisabled} onClick={deleteCats}>Удалить выбранные</button>
                </div>
              </div>

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

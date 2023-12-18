import { useEffect, useState } from "react";
import classes from './RollPopup.module.scss';

export default function RollPopup() {
  const [isShowBox, setIsShowBox] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsShowBox(true));
  }, []);

  return (

      <div className={`${classes.rollPopup} ${isShowBox ? classes.blockShow : ""}`} ></div>
  );
}

import React,
  {
    useContext,
    FC
  } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import { ThemeContext } from "../../utils/ThemeContext";

export const ButtonBack: FC = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);

  return (
      <button
        className={classNames(
          'is-button',
          'ml-4',
          { dark: darkTheme }
        )}
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left px-6"></i>
      </button>
  )
}
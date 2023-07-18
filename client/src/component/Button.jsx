import React from "react";

export const ButtonPrimary = (props) => {
 const {buttonText, onClick} = props;

 return <button type="submit" onClick={onClick} className="p-[0.3rem] mt-1 w-full bg-yellow-700 font-[400] text-white transition-all duration-700 ease-linear hover:bg-yellow-800 rounded">{buttonText}</button>
}
import React from "react";

export const Input = (props) => {
  const { header, iconName, icon, type, placeholder, value, onChange, errorMessage } = props;
  return (
    <div>
      <h1 className="mb-2 text-white opacity-70 text-[0.9rem]">{header}</h1>
      <div className="flex rounded items-center relative bg-[#161616] text-white">
        <i
          className={`fa-solid fa-${iconName} ml-2 mr-[0.3rem] text-yellow-600 opacity-95`}
        ></i>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`outline-none rounded p-[0.3rem] flex flex-1 font-normal text-[0.9rem] bg-[#161616] text-white`}
        />
        <span>{icon}</span>
      </div>
      <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
    </div>
  );
};

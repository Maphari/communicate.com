import React from "react";

export const InputFile = (props) => {
  const { header, type, placeholder, value, onChange, errorMessage, icon } = props;
  return (
    <>
      <h1 className="mb-2 text-white opacity-70 text-[0.9rem]">{header}</h1>
      <div className="flex rounded items-center mb-3 relative bg-[#161616] text-white">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`outline-none rounded p-[0.1rem] flex flex-1 font-normal text-[0.9rem] bg-[#161616] text-white`}
        />
         <span>{icon}</span>
      </div>
      <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
    </>
  );
};

import React from "react";

export const EquipmentInfo = (props) => {
  const {vihicleType, carModel, carColor, plateNumber, onClick} = props;

  return (
    <>
      <section className="equipment-container-info p-2 mr-5 h-full flex items-center justify-center">
        <div className="bg-[#050505] p-[1.4rem] w-[30rem] rounded-xl">
          <div className="flex items-center justify-center gap-1 mb-3 bg-[#161616] py-3 rounded-xl">
            <div className="bg-yellow-500 h-24 text-[#050505] w-24 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-user text-5xl"></i>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1 mt-2">
            <h1 className="opacity-90">Vihicle Type: </h1>
            <p className="opacity-50 text-[0.9rem]">{vihicleType}</p>
          </div>
          <div className="flex items-center justify-between gap-1 mt-2">
            <h1 className="opacity-90">Car Model: </h1>
            <p className="opacity-50 text-[0.9rem]">{carModel}</p>
          </div>
          <div className="flex items-center justify-between gap-1 mt-2">
            <h1 className="opacity-90">Car Color: </h1>
            <p className="opacity-50 text-[0.9rem]">{carColor} Color</p>
          </div>
          <div className="flex items-center justify-between gap-1 mt-2">
            <h1 className="opacity-90">Plate Number: </h1>
            <p className="opacity-50 text-[0.9rem]">{plateNumber}</p>
          </div>
          <button onClick={onClick}  className="p-[0.2rem] mt-3 w-full rounded bg-yellow-600">Update information</button>
        </div>
      </section>
    </>
  );
};

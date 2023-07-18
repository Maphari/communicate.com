import React, { useContext } from "react";
import { InputGroup, Form, Col } from "react-bootstrap";

export const Decline = () => {
  const { request } = useContext(RequestContext);
  console.log(request);
  return (
    <>
      <section className="decline-container">
        <section className="border-2 border-red-500 decline-container__inner p-3">
          <div className="mt-2">
            <div>
              <h1 className="font-bold">Pickup point</h1>
              <p className="text-md mt-[0.1rem]">
                {request?.request?.pickupPoint}
              </p>
            </div>
            <div className="my-2">
              <h1 className="font-bold">Destination point</h1>
              <p className="text-md mt-[0.1rem]">
                {request?.request?.destinationPoint}
              </p>
            </div>
            <div className="my-2">
              <h1 className="font-bold">Pickup information</h1>
              <p className="text-md mt-[0.1rem]">
                Names: {request?.request?.names}
              </p>
              <p className="text-md mt-[0.1rem]">
                Phone Number: {request?.request?.mobile}
              </p>
              <div className="mt-1">
                <h1 className="font-bold">Pickup instruction</h1>
                <p>{request?.request?.pickInstruction}</p>
              </div>
              <div className="mt-1">
                <h1 className="font-bold">Decline reason</h1>
                <Form>
                  <InputGroup as={Col} className="mt-2">
                    <Form.Control
                      className="rounded-none"
                      placeholder="Reason"
                      type="text"
                      name="username"
                    />
                  </InputGroup>
                </Form>
              </div>
              <div className="flex items-center gap-1 flex-wrap mt-2">
                <button className="flex justify-center items-center flex-1 transition-all duration-700 ease-linear bg-yellow-500 hover:bg-yellow-600 p-2 font-[600] text-white">
                  Reconsider request
                </button>
                <button className="w-[30%] transition-all duration-700 ease-linear bg-sky-500 hover:bg-sky-600 p-2 font-[600] text-white">
                  Submit decline
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

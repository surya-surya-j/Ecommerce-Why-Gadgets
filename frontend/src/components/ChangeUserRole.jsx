import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryAPI from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose, userId, callfunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChange = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponce = await fetch(SummaryAPI.updateUser.url, {
      method: SummaryAPI.updateUser.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responceData = await fetchResponce.json();

    if (responceData.success) {
      toast.success(responceData.message);
      onClose();
      callfunc()
    }

    console.log(responceData, "updaterole");
  };

  return (
    <div className="fixed  top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block  ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex justify-between items-center my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChange}
          >
            {Object.values(ROLE).map((el, index) => (
              <option values={el} key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block  py-1 px-3  rounded-full bg-red-600 text-white hover:bg-red-700 "
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;

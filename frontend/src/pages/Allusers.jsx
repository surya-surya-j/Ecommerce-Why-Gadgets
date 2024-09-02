import React, { useEffect, useState } from "react";
import SummaryAPI from "../common/index";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function Allusers() {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:""
  });

  const fetchAllUser = async () => {
    const fetchResponce = await fetch(SummaryAPI.allUser.url, {
      method: SummaryAPI.allUser.method,
      credentials: "include",
    });
    const dataResponce = await fetchResponce.json();

    if (dataResponce.success) {
      setAllUser(dataResponce.data);
    }
    if (dataResponce.error) {
      setAllUser(dataResponce.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((el, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{moment(el?.createdAt).format("LL")}</td>
              <td>
                <button
                  className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUpdateRole(true);
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callfunc={fetchAllUser}
        />
      )}
    </div>
  );
}

export default Allusers;

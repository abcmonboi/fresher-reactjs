import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
const TableUsers = (props) => {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [mode, setMode] = useState();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  useEffect(() => {
    //call api
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setUsers(res.data);
    }
  };
  const handlePageClick = (e) => {
    getUsers(e.selected + 1);
  };
  const handleUpdateUsers = (user) => {
    if (mode === "edit") {
      let newUsers = users.map((item) => {
        if (item.id === user.id) {
          return user;
        }
        return item;
      });
      setUsers(newUsers);
    } else if (mode === "create") {
      setUsers([user, ...users]);
    } else if (mode === "delete") {
      let newUsers = users.filter((item) => item.id !== user.id);
      setUsers(newUsers);
    }

  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <button
          onClick={() => {
            setMode("create");
            setIsShowModalAddNew(true);
          } }
          className="btn btn-dark "
        >
          Create User
        </button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th
              style={{
                width: "200px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          setMode("edit");
                          setIsShowModalAddNew(true);
                          setUserInfo(user);
                        }}
                        className="btn btn-dark d-flex justify-content-center align-items-center "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Edit
                        </span>
                      </button>

                      <button
                        style={{
                          marginLeft: "20px",
                        }}
                        className="btn btn-danger d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setIsShowModalDelete(true);
                          setUserInfo(user);
                          setMode("delete");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination "
        pageClassName="page-item "
        pageLinkClassName="page-link "
        previousClassName="page-item "
        previousLinkClassName="page-link text-light bg-dark"
        nextClassName="page-item "
        nextLinkClassName="page-link text-light bg-dark "
        breakClassName="page-item text-light bg-dark"
        breakLinkClassName="page-link text-light bg-dark"
        activeClassName="active "
     
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => {
          setIsShowModalAddNew(false);
          setMode("");
          setUserInfo({});
        }}
        handleUpdateUsers={handleUpdateUsers}
        mode={mode}
        userInfo={userInfo}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={() => {
          setIsShowModalDelete(false);
          setMode("");
          setUserInfo({});
        }}
        handleUpdateUsers={handleUpdateUsers}
        mode={mode}
        userInfo={userInfo}

      />
    </>
  );
};

export default TableUsers;

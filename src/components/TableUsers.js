import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

const TableUsers = (props) => {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [mode, setMode] = useState();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortByName, setSortByName] = useState("asc");
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
console.log(users);
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
          }}
          className="btn btn-dark "
        >
          <i className="fa-solid fa-plus text-danger"></i>
          {" Create User"}
        </button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th
              style={{
                width: "80px",
              }}
            >
              <div className="sort-table">
                <span> ID </span>
                <span>
                  {sortBy === "asc" ? (
                    <i
                      onClick={() => {
                        setSortBy("desc");
                        setUsers([...users].sort((a, b) => b.id - a.id));
                      }}
                      className="fa-solid fa-arrow-down-wide-short"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        setSortBy("asc");
                        setUsers([...users].sort((a, b) => a.id - b.id));
                      }}
                      className="fa-solid fa-arrow-up-wide-short"
                    ></i>
                  )}
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-table">
                <span> First name </span>
                <span>
                  {sortByName === "asc" ? (
                    <i
                      onClick={() => {
                        setSortByName("desc");

                        let cloneListUsers = _.orderBy(
                          users,
                          ["first_name"],
                          ["desc"]
                        );
                        setUsers(cloneListUsers);
                      }}
                      className="fa-solid fa-arrow-down-wide-short"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        setSortByName("asc");

                        let cloneListUsers = _.orderBy(
                          users,
                          ["first_name"],
                          ["asc"]
                        );
                        setUsers(cloneListUsers);
                      }}
                      className="fa-solid fa-arrow-up-wide-short"
                    ></i>
                  )}
                </span>
              </div>
            </th>
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
                        <i className="fa-solid fa-pencil"></i>
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
                        <i className="fa-solid fa-trash"></i>
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
        pageClassName="page-item bg-danger "
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

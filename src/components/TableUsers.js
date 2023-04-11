import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import { _ } from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

const TableUsers = (props) => {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [mode, setMode] = useState();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortByName, setSortByName] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);
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

  const handleSearch = (e) => {
    setKeyword(e.target.value);

    if (e.target.value !== "") {
      let newUsers = users.filter((item) => {
        return item.email.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setUsers(newUsers);
    } else {
      getUsers(1);
    }
  };
  const getUsersExport = (event, done) => {
    let result = [];
    if (users.length > 0 && users) {
      result.push(["ID", "Email", "First name", "Last name"]);
      users.map((item) => {
        return result.push([
          item.id,
          item.email,
          item.first_name,
          item.last_name,
        ]);
      });
      setDataExport(result);
      done();
    }
  };
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: function(results) {
        console.log("Finished:", results.data);
      }
    });
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <h5>List Users</h5>
        </span>
        <div className="group-btns">
          <label className="btn btn-secondary" htmlFor="import-csv">
            <i className="fa-solid fa-file-csv "></i>
            {" Import CSV"}
          </label>
          <input
            onChange={(e) => {
              handleImportCSV(e);
            }}
            id="import-csv"
            type="file"
            hidden
          />

          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            className="btn btn-info"
            target="_blank"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-csv "></i>
            {" Export CSV"}
          </CSVLink>
          <button
            onClick={() => {
              setMode("create");
              setIsShowModalAddNew(true);
            }}
            className="btn btn-dark "
          >
            <i className="fa-solid fa-circle-plus text-danger"></i>
            {" Add User"}
          </button>
        </div>
      </div>
      <div className="col-3 my-3">
        <input
          onChange={(e) => {
            handleSearch(e);
          }}
          value={keyword}
          type="text"
          className="form-control border border-secondary"
          placeholder="Search user by email..."
        />
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
        pageClassName="page-item  "
        pageLinkClassName="page-link "
        previousClassName="page-item "
        previousLinkClassName="page-link "
        nextClassName="page-item "
        nextLinkClassName="page-link "
        breakClassName="page-item "
        breakLinkClassName="page-link "
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

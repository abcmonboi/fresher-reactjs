import Container from 'react-bootstrap/Container';
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';
function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span><b>List Users:</b></span>
          <button 
          onClick={()=>setIsShowModalAddNew(true)}
          className="btn btn-dark ">
          Create User
          </button>
        </div>
      <TableUsers />
      </Container>
      <ModalAddNew
      show = {isShowModalAddNew}
      handleClose = {()=>setIsShowModalAddNew(false)}
        />
    </div>
  );
}

export default App;

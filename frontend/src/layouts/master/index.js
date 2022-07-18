import React from "react";
import AddHeaderForm from "../../components/Master/AddHeaderForm";
import Mastertable from "../../components/Master/MasterTable";
import "./index.css";
const MasterPage = () => {
  return (
    <div className="main-container">
      <AddHeaderForm />
      <Mastertable />
    </div>
  );
};

export default MasterPage;

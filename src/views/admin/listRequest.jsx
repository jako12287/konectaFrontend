import { useRequests } from "../../context/RequestContext";
import RequestTable from "../../components/customTableRequest";
import { useState } from "react";
import Modal from "../../components/modal";
import CreateRequestForm from "../../components/createRequestForm";
import styles from "../../styles/listEmployee.module.css";

const ListRequest = () => {
  const { requests, refreshRequests } = useRequests();
  const [openModal, setOpenModal] = useState(false);
  console.log("TCL: ListRequest -> [openModal", openModal);

  return (
    <div className={styles.container}>
      <h2>Lista de Solicitudes</h2>

      <RequestTable
        data={requests}
        refreshRequests={refreshRequests}
        onOpenModal={() => setOpenModal(!openModal)}
      />
      {openModal && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
          <CreateRequestForm setOpenModal={setOpenModal} refreshRequests={refreshRequests}/>
        </Modal>
      )}
    </div>
  );
};

export default ListRequest;

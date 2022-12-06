import { Modal } from '../../context/Modal';
import CreateStoreForm from './StoreCreateForm';
import { useState } from 'react';

function CreateStoreModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     <button 
        className="create-store"
        onClick={() => setShowModal(true)}>
        Create Store
      </button>
      {showModal && (
        <Modal onExit={() => setShowModal(false)}>
          <CreateStoreForm exitModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default CreateStoreModal;
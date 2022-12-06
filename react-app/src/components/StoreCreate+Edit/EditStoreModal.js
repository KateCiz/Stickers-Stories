import { Modal } from '../../context/Modal';
import EditStoreForm from './StoreEditForm';
import { useState } from 'react';

function EditStoreModal({ store }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
    <p className='store-link' onClick={() => setShowModal(true)}>Edit Store</p>
      {showModal && (
        <Modal>
          <EditStoreForm store={store} exitModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default EditStoreModal;

// this needs tweaked because of where info is grabbed and where button is
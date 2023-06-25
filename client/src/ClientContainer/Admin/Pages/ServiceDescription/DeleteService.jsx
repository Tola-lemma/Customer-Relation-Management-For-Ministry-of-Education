import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { ErrorContext } from '../../ToastErrorPage/ErrorContext';
import { Header } from '../../components/Header';

export const DeleteService = () => {
  const { showError, showWarning } = useContext(ErrorContext);
  const [requestType, setRequestType] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [requestTypes, setRequestTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequestTypes = async () => {
    try {
      const response = await axios.get('/issue/service');
      setRequestTypes(response.data.services.map((service) => service.requestType));
      setLoading(false);
    } catch (error) {
      alert('Error occurred while fetching request types');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequestTypes();
  }, []);

  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
  };

  const handleConfirmInputChange = (e) => {
    setConfirmInput(e.target.value);
  };

  const handleDeleteService = async () => {
    try {
      await axios.delete(`/admin/service/${requestType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRequestType('');
      setConfirmInput('');
      setOpenModal(false);
      showWarning('Service is deleted! Successfully! ');
      fetchRequestTypes()
    } catch (error) {
      showError(error?.response?.data?.message || 'Error occurred while deleting service');
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalConfirmation = () => {
    if (confirmInput.toUpperCase() === 'DELETE') {
      handleDeleteService();
    } else {
      showError('Please enter the confirmation message correctly');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <Box m="20px">
      <Header title="Delete Service" subtitle="Admin can delete service " />
    <div className='container' style={{ width: '80%'  ,marginTop:"4%"}}>
      <div className='mb-3'>
        <label htmlFor='requestType' className='form-label' style={{ fontWeight: 'bold',fontSize:"2rem" }}>
          Select Request Type to Delete:
        </label>
        <select id='requestType' className='form-select' value={requestType} onChange={handleRequestTypeChange}>
          <option value=''>Select Request Type</option>
          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'transferRequest' ? 'Transfer Request' :
               type === 'studyAbroadRequest' ? 'Study Abroad Request' :
               type === 'scholarshipRequest' ? 'Scholarship Request' :
               type === 'complaintRequest' ? 'Complaint Request' : ''}
            </option>
          ))}
        </select>
      </div>
      <div style={{marginTop:"8rem"}}>
      <button  className='btn btn-primary' onClick={handleOpenModal} style={{ display: 'block', margin: '0 auto' }}>
        Delete Service
      </button>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
          <Typography variant='h6' component='div' gutterBottom>
            Confirm Delete
          </Typography>
          <Typography variant='body1' gutterBottom>
            Are you sure you want to delete the service? Please enter "DELETE" to confirm:
          </Typography>
          <TextField
            id='confirmInput'
            label='Confirmation Input'
            value={confirmInput}
            onChange={handleConfirmInputChange}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button variant='contained' onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant='contained' color='error' onClick={handleModalConfirmation}  sx={{ ml: 2 }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    </Box>
  );
};

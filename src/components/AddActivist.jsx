import React, { useState } from 'react'
import {navigate, useNavigate} from 'react-router-dom';

function AddActivist({addNewActivist}) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        region: "",
        mobile: "",
        password:"",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.value]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewActivist(formData); //pass data to parent
        navigate("/activists"); //redirect back to activist list
    }

  return (
    <div className='main-container p-3'>
       <div className='container-body'>
        <div className='d-flex justify-content-center align-items-center mb-3 pt-3 px-3'>
            <h4>Add Activist</h4>
            <div>
                <button type='button' className='btn btn-outline-secondary me-2' onClick={() => navigate("/activists")}>
                    Cancel
                </button>
                <button type='submit' className='btn btn-danger' onClick={handleSubmit}>
                    Save
                </button> 
            </div>
        </div>

        <form action="#" className='px-3'>
            <div className='row g-3'>
                <div className='col-md-4'>
                    <label className='form-label'>Name*</label>
                    <input type="text" name='name' className='form-control' value={formData.name} onChange={handleChange} required/>
                </div>
                <div className='col-md-4'>
                    <label className='form-label'>Role*</label>
                    <select type="text" name='name' className='form-control' value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                    </select>
                </div>
            </div>
        </form>
       </div>
    </div>
  )
}

export default AddActivist

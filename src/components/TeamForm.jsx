import React, { useState, useEffect, useId  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TeamForm = () => {

  const location = useLocation();
      const navigate = useNavigate();
      const [formData, setFormData] = useState(
        { 
          id: 0,
          teamName: '', 
          teamDescription: '',
          member: [
            {
              id: 0,
              memberName: "",
              gender: "",
              dob: "",
              contact: null
            }
          ]
        }
      );
      const [mode, setMode] = useState('add');
      const [count, setCount] = useState(1);
      const [memberData, setMemberData] = useState([
        {
          id: 0,
          memberName: "",
          gender: "",
          dob: "",
          contact: null
        }
      ]);

      const id = useId();


      const handleAddMember = () => {
        setCount(count + 1)
        setMemberData([...memberData, {
                  id: count,
                  memberName: "",
                  gender: "",
                  dob: "",
                  contact: null
                }])

        console.log('memberData>> ', memberData)
      }

      
      useEffect(() => {
        console.log("location.state>> ", location.state)
        if (location.state && location.state.item) {
          setFormData(location.state.item);
          setMode('edit');
        } else {
          setFormData({ name: '', description: '' });
          setMode('add');
        }
      }, [location.state]);


      const handleChange = (e) => {
        //setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const handleMamberNameChange = (id, newValue) => {
        setMemberData(prevFields =>
          prevFields.map(field =>
            field.id === id ? { ...field, value: newValue } : field
          )
        );

        cnsole.log("setMemberData>>> ", memberData)
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'add') {
          // Logic to add new item
          console.log('Adding item:', formData);
        } else {
          // Logic to update existing item
          console.log('Updating item:', formData);
        }
        // Optionally navigate away or reset form
        navigate('/');
      };


  return <form
            className="bg-white rounded-lg shadow-sm width-full max-w-sm max-auto pl-6 pr-6 pb-6 text-black"
           onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className=" text-sm">
                  Team Name
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-2"
                    value={formData.teamName}
                    onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                    placeholder="Team Name"
                    required
                />
                </label>
              
            </div>
            <div className="mb-4">
                <label className=" text-sm">
                  Team Description
                  <textarea 
                    className="w-full p-2 border rounded mt-2"
                    value={formData.teamDescription}
                    onChange={(e) => setFormData({...formData, teamDescription: e.target.value})}
                    name="teamDescription"
                    rows={4} 
                    cols={40} 

                  />
                </label>
            </div>
            <div className="mb-4">
              <h3>Team mamer</h3>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.member?.map((member) => (
                    <tr key={member.id}>
                    <td>
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={member.memberName}
                        onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                        placeholder="Member Name"
                        required
                      />
                    </td>
                    <td>
                      <select 
                        value={member.gender} 
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select></td>
                    <td>
                      <input
                        type="date"
                        className="w-full p-2 border rounded mt-2"
                        value={member.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        placeholder="Date of Birth"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={member.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        placeholder="Contact no"
                        required
                      />
                    </td>
                  </tr>
                    ))}
                  
                  {memberData.map((member) => (
                    <tr key={member.id}>
                      <td>
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={member.memberName}
                        onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                        placeholder="Member Name"
                        required
                      />
                    </td>
                    <td>
                      <select 
                        value={member.gender} 
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select></td>
                    <td>
                      <input
                        type="date"
                        className="w-full p-2 border rounded mt-2"
                        value={member.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        placeholder="Date of Birth"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={member.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        placeholder="Contact no"
                        required
                      />
                    </td>
                    </tr>
                    ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddMember}>Add New Mamber</button>
            </div>
            <div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => navigate('/')}>Exit</button>
            </div>
        </form>
}

export default TeamForm;
import React, { useState, useEffect, useId  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../service/api.js";
import {toast, ToastContainer} from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";
import MemberForm from "./MemberForm.jsx";

const TeamForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
                id: uuidv4(),
                teamName: '',
                teamDescription: '',
                memberName: "",
                gender: null,
                dob: "",
                contact: ''
            }
  );

  const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
  ]


  const [mode, setMode] = useState('add');
  const [memberData, setMemberData] = useState([]);


  const handleAddMember = () => {
    memberData.push({
        id: uuidv4(),
        memberName: "",
        gender: null,
        dob: "",
        contact: ''
    })
    setMemberData([...memberData])
  }

  useEffect(() => {
    if (location.state) {
      setFormData({
          id: location.state.id,
          teamName: location.state.teamName,
          teamDescription: location.state.teamDescription,
          memberName: location.state.members[0].memberName,
          gender: location.state.members[0].gender.label,
          dob: location.state.members[0].dob,
          contact: location.state.members[0].contact
      });
      setMode('edit');
    } else {
      setFormData({
          id: uuidv4(),
          teamName: '',
          teamDescription: '',
          memberName: "",
          gender: null,
          dob: "",
          contact: ''
      });
      setMode('add');
    }
  }, [location.state]);


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  // const handleMamberNameChange = (id, newValue) => {
  //   setMemberData(prevFields =>
  //     prevFields.map(field =>
  //       field.id === id ? { ...field, value: newValue } : field
  //     )
  //   );
  //
  //   console.log("setMemberData>>> ", memberData)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

      const userData = {
          id: mode === 'add' ? uuidv4() : location.state.id,
          teamName: formData.teamName,
          teamDescription: formData.teamDescription,
          approvedByManager: mode === 'add' ? 0 : location.state.approvedByManager,
          approvedByDirector: mode === 'add' ? 0 : location.state.approvedByDirector,
          members: [
              {
                  id: mode === 'add' ? uuidv4() : location.state.members[0].id,
                  memberName: formData.memberName,
                  gender: formData.gender,
                  dob: formData.dob,
                  contact: formData.contact,
              }
          ]
      }

    if (mode === 'add') {
        try {
          await api.post('/teams', userData).then(() => {
              toast.success('Team created successfully');
          })
        } catch(error) {
            toast.error(`Error - ${error}`);
        }
    } else {
        try {
            await api.put(`/teams/${location.state.id}`, userData).then(() => {
                toast.success('Team updated successfully');
            })
        } catch(error) {
            toast.error(`Error - ${error}`);
        }
    }
    navigate('/');
  };


    const [selectedDate, setSelectedDate] = useState('');

  return <form
            className="bg-white rounded-lg shadow-sm width-full max-auto pb-6 text-black"
            onSubmit={handleSubmit}
        >
            <ToastContainer />
            <h2 className="bg-slate-800 text-white text-lg flex justify-center items-center py-6 mb-6 font-bold">Team Details</h2>
            <div className="px-5">
                <div className="mb-4">
                    <label className="font-bold text-sm">
                        Team Name
                        <input
                            type="text"
                            className="w-full font-normal p-2 border border-gray-300 rounded mt-2"
                            value={formData.teamName}
                            onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                            placeholder="Team Name"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="font-bold text-sm">
                        Team Description
                        <textarea
                            className="w-full font-normal p-2 border border-gray-300 rounded mt-2"
                            value={formData.teamDescription}
                            onChange={(e) => setFormData({...formData, teamDescription: e.target.value})}
                            name="teamDescription"
                            placeholder="Team Description"
                            rows={4}
                            cols={40}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                  <h3 className="bg-slate-800 text-lg text-white font-bold p-3">Team member</h3>
                  <table className="table-auto">
                      <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th className="px-2 py-3">Name</th>
                            <th className="px-2 py-3">Gender</th>
                            <th className="px-2 py-3">Date of Birth</th>
                            <th className="px-2 py-3">Contact No.</th>
                          </tr>
                    </thead>
                    <tbody>
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                        <td className="px-2 py-3">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded text-xs"
                                value={formData.memberName}
                                onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                                placeholder="Member Name"
                                required
                            />
                        </td>
                        <td className="px-2 py-3">
                            <Select
                                className="w-[110px] h-[34px] text-xs"
                                options={genderOptions}
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e})}
                                required
                            />
                        </td>
                        <td className="px-2 py-3">
                            <input
                                type="date"
                                id="dateInput"
                                className="w-full p-2 border border-gray-300 rounded text-xs"
                                value={formData.dob}
                                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                required
                            />
                        </td>
                        <td className="px-2 py-3">
                            <input
                                id="contact"
                                className="w-full p-2 border border-gray-300 rounded text-xs"
                                name="age"
                                type="number"
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                required
                            />
                        </td>
                    </tr>
                    <MemberForm memberData={memberData} setMemberData={setMemberData} />
                    </tbody>
                  </table>
                  <div className="py-12 px-2">
                      <button
                          type="button"
                          className="rounded-md bg-sky-500/100 px-6 py-3 mr-3 text-sm font-semibold text-white opacity-100 focus:outline-none"
                          onClick={handleAddMember}
                      >
                          Add New Member
                      </button>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-6 py-3 mr-3 text-sm font-semibold text-white opacity-100 focus:outline-none cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-red-500 px-6 py-3 ml-3 text-sm font-semibold text-white opacity-100 focus:outline-none cursor-pointer"
                        onClick={() => navigate('/')}
                    >Exit</button>
                </div>
            </div>
        </form>
}

export default TeamForm;
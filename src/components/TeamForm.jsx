import React, {useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../service/api.js";
import {toast, ToastContainer} from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
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
                gender: '',
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

    const copyAllMember = useRef([])
    const memberIndex = useRef([])
    const [isMultyEdit, setIsMultyEdit] = useState(false)


    const handleAddMember = () => {
        setMemberData([...memberData, {
            id: uuidv4(),
            memberName: "",
            gender: "",
            dob: "",
            contact: ''
        }])
    }

    const onChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newFields = [...memberData];
        newFields[index][name] = value;
        setMemberData(newFields);
    };

    useEffect(() => {
    if (location.state) {
        setMode('edit');

        const team = location.state.team;

        if (location.state.id) {
            setIsMultyEdit(true);
            const id = location.state.id;

            copyAllMember.current = team.members;
            memberIndex.current = team.members.findIndex(obj => obj.id === id);

            setFormData({
                id: team.id,
                teamName: team.teamName,
                teamDescription: team.teamDescription,
                memberName: team.members[memberIndex.current].memberName,
                gender: team.members[memberIndex.current].gender,
                dob: team.members[memberIndex.current].dob,
                contact: team.members[memberIndex.current].contact
            });


        } else {
            setFormData({
                id: team.id,
                teamName: team.teamName,
                teamDescription: team.teamDescription,
                memberName: team.members[0].memberName,
                gender: team.members[0].gender,
                dob: team.members[0].dob,
                contact: team.members[0].contact
            });
        }

    } else {
        setMode('add');
      setFormData({
          id: uuidv4(),
          teamName: '',
          teamDescription: '',
          memberName: "",
          gender: '',
          dob: "",
          contact: ''
      });

    }

    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
          id: mode === 'add' ? uuidv4() : location.state.id,
          teamName: formData.teamName,
          teamDescription: formData.teamDescription,
          approvedByManager: mode === 'add' ? 0 : location.state.team.approvedByManager,
          approvedByDirector: mode === 'add' ? 0 : location.state.team.approvedByDirector,
          members: [
              {
                  id: mode === 'add' ? uuidv4() : isMultyEdit ? location.state.team.members[memberIndex.current].id : location.state.team.members[0].id,
                  memberName: formData.memberName,
                  gender: formData.gender,
                  dob: formData.dob,
                  contact: formData.contact,
              }
          ]
        }

        if (mode === 'add') {

        if (memberData.length > 0) {
            userData.members.push(...memberData)
        }

        try {
          await api.post('/teams', userData).then(() => {
              toast.success('Team created successfully');
          })
        } catch(error) {
            toast.error(`Error - ${error}`);
        }
        } else {

        if (isMultyEdit) {

            const editedMember = userData.members[0];
            const updatedMembersArray = copyAllMember.current.map(obj => {
                if (obj.id === editedMember.id) {
                    return editedMember;
                }
                return obj;
            });

            userData.members = updatedMembersArray

            try {
                await api.put(`/teams/${location.state.team.id}`, userData).then(() => {
                    toast.success('Team updated successfully');
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

        }
        navigate('/', { replace: true, state: null });
    };

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
                            <select
                                name="gender"
                                className="w-full p-2 border border-gray-300 rounded text-xs"
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                required
                            >
                                <option value="">Select...</option>
                                {genderOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
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
                    <MemberForm memberData={memberData} onChangeInput={onChangeInput} />
                    </tbody>
                  </table>
                    {mode === 'add' && (
                        <div className="py-12 px-2">
                            <button
                                type="button"
                                className="rounded-md bg-sky-500/100 px-5 py-2 mr-3 text-sm font-semibold text-white opacity-100 focus:outline-none cursor-pointer"
                                onClick={handleAddMember}
                            >
                                Add New Member
                            </button>
                        </div>
                    )}
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
                        onClick={() => navigate('/', { replace: true, state: null })}
                    >Exit</button>
                </div>
            </div>
        </form>
}

export default TeamForm;
import React, { useState, useEffect, useId  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TeamForm = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
                id: 1,
                teamName: '',
                teamDescription: '',
                approvedByManager: 0,
                approvedByDirector: 0,
                members: [
                    {
                        id: 0,
                        memberName: "",
                        gender: "",
                        dob: "",
                        contact: ''
                    }
                ]
            }
  );
  const [mode, setMode] = useState('add');
  const [count, setCount] = useState(1);
  const [memberData, setMemberData] = useState([]);


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


  // useEffect(() => {
  //   console.log("location.state>> ", location.state)
  //   if (location.state && location.state.item) {
  //     setFormData(location.state.item);
  //     setMode('edit');
  //   } else {
  //     setFormData({ name: '', description: '' });
  //     setMode('add');
  //   }
  // }, [location.state]);


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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'add') {
      console.log('Adding item:', formData);
    } else {
      console.log('Updating item:', formData);
    }
    navigate('/');
  };


    const [selectedDate, setSelectedDate] = useState('');

  return <form
            className="bg-white rounded-lg shadow-sm width-full max-auto pb-6 text-black"
            onSubmit={handleSubmit}
        >
            <h2 className="bg-slate-800 text-white text-lg flex justify-center items-center py-6 mb-6 font-bold">Team Details</h2>
            <div className="px-5">
                <div className="mb-4">
                    <label className="font-bold text-sm">
                        Team Name
                        <input
                            type="text"
                            className="w-full font-normal p-2 border rounded mt-2"
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
                            className="w-full font-normal p-2 border rounded mt-2"
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
                      {formData.members?.map((member) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            key={member.id}
                        >
                            <td className="px-2 py-3">
                              <input
                                type="text"
                                className="w-full p-2 border rounded mt-2"
                                value={member.memberName}
                                onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                                placeholder="Member Name"
                                required
                              />
                            </td>
                            <td className="px-2 py-3">
                                <select
                                    name="selectedFruit"
                                    className="w-full p-2 border rounded mt-2"
                                >
                                    <option value="apple">Male</option>
                                    <option value="banana">Female</option>
                                </select>
                            </td>
                            <td className="px-2 py-3">
                                <input
                                    type="date"
                                    id="dateInput"
                                    className="w-full p-2 border rounded mt-2"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    required
                                />
                            </td>
                            <td className="px-2 py-3">
                                <input
                                    id="contact"
                                    className="w-full p-2 border rounded mt-2"
                                    name="age"
                                    type="number"
                                />
                              {/*<input*/}
                              {/*  type="number"*/}
                              {/*  className="w-full p-2 border rounded mt-2"*/}
                              {/*  value={member.contact}*/}
                              {/*  onChange={(e) => setFormData({...formData, contact: e.target.value})}*/}
                              {/*  placeholder="Contact no"*/}
                              {/*  required*/}
                              {/*/>*/}
                            </td>
                          </tr>
                      ))}

                      {/*{memberData.map((member) => (*/}
                      {/*  <tr*/}
                      {/*      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"*/}
                      {/*      key={member.id}*/}
                      {/*  >*/}
                      {/*      <td className="px-2 py-3">*/}
                      {/*        <input*/}
                      {/*          type="text"*/}
                      {/*          className="w-full p-2 border rounded mt-2"*/}
                      {/*          value={member.memberName}*/}
                      {/*          onChange={(e) => setFormData({...formData, memberName: e.target.value})}*/}
                      {/*          placeholder="Member Name"*/}
                      {/*          required*/}
                      {/*        />*/}
                      {/*      </td>*/}
                      {/*      <td className="px-2 py-3">*/}
                      {/*        <select*/}
                      {/*          value={member.gender}*/}
                      {/*          onChange={(e) => setFormData({...formData, gender: e.target.value})}*/}
                      {/*        >*/}
                      {/*          <option value="male">Male</option>*/}
                      {/*          <option value="female">Female</option>*/}
                      {/*        </select></td>*/}
                      {/*      <td className="px-2 py-3">*/}
                      {/*        <input*/}
                      {/*          type="date"*/}
                      {/*          className="w-full p-2 border rounded mt-2"*/}
                      {/*          value={member.dob}*/}
                      {/*          onChange={(e) => setFormData({...formData, dob: e.target.value})}*/}
                      {/*          placeholder="Date of Birth"*/}
                      {/*          required*/}
                      {/*        />*/}
                      {/*      </td>*/}
                      {/*      <td className="px-2 py-3">*/}
                      {/*        <input*/}
                      {/*          type="number"*/}
                      {/*          className="w-full p-2 border rounded mt-2"*/}
                      {/*          value={member.contact}*/}
                      {/*          onChange={(e) => setFormData({...formData, contact: e.target.value})}*/}
                      {/*          placeholder="Contact no"*/}
                      {/*          required*/}
                      {/*        />*/}
                      {/*      </td>*/}
                      {/*  </tr>*/}
                      {/*))}*/}
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
                        className="rounded-md bg-blue-500 px-6 py-3 mr-3 text-sm font-semibold text-white opacity-100 focus:outline-none"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-red-500 px-6 py-3 ml-3 text-sm font-semibold text-white opacity-100 focus:outline-none"
                        onClick={() => navigate('/')}
                    >Exit</button>
                </div>
            </div>
        </form>
}

export default TeamForm;
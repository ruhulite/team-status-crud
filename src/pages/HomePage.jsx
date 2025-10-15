import {useEffect, useRef, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Search from "../components/Search.jsx";
import GrayIcon from "../components/GrayIcon.jsx";
import ApprovedCheckmarkIcon from "../components/ApprovedCheckmarkIcon.jsx";
import CrossIcon from "../components/CrossIcon.jsx";
import api from "../service/api.js";



const HomePage = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [toggleChild, setToggleChild] = useState(null);
  const [checkedTeams, setCheckedTeams] = useState([]);
  const [isShowBulkDeleteBtn, setIsShowBulkDeleteBtn] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const teamDataApi = useRef([]);

  useEffect( () => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/teams');
        setTeamData(response.data)
        teamDataApi.current = response.data;
        toast.success('Request process successfully.');
      } catch (error) {
        toast.error(`Error - ${error}`);
      }
    };

    fetchTeams();
  }, [])


  const handleStatusClickByManager = async (team) => {
    setTeamData(prevState =>
        prevState.map(item =>
            item.id === team.id ? { ...item, approvedByManager: team.approvedByManager + 1 } : item
    ));

    const filterTeam = teamData.find(item => item.id === team.id);
    const updateTeam = {...filterTeam, approvedByManager: team.approvedByManager + 1};
    try {
      await api.put(`/teams/${team.id}`, updateTeam).then(() => {
        toast.success("Team Status Saved")
      })
    } catch(error) {
      toast.error(`Error - ${error}`);
    }
  }

  const handleStatusClickByDirector = async (team) => {
    setTeamData(prevState =>
        prevState.map(item =>
            item.id === team.id ? { ...item, approvedByDirector: team.approvedByDirector + 1 } : item
    ));

    const filterTeam = teamData.find(item => item.id === team.id);
    const updateTeam = {...filterTeam, approvedByDirector: team.approvedByDirector + 1};
    try {
      await api.put(`/teams/${team.id}`, updateTeam).then(() => {
        toast.success("Team Status Saved")
      })
    } catch(error) {
      toast.error(`Error - ${error}`);
    }
  }

  const handleDeleteTeam = async (team) => {
    const deleteTeam = teamData.filter((item) => item.id !== team.id);
    setTeamData(deleteTeam);

    try {
      await api.delete(`/teams/${team.id}`).then(() => {
        toast.error("Team Deleted successfully")
      })
    } catch(error) {
      toast.error(`Error - ${error}`);
    }
  };

  const handleDeleteMember = (team, member) => {
    const deleteMember = teamData.map((item) => {
      if (item.id === team.id) {
        return {
          ...item,
          members: item.members.filter((item2) => item2.id !== member.id)
        };
      }
      return item;
    });
    setTeamData(deleteMember);
    toast.error("Member Deleted successfully")
  };

  const handleSearchTeam = (text) => {
    const filterSearch = teamDataApi.current.filter((team) => {
      const searchMatchedTeamName = team.teamName.toLowerCase().includes(text.toLowerCase());
      const searchMatchedMemberName = team.members.some((member) => member.memberName.toLowerCase().includes(text.toLowerCase()));
      return searchMatchedTeamName || searchMatchedMemberName;
    });

    setTeamData(filterSearch);

  }

  const handleTeamEdit = (team) => {
    navigate('/team-form', { state: team });
  };

  const handleToggle = (index) => {
    if (toggleChild === null) {
      setToggleChild(index)
    } else if (toggleChild === index) {
      setToggleChild(null)
    } else {
      // setToggleChild(null)
    }
  }


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedTeams([...checkedTeams, value])
      setIsShowBulkDeleteBtn(true)
    } else {
      setCheckedTeams(checkedTeams.filter(item => item !== value))
    }
  }

  useEffect(() => {
    if (checkedTeams.length < 1) {
      setIsShowBulkDeleteBtn(false)
    }
  }, [checkedTeams])

  const handleDeleteAllTeam = async () => {
    if (isBulkDelete) {
      setTeamData([]);

      try {
        for (let i= 0; i < teamData.length; i++) {
          await api.delete(`/teams/${teamData[i].id}`).catch(error => toast.error(`Error - ${error}`));
        }
        toast.success("All Team Deleted successfully")
      } catch(error) {
        toast.error(`Error - ${error}`);
      }

    } else {
      const filterDelete = teamData.filter(({ id: teamId }) => !checkedTeams.some(id => id === teamId));
      setTeamData(filterDelete);

      try {
        for (const id of checkedTeams) {
          await api.delete(`/teams/${id}`).catch(error => toast.error(`Error - ${error}`));
        }
        toast.success("Teams Deleted successfully")
      } catch(error) {
        toast.error(`Error - ${error}`);
      }
    }

  }

  const handleDeleteAllBtnChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setIsShowBulkDeleteBtn(true)
      setIsBulkDelete(true)
    } else {
      setIsShowBulkDeleteBtn(false)
      setIsBulkDelete(false)
    }
  }

  const dragItem = useRef()
  const dragOverItem = useRef()

  const handleDragStart = (e, index) => {
    dragItem.current = index
  }

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index
  }

  const handleDrop = async () => {
    const copyTeamsData = [...teamData]
    const draggedItemContent = copyTeamsData[dragItem.current]
    copyTeamsData.splice(dragItem.current, 1)
    copyTeamsData.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTeamData(copyTeamsData)

    try {


      // const formData = new FormData();
      // formData.append(copyTeamsData)
      //
      // fetch('http://localhost:3000/teams', {
      //   method: 'POST',
      //   body: formData
      // })
      //     .then(response => response.json())
      //     .then(data => toast.success("Team Updated Successfully"))
      //     .catch(error => toast.error(`Error - ${error}`));


      // await api.post(`/teams`, copyTeamsData).then(() => {
      //   toast.success("Team Updated Successfully")
      // })

      // for (const team of copyTeamsData) {
      //   await fetch(`http://localhost:3000/teams/${team.id}`, {
      //     method: 'PUT', // Or 'PUT' if you want to replace the entire resource
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ author: newAuthor }), // Update the 'author' field
      //   });
      // }
      // console.log('All posts updated successfully.');


    } catch(error) {
      toast.error(`Error - ${error}`);
    }

  }


  return <div className="flex flex-col w-full">
      <div className="flex justify-between bg-slate-800 text-white items-center p-3">
        <h2 className="text-gray-900 text-lg font-bold w-full text-white">Team Status</h2>
        <button
            className="bg-sky-600 text-xs rounded-md px-5 py-3 cursor-pointer whitespace-nowrap font-bold"
            onClick={() => navigate('/team-form')}
        >
          Add New Team
        </button>
      </div>
    <Search getSearchText={handleSearchTeam} />

    <ToastContainer />

    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th className="px-2 py-3">
              <input
                  type="checkbox"
                  onChange={handleDeleteAllBtnChange}
              />
            </th>
            <th style={{ width: '400px' }} className="px-2 py-3">Team Name</th>
            <th className="px-2 py-3">Approved by Manager</th>
            <th className="px-2 py-3">Approved by Director</th>
            <th style={{ width: '91px', verticalAlign: 'top' }} className="px-2 py-3">
              {isShowBulkDeleteBtn && (
                  <span
                      className="text-blue-500 cursor-pointer uppercase"
                      onClick={handleDeleteAllTeam}
                  >Delete</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
        {teamData.map((team, index) => (
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
              <td style={{ verticalAlign: 'top' }} className="px-2 py-3">
                  <input
                      type="checkbox"
                      id={team.id}
                      value={team.id}
                      checked={isBulkDelete || checkedTeams.includes(team.id)}
                      onChange={handleCheckboxChange}
                  />
              </td>
              <td style={{ width: '400px', verticalAlign: 'top' }} className="px-2 py-3">
                <div className="flex items-center justify-between">
                  <div>
                     {team.teamName}
                  </div>
                  <div
                      className="cursor-pointer relative"
                      onClick={() => handleToggle(index)}
                  >
                    <span className="arrow-down absolute right-[0px] top-[-4px]" />
                  </div>
                </div>
                {toggleChild === index && (
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                        <tbody>
                        {team.members.map((member, index) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                key={index}
                            >
                              <td className="px-2 py-3">{member.memberName}</td>
                              <td className="px-2 py-3">
                                <span
                                  className="text-blue-500 text-xs cursor-pointer uppercase"
                                  onClick={() => handleTeamEdit(team)}
                                >
                                  Edit
                                </span> |&nbsp;
                                <span
                                  className="text-blue-500 text-xs cursor-pointer uppercase"
                                  onClick={() => handleDeleteMember(team, member)}
                                >
                                  Delete
                                </span>
                              </td>
                            </tr>
                        ))}

                        </tbody>
                      </table>
                    </div>
                )}

              </td>
              <td style={{ verticalAlign: 'top' }} className="px-2 py-3">
                <div className="flex items-center justify-center w-full">
                  {(team.approvedByManager === 0 || team.approvedByManager > 2) && (
                      <GrayIcon team={team} getTeamStatus={handleStatusClickByManager} />
                  )}
                  {team.approvedByManager === 1 && (
                      <ApprovedCheckmarkIcon team={team} getTeamStatus={handleStatusClickByManager} />
                  )}
                  {team.approvedByManager === 2 && (
                      <CrossIcon team={team} getTeamStatus={handleStatusClickByManager} />
                  )}
                </div>
              </td>
              <td style={{ verticalAlign: 'top' }} className="px-2 py-3">
                <div className="flex items-center justify-center w-full">
                  {(team.approvedByDirector === 0 || team.approvedByDirector > 2) && (
                      <GrayIcon team={team} getTeamStatus={handleStatusClickByDirector} />
                  )}
                  {team.approvedByDirector === 1 && (
                      <ApprovedCheckmarkIcon team={team} getTeamStatus={handleStatusClickByDirector} />
                  )}
                  {team.approvedByDirector === 2 && (
                      <CrossIcon team={team} getTeamStatus={handleStatusClickByDirector} />
                  )}
                </div>
              </td>
              <td style={{ width: '91px', verticalAlign: 'top' }} className="px-2 py-3">
                  <span
                      className="text-blue-500 text-xs cursor-pointer uppercase"
                      onClick={() => handleTeamEdit(team)}
                  >
                    Edit
                  </span> |&nbsp;
                  <span
                      className="text-blue-500 text-xs cursor-pointer uppercase"
                      onClick={() => handleDeleteTeam(team)}
                  >
                    Delete
                  </span>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
}

export default HomePage;
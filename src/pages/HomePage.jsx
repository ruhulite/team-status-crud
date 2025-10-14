import {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Search from "../components/Search.jsx";



const HomePage = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [toggleChild, setToggleChild] = useState(null);
  const [checkedTeams, setCheckedTeams] = useState([]);
  const [isShowBulkDeleteBtn, setIsShowBulkDeleteBtn] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);


  const teamDataApi = [
    {
      id: 1,
      teamName: 'Team 1',
      teamDescription: 'Hello Team 1',
      approvedByManager: 0,
      approvedByDirector: 0,
      members: [
        {
          id: 0,
          memberName: "Member 1",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        },
        {
          id: 1,
          memberName: "Member 1 - 2",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        }
      ]
    },
    {
      id: 2,
      teamName: 'Team 2',
      teamDescription: 'Hello Team 2',
      approvedByManager: 1,
      approvedByDirector: 0,
      members: [
        {
          id: 0,
          memberName: "Member 2",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        },
        {
          id: 1,
          memberName: "Member 2 - 1",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        }
      ]
    },
    {
      id: 3,
      teamName: 'Team 3',
      teamDescription: 'Hello Team 3',
      approvedByManager: 0,
      approvedByDirector: 2,
      members: [
        {
          id: 0,
          memberName: "Member 3",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        },
        {
          id: 1,
          memberName: "Member 3-1",
          gender: "male",
          dob: "30 nov 1990",
          contact: '01722117278'
        }
      ]
    }
  ]

  useEffect(() => {
    setTeamData(teamDataApi)
  }, [])


  const handleStatusClick = (team) => {
    setTeamData(prevState =>
        prevState.map(item =>
            item.id === team.id ? { ...item, approvedByManager: team.approvedByManager + 1 } : item
    ));
    toast.success("Team Status Saved")
  }

  const handleDeleteTeam = (team) => {
    const deleteTeam = teamData.filter((item) => item.id !== team.id);
    setTeamData(deleteTeam);
    toast.error("Team Deleted successfully")
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
    const filterSearch = teamDataApi.filter((team) => {
      const searchMatchedTeamName = team.teamName.toLowerCase().includes(text.toLowerCase());
      const searchMatchedMemberName = team.members.some((member) => member.memberName.toLowerCase().includes(text.toLowerCase()));
      return searchMatchedTeamName || searchMatchedMemberName;
    });

    setTeamData(filterSearch);

  }

  const handleEdit = (team) => {
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
      setCheckedTeams([...checkedTeams, parseInt(value)])
      setIsShowBulkDeleteBtn(true)
    } else {
      setCheckedTeams(checkedTeams.filter(item => item !== parseInt(value)))
    }
  }

  useEffect(() => {
    if (checkedTeams.length < 1) {
      setIsShowBulkDeleteBtn(false)
    }
  }, [checkedTeams])

  const handleDeleteAllTeam = () => {
    if (isBulkDelete) {
      setTeamData([]);
      toast.error("Team Deleted successfully")
    } else {
      const filterDelete = teamData.filter(({ id: teamId }) => !checkedTeams.some(id => id === teamId));
      setTeamData(filterDelete);
      toast.error("Team Deleted successfully")
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
          <tr>
            <th className="px-6 py-3">
              <input
                  type="checkbox"
                  onChange={handleDeleteAllBtnChange}
              />
            </th>
            <th className="px-6 py-3">Team Name</th>
            <th className="px-6 py-3">Approved by Manager</th>
            <th className="px-6 py-3">Approved by Director</th>
            <th className="px-6 py-3">
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
            >
              <td className="px-6 py-3">
                <input
                    type="checkbox"
                    id={team.id}
                    value={team.id}
                    checked={isBulkDelete || checkedTeams.includes(team.id)}
                    onChange={handleCheckboxChange}
                />
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <div>
                     {team.teamName}
                  </div>
                  <button
                      className="cursor-pointer"
                      onClick={() => handleToggle(index)}
                  >drop icon</button>
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
                              <td className="px-6 py-3">{member.memberName}</td>
                              <td className="px-6 py-3">
                            <span onClick={() => handleEdit(team)}>
                              Edit |&nbsp;
                            </span>
                                <span onClick={() => handleDeleteMember(team, member)}>
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
              <td className="px-6 py-3 text-center">
                {(team.approvedByManager === 0 || team.approvedByManager > 2) && (
                    <div
                        className="w-[18px] h-[18px] border-[1px] bg-gray-500 border-gray-500 rounded-full cursor-pointer"
                        title={team.approvedByManager === 0 || team.approvedByManager > 2 ? 'Not Been Approved' : ''}
                        onClick={() => handleStatusClick(team)}
                    >&nbsp;</div>
                )}
                {team.approvedByManager === 1 && (
                    <div
                        className="w-[18px] h-[18px] border-[1px] bg-white border-green-500 rounded-full cursor-pointer flex items-center justify-center"
                        title={team.approvedByManager === 1 ? 'Approved' : ''}
                        onClick={() => handleStatusClick(team)}
                    >
                      <svg className="text-green-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                )}
                {team.approvedByManager === 2 && (
                    <div
                        className="w-[18px] h-[18px] border-[1px] bg-white border-red-500 rounded-full cursor-pointer flex items-center justify-center"
                        title={team.approvedByManager === 2 ? 'Not Approved' : ''}
                        onClick={() => handleStatusClick(team)}
                    >
                      <svg className="text-red-500" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/>
                      </svg>
                    </div>
                )}
              </td>
              <td className="px-6 py-3">Icon</td>
              <td className="px-6 py-3">
                  <span
                      className="text-blue-500 cursor-pointer uppercase"
                      onClick={() => handleEdit(team)}
                  >
                    Edit
                  </span> |&nbsp;
                  <span
                      className="text-blue-500 cursor-pointer uppercase"
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
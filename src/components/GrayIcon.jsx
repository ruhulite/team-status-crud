import React from 'react';

const GrayIcon = ({team, getTeamStatus}) => {



    return <div
        className="w-[18px] h-[18px] border-[1px] bg-gray-500 border-gray-500 rounded-full cursor-pointer"
        title={team.approvedByManager === 0 || team.approvedByManager > 2 ? 'Not Been Approved' : ''}
        onClick={() => getTeamStatus(team)}
    >&nbsp;</div>
};

export default GrayIcon;
import React from 'react';

const CrossIcon = ({team, getTeamStatus}) => {
    return <div
        className="w-[18px] h-[18px] border-[1px] bg-white border-red-500 rounded-full cursor-pointer flex items-center justify-center"
        title={team.approvedByManager === 2 ? 'Not Approved' : ''}
        onClick={() => getTeamStatus(team)}
    >
        <svg className="text-red-500" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/>
        </svg>
    </div>
};

export default CrossIcon;
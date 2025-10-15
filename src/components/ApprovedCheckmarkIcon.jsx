import React from 'react';
const ApprovedCheckmarkIcon = ({team, approvedBy, getTeamStatus}) => {
    return <div
        className="w-[18px] h-[18px] border-[1px] bg-white border-green-500 rounded-full cursor-pointer flex items-center justify-center"
        title={approvedBy === 1 ? 'Approved' : ''}
        onClick={() => getTeamStatus(team)}
    >
        <svg className="text-green-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
};

export default ApprovedCheckmarkIcon;
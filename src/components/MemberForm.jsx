import React from 'react';
import Select from "react-select";

const MemberForm = ({memberData, setMemberData}) => {

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ]

    return <>
        {memberData.map((member, index) => (
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={index}
            >
                <td className="px-2 py-3">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded text-xs"
                        value={member.memberName}
                        onChange={(e) => setMemberData({...memberData, memberName: e.target.value})}
                        placeholder="Member Name"
                        required
                    />
                </td>
                <td className="px-2 py-3">
                    <Select
                        className="w-[110px] h-[34px] text-xs"
                        options={genderOptions}
                        value={member.gender}
                        onChange={(e) => setMemberData({...memberData, gender: e})}
                        required
                    />
                </td>
                <td className="px-2 py-3">
                    <input
                        type="date"
                        id="dateInput"
                        className="w-full p-2 border border-gray-300 rounded text-xs"
                        value={member.dob}
                        onChange={(e) => setMemberData({...memberData, dob: e.target.value})}
                        required
                    />
                </td>
                <td className="px-2 py-3">
                    <input
                        id="contact"
                        className="w-full p-2 border border-gray-300 rounded text-xs"
                        name="age"
                        type="number"
                        value={member.contact}
                        onChange={(e) => setMemberData({...memberData, contact: e.target.value})}
                        required
                    />
                </td>
            </tr>
        ))}
    </>
};

export default MemberForm;
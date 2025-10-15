import React from 'react';

const MemberForm = ({memberData, onChangeInput}) => {

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
                        name="memberName"
                        value={member.memberName}
                        onChange={(e) => onChangeInput(e, index)}
                        placeholder="Member Name"
                        required
                    />
                </td>
                <td className="px-2 py-3">
                    <select
                        name="gender"
                        className="w-full p-2 border border-gray-300 rounded text-xs"
                        value={member.gender}
                        onChange={(e) => onChangeInput(e, index)}
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
                        name="dob"
                        value={member.dob}
                        onChange={(e) => onChangeInput(e, index)}
                        required
                    />
                </td>
                <td className="px-2 py-3">
                    <input
                        id="contact"
                        className="w-full p-2 border border-gray-300 rounded text-xs"
                        name="contact"
                        type="number"
                        value={member.contact}
                        onChange={(e) => onChangeInput(e, index)}
                        required
                    />
                </td>
            </tr>
        ))}
    </>
};

export default MemberForm;
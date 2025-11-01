import axios from "axios";

const base = import.meta.env.SERVER_URI || 'http://localhost:5001/api';

export default {
    list: () => axios.get(`${base}/teams`),
    bulkDelete: (ids) => axios.post(`${base}/teams/bulk-delete`, ids),
    reorder: (ids) => axios.post(`${base}/teams/reorder`, ids),
    get: (id) => axios.get(`${base}/teams/${id}`),
    create: (data) => axios.post(`${base}/teams`, data),
    update: (id, data) => axios.put(`${base}/teams/${id}`, data),
    delete: (id) => axios.delete(`${base}/teams/${id}`),
    patchManagerStatus: (id, status) => axios.patch(`${base}/teams/${id}/manager-status`, status),
    patchDirectorStatus: (id, status) => axios.patch(`${base}/teams/${id}/director-status`, status),
    updateMember: (teamId, memberId, data) => axios.patch(`${base}/teams/${teamId}/members/${memberId}`, data),
    deleteMember: (teamId, memberId) => axios.delete(`${base}/teams/${teamId}/members/${memberId}`),
};
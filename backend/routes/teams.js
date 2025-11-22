const express = require('express');
const router = express.Router();

const {
    getTeams,
    createTeam,
    getTeam,
    updateTeam,
    updateManagerStatus,
    updateDirectorStatus,
    deleteTeam,
    bulkDeleteTeam,
    reorderTeam,
    deleteMember,
} = require('../controllers/teams');

router.route('/').get(getTeams).post(createTeam);
router.route('/bulk-delete').post(bulkDeleteTeam);
router.route('/reorder').post(reorderTeam);
router.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);
router.route('/:id/manager-status').patch(updateManagerStatus);
router.route('/:id/director-status').patch(updateDirectorStatus);
router.route('/:id/members/:memberId').delete(deleteMember);

module.exports = router;
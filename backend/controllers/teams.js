const asyncHandler = require('express-async-handler')
const Teams = require('../models/teams');

// @desc Get all Teams
// @route GET /api/teams
// @access public

const getTeams = asyncHandler(async (req, res) => {
    const teams = await Teams.find().sort({order: 1, createdAt: 1});
    if (!teams) {
        res.status(404)
        throw new Error('No team found');
    }
    res.status(200).json(teams);
})

// @desc Create Team
// @route POST /api/teams
// @access public

const createTeam = asyncHandler (async(req, res) => {
    const body = req.body;
    const max = await Teams.findOne().sort({order: -1});
    body.order = max ? max.order + 1 : 1;
    const team = new Teams(body);

    try {
        await team.save();
        res.status(200).json(team);
    } catch (err) {
        res.status(400)
        throw new Error(`Error creating team: ${err.message}`);
    }
})

// @desc Get a Team
// @route GET /api/teams/:id
// @access public

const getTeam = asyncHandler(async (req, res) => {
    const team = await Teams.findById(req.params.id);

    if (!team) {
        res.status(404)
        throw new Error(`Could not find team with ID: ${req.params.id}`);
    }
    res.status(200).json(team);
})

// @desc Update a Team
// @route PUT /api/teams/:id
// @access public

const updateTeam = asyncHandler(async (req, res) => {
    const team = await Teams.findById(req.params.id);
    if (!team) {
        res.status(404)
        throw new Error(`Could not find team with ID: ${req.params.id}`);
    }
    const update = await Teams.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(update);
})

// @desc Update Manager status
// @route PATCH /api/teams/:id/manager-status
// @access public
const updateManagerStatus = asyncHandler(async (req, res) => {

    try {
        const teamId = req.params.id;
        const { approvedByManager } = req.body;

        if (!approvedByManager) {
            return res.status(400).json({ message: 'Missing approvedByManager in request body.' });
        }

        const updateObject = {
            $set: {
                ['approvedByManager']: approvedByManager
            }
        };

        const updatedItem = await Teams.updateOne({ _id: teamId }, updateObject);

        if (updatedItem.nModified === 0) {
            return res.status(404).json({ message: 'Item not found or no changes made.' });
        }

        res.status(200).json({ message: 'Status updated successfully.', updatedItem });

    } catch (error) {
        res.status(500).json({ message: `Server error ${error}` });
    }

})

// @desc Update Director status
// @route PATCH /api/teams/:id/director-status
// @access public
const updateDirectorStatus = asyncHandler(async (req, res) => {

    try {
        const teamId = req.params.id;
        const { approvedByDirector } = req.body;

        if (!approvedByDirector) {
            return res.status(400).json({ message: 'Missing approvedByDirector in request body.' });
        }

        const updateObject = {
            $set: {
                ['approvedByDirector']: approvedByDirector
            }
        };

        const updatedItem = await Teams.updateOne({ _id: teamId }, updateObject);

        if (updatedItem.nModified === 0) {
            return res.status(404).json({ message: 'Item not found or no changes made.' });
        }

        res.status(200).json({ message: 'Status updated successfully.', updatedItem });

    } catch (error) {
        res.status(500).json({ message: `Server error ${error}` });
    }
})


// @desc Delete a Team
// @route DELETE /api/teams/:id
// @access public

const deleteTeam = asyncHandler(async (req, res) => {
    const team = await Teams.findById(req.params.id);
    if (!team) {
        res.status(404)
        throw new Error(`Could not find team with ID: ${req.params.id}`);
    }
    const deleteTeam = await Teams.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteTeam);
})

// @desc Delete All Team
// @route DELETE /api/teams
// @access public

const bulkDeleteTeam = asyncHandler(async (req, res) => {

    try {
        const ids = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty list of team IDs' });
        }

        const result = await Teams.deleteMany({
            _id: { $in: ids }
        });

        res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} teams`,
            deletedCount: result.deletedCount,
            acknowledged: result.acknowledged
        });

    } catch (error) {
        res.status(500).json({ message: `Server error ${error}` });
    }
})

// @desc Reorder All Team
// @route POST /api/teams/reorder
// @access public

const reorderTeam = asyncHandler(async (req, res) => {
    const ids = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        res.status(404)
        throw new Error(`Ids array required`);
    }
    const bulk = ids.map((id, idx) => ({
        updateOne: {
            filter: {_id: id},
            update: {order: idx + 1}
        }
    }))
    const result = await Teams.bulkWrite(bulk)
    if (!result) {
        res.status(404)
        throw new Error(`Server error while re-ordering items`);
    } else {
        res.status(200).json(result);
    }
})

// @desc Delete member
// @route DELETE /api/teams/:id/members/:memberId
// @access public
const deleteMember = asyncHandler(async (req, res) => {
    const memberDelete = await Teams.updateOne(
        { "_id": req.params.id },
        { $pull: { "members": { "_id": req.params.memberId } } }
    )
    res.status(200).json(memberDelete);
})

module.exports = {
    getTeams,
    createTeam,
    getTeam,
    updateTeam,
    updateManagerStatus,
    updateDirectorStatus,
    deleteTeam,
    bulkDeleteTeam,
    reorderTeam,
    deleteMember
}



















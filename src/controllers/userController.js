const { getAllUsers, updateUserRole } = require('../models/userModel');

async function listUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function changeUserRole(req, res) {
    try {
        const { id } = req.params;
        const { role_id } = req.body;

        if (!role_id) {
            return res.status(400).json({ message: 'role_id is required' });
        }

        const updatedUser = await updateUserRole(id, role_id);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    listUsers,
    changeUserRole,
};
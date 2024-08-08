import express from 'express';
import GroupModel from '../models/groups.model.js';

const router = express.Router();

// Route to create a new group
router.post('/groups', async (req, res) => {
	const { name, initials, bg } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Name is required' });
	}

	try {
		const newGroup = new GroupModel({
			name,
			initials,
			bg,
		});

		const savedGroup = await newGroup.save();

		res.status(201).json(savedGroup);
	} catch (error) {
		console.error('Error creating group:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Route to fetch all groups
router.get('/groups', async (req, res) => {
	try {
		const groups = await GroupModel.find(); // Fetch all groups from MongoDB
		res.status(200).json(groups);
	} catch (error) {
		console.error('Error fetching groups:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Route to add a new note to a group
router.post('/groups/:id/notes', async (req, res) => {
	const { id } = req.params;
	const { text, createdAt } = req.body;
	console.log('req body', req.body);

	try {
		const group = await GroupModel.findById(id);

		if (!group) {
			return res.status(404).json({ error: 'Group not found' });
		}

		group.notes.push({ text, createdAt });
		await group.save();

		res.status(200).json(group);
	} catch (error) {
		console.error('Error adding note:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Route to get notes for a specific group
router.get('/groups/:id/notes', async (req, res) => {
	const { id } = req.params;

	try {
		const group = await GroupModel.findById(id);

		if (!group) {
			return res.status(404).json({ error: 'Group not found' });
		}

		res.status(200).json(group.notes);
	} catch (error) {
		console.error('Error fetching notes:', error);
		res.status(500).json({ Error: 'Internal server error' });
	}
});

export default router;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
	// id: { type: String },
	text: { type: String },
	createdAt: { type: String },
});

const GroupSchema = new Schema({
	name: { type: String },
	initials: { type: String },
	bg: { type: String, default: '#ffffff' },
	notes: [NoteSchema],
});

export default mongoose.model('GroupModel', GroupSchema);

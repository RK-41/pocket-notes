import { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function Home() {
	const [groups, setGroups] = useState([
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#aaaaaa',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
	]);
	const [activeGroup, setActiveGroup] = useState(null);
	const [newText, setNewText] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		addNoteToGroup({
			id: activeGroup._id,
			text: newText,
			createdAt: formatDate(),
		});
		setNewText('');
	};

	const handleActiveGroup = (gr) => {
		setActiveGroup(gr);
	};

	const fetchNotes = useCallback(async (groupId) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:8000/api/groups/${groupId}/notes`
			);
			setActiveGroup((prevGroup) => ({
				...prevGroup,
				notes: response.data,
			}));
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	const addNoteToGroup = useCallback(async ({ id, text, createdAt }) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/api/groups/${id}/notes`,
				{ text, createdAt }
			);
			setActiveGroup((prevGroup) => ({
				...prevGroup,
				notes: response.data.notes,
			}));
		} catch (error) {
			console.error('Error adding note:', error);
		}
	}, []);

	useEffect(() => {
		console.log(activeGroup);
		if (activeGroup) fetchNotes(activeGroup._id);
	}, [fetchNotes]);

	useEffect(() => {}, [addNoteToGroup]);

	const formatDate = () => {
		const timestamp = Date.now();
		const date = new Date(timestamp);
		let day = String(date.getDate()).padStart(2, '0');
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();

		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;

		const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
		console.log(formattedDate);
		return formattedDate;
	};

	return (
		<div className='home'>
			<div className='sidebar'>
				<Sidebar
					groups={groups}
					setGroups={setGroups}
					setActiveGroup={setActiveGroup}
					handleActiveGroup={handleActiveGroup}
				/>
			</div>
			<main className='main'>
				{/* NOTES SECTION */}
				<section className='notes-area'>
					{!activeGroup ? (
						<div>Not selected</div>
					) : (
						<div>
							<header className='notes-area-header'>
								<div
									className='group-initial'
									style={{ backgroundColor: activeGroup.bg }}
								>
									{activeGroup.initials}
								</div>
								<h2>{activeGroup.name}</h2>
							</header>
							{loading ? (
								<p>Loading notes...</p>
							) : (
								activeGroup.notes &&
								activeGroup.notes.map((note, index) => (
									<div key={index}>
										<p>{note.text}</p>
										<p>{note.createdAt}</p>
										<br />
									</div>
								))
							)}
							<hr />
						</div>
					)}
				</section>

				{/* CREATE NOTE SECTION */}
				<section className='create-note'>
					<form onSubmit={handleSubmit}>
						<textarea
							name='new-note'
							id='new-note'
							value={newText}
							onChange={(e) => setNewText(e.target.value)}
							required
						></textarea>
						<button type='submit' disabled={newText.length === 0}>
							Create
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Home;

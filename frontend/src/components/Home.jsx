/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function Home() {
	const [groups, setGroups] = useState([
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
		{
			id: '1',
			name: 'dummy group',
			initials: 'DG',
			bg: '#fef',
			notes: [{ text: 'notes notes...', createdAt: '3 Aug 2024 7:37 PM' }],
		},
	]);
	const [activeGroup, setActiveGroup] = useState(null);
	const [newText, setNewText] = useState('');
	const [loading, setLoading] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		addNoteToGroup({
			id: activeGroup._id,
			text: newText,
			createdAt: formatDate(),
		});
		setNewText('');
	};

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

		const formattedDate = `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
		// console.log(formattedDate);
		return formattedDate;
	};

	const handleActiveGroup = (gr) => {
		setActiveGroup(gr);
	};

	// FETCH NOTES
	const fetchNotes = useCallback(async (groupId) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
				}/api/groups/${groupId}/notes`
			);
			setActiveGroup((prevGroup) => ({
				...prevGroup,
				notes: response.data,
			}));

			console.log('notes:', response.data);
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	// ADD NOTES
	const addNoteToGroup = useCallback(async ({ id, text, createdAt }) => {
		try {
			const response = await axios.post(
				`${
					import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
				}/api/groups/${id}/notes`,
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

	// USE EFFECTS
	useEffect(() => {
		console.log(activeGroup);
		if (activeGroup) fetchNotes(activeGroup._id);
	}, [fetchNotes]);

	useEffect(() => {}, [activeGroup, addNoteToGroup]);

	useEffect(() => {
		if (window.innerWidth <= 576) setSidebarOpen(false);
	}, []);

	return (
		<div className='home'>
			<div
				className={
					sidebarOpen ? 'sidebar-container open' : 'sidebar-container closed'
				}
			>
				<header className='header'>
					<h1 className='heading'>{sidebarOpen ? 'Pocket Notes' : 'PN'}</h1>
					{/* <button
						className='sidebar-toggle-btn'
						onClick={() => setSidebarOpen((curr) => !curr)}
					>
						{sidebarOpen ? '<' : '>'}
					</button> */}
				</header>

				{/* {sidebarOpen && ( */}
				<section
					className={
						sidebarOpen ? 'sidebar-section open' : 'sidebar-section closed'
					}
				>
					<button
						className='sidebar-toggle-btn'
						onClick={() => setSidebarOpen((curr) => !curr)}
					>
						{sidebarOpen ? '<' : '>'}
					</button>
					<Sidebar
						groups={groups}
						setGroups={setGroups}
						setActiveGroup={setActiveGroup}
						handleActiveGroup={handleActiveGroup}
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>
				</section>
				{/* )} */}
			</div>

			<main className='main'>
				{/* NOTES SECTION */}
				<section className='notes-section'>
					{!activeGroup ? (
						<div className='message'>
							<button
								className='message-btn'
								onClick={() => setSidebarOpen(true)}
							>
								Select a group!
							</button>
						</div>
					) : (
						<div className='notes-area'>
							<header className='notes-area-header'>
								<div
									className='group-initials'
									style={{ backgroundColor: activeGroup.bg }}
								>
									{activeGroup.initials}
								</div>
								<h2 className='group-name'>{activeGroup.name}</h2>
							</header>

							<div className='notes-container custom-scrollbar'>
								{loading ? (
									<p>Loading notes...</p>
								) : (
									activeGroup.notes &&
									activeGroup.notes.toReversed().map((note, index) => (
										<div key={index} className='notes'>
											<p className='notes-text'>{note.text}</p>
											<p className='creation-date'>{note.createdAt}</p>
											<hr />
										</div>
									))
								)}
							</div>
						</div>
					)}
				</section>

				{/* CREATE NOTE SECTION */}
				<section className='create-note'>
					<form onSubmit={handleSubmit} className='create-note-form'>
						<textarea
							name='new-note'
							id='new-note'
							placeholder='Once upon a time...'
							value={newText}
							onChange={(e) => setNewText(e.target.value)}
							required
							disabled={!activeGroup}
						></textarea>
						<button
							type='submit'
							disabled={newText.length === 0}
							className='submit-btn'
						>
							Create Note
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Home;

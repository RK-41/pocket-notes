/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import CreateNewGroupModal from './CreateNewGroupModal';
import axios from 'axios';

function Sidebar({ groups, setGroups, setActiveGroup, handleActiveGroup }) {
	const [bg, setBg] = useState('');
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalClose = () => {
		setModalOpen(false);
	};

	// FETCH GROUPS
	const fetchGroups = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/groups`
			);

			console.log('Fetched groups:', response.data);

			setGroups(() => response.data);
			// setNotes(response.data.notes);
			console.log('notes:', response.data.notes);
		} catch (error) {
			console.error('Error fetching groups:', error);
		}
	}, [setGroups]);

	// CREATE NEW GROUP
	const createNewGroup = useCallback(
		async (obj) => {
			let nameArr = obj.groupName.trim().split(' ');
			let initials = nameArr[0][0];

			if (nameArr.length > 1) {
				initials += nameArr[nameArr.length - 1][0];
			}

			initials = initials.toUpperCase();

			const newGr = {
				name: obj.groupName,
				initials: initials,
				bg: obj.groupColor,
			};

			console.log(newGr);
			setGroups([...groups, newGr]);

			try {
				const response = await axios.post(
					`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/groups`,
					newGr
				);
				console.log('Group Added.', response);
				setGroups([...groups, response.data]);
				console.log(groups.length, groups);
			} catch (error) {
				console.log('Error adding group.', error);
			}
		},
		[groups, setGroups]
	);

	useEffect(() => {
		fetchGroups();
	}, []);

	return (
		<div style={{ backgroundColor: bg }}>
			<h1 className='sidebar-heading'>Pocket Notes</h1>

			<ul>
				{groups &&
					groups.map((group, index) => (
						<li
							key={index}
							className='group'
							onClick={() => {
								// setBg(group.bg);
								// setActiveGroup(group);
								handleActiveGroup(group);
							}}
						>
							<div
								className='group-initial'
								style={{ backgroundColor: group.bg }}
							>
								{group.initials}
							</div>
							<p className='group-name'>{group.name}</p>
						</li>
					))}
			</ul>

			<button onClick={() => setModalOpen(true)} className='create-group-btn'>
				Create Gr
			</button>

			{modalOpen &&
				createPortal(
					<CreateNewGroupModal
						handleModalClose={handleModalClose}
						createNewGroup={createNewGroup}
					/>,
					document.body
				)}
		</div>
	);
}

export default Sidebar;

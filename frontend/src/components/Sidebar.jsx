/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import CreateNewGroupModal from './CreateNewGroupModal';
import axios from 'axios';

function Sidebar({
	groups,
	setGroups,
	handleActiveGroup,
	sidebarOpen,
	setSidebarOpen,
}) {
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

			handleActiveGroup(null);
			setGroups(() => response.data);
			console.log('Fetched response:', response);
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
		<div style={{ backgroundColor: bg }} className='sidebar'>
			<div className='groups-container custom-scrollbar'>
				<ul>
					{groups &&
						groups.map((group, index) => (
							<li
								key={index}
								className='group'
								onClick={() => {
									handleActiveGroup(group);
									if (window.innerWidth <= 576) setSidebarOpen(false);
								}}
							>
								<div
									className='group-initials'
									style={{ backgroundColor: group.bg }}
								>
									{group.initials}
								</div>
								{sidebarOpen && <p className='group-name'>{group.name}</p>}
							</li>
						))}
				</ul>
			</div>

			<button onClick={() => setModalOpen(true)} className='create-group-btn'>
				{sidebarOpen ? 'Create Group' : '➕'}
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

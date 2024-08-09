/* eslint-disable react/prop-types */
import { useState } from 'react';

function CreateNewGroupModal({ handleModalClose, createNewGroup }) {
	const [groupName, setGroupName] = useState('');
	const [groupColor, setGroupColor] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		createNewGroup({ groupName, groupColor });
	};

	return (
		<div
			className='modal-container'
			onClick={(e) => {
				if (e.target.className === 'modal-container') {
					handleModalClose();
				}
			}}
		>
			<div className='modal' id='create-group-modal'>
				<h1>Create New Group</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='group-name'>Group Name</label>
					<input
						type='text'
						name='group-name'
						id='group-name'
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						required
					/>

					<h3>Group Color</h3>
					<button
						type='button'
						onClick={() => setGroupColor('#ffffff')}
						className='group-color-btn'
						id='color-0'
					></button>
					<button
						type='button'
						onClick={() => setGroupColor('#ff1122')}
						className='group-color-btn'
						id='color-1'
					></button>
					<button
						type='button'
						onClick={() => setGroupColor('#ffff22')}
						className='group-color-btn'
						id='color-2'
					></button>
					<button
						type='button'
						onClick={() => setGroupColor('#00aa22')}
						className='group-color-btn'
						id='color-3'
					></button>
					<button
						type='button'
						onClick={() => setGroupColor('#00aaff')}
						className='group-color-btn'
						id='color-4'
					></button>

					<button type='submit'>Create</button>
				</form>

				<p>Group Name: {groupName}</p>
				<div>
					Color: {groupColor}{' '}
					<p
						style={{
							backgroundColor: groupColor,
							width: '100px',
							height: '30px',
						}}
					></p>
				</div>

				<button onClick={() => handleModalClose()}>Close</button>
			</div>
		</div>
	);
}

export default CreateNewGroupModal;

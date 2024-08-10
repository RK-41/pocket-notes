/* eslint-disable react/prop-types */
import { useState } from 'react';

function CreateNewGroupModal({ handleModalClose, createNewGroup }) {
	const [groupName, setGroupName] = useState('');
	const [groupColor, setGroupColor] = useState('#ffffff');

	const handleSubmit = (e) => {
		e.preventDefault();
		createNewGroup({ groupName, groupColor });
		e.target.reset();
		handleModalClose();
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
				<h1 className='modal-heading'>Create New Group</h1>

				<form onSubmit={handleSubmit} className='modal-form'>
					<div className='form-inputs'>
						<label htmlFor='group-name'>Group Name</label>
						<input
							type='text'
							name='group-name'
							id='group-name'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							required
						/>

						<label htmlFor='color-picker'>Group Color</label>
						<input
							type='color'
							id='color-picker'
							name='color-picker'
							value={groupColor}
							onChange={(e) => setGroupColor(e.target.value)}
							className='color-picker-input'
						/>
					</div>

					<button type='submit' className='create-group-btn'>
						Create Group
					</button>
				</form>

				<button onClick={() => handleModalClose()} className='close-btn'>
					X
				</button>
			</div>
		</div>
	);
}

export default CreateNewGroupModal;

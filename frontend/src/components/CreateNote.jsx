function CreateNote() {
	return (
		<div>
			CreateNote
			<form>
				<textarea name='new-note' id='new-note'></textarea>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreateNote;

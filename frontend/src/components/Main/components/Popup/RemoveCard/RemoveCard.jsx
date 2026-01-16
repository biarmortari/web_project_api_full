function RemoveCard({ onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <form
      className="popup__form popup__form_confirmation"
      id="popup__form_confirmation"
      name="popup__form_confirmation"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="popup__save-button popup__save-button_confirmation"
      >
        Sim
      </button>
    </form>
  );
}

export default RemoveCard;

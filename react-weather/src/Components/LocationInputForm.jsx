const LocationInputForm = ({ handleSubmit, handleReturn }) => {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Enter location..."
        id="name"
        onKeyDown={handleReturn}
      />
      <label htmlFor="name" className="form__label">
        Enter location...
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LocationInputForm;

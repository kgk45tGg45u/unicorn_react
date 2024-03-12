export const Form = ({ inputs, buttons, action }) => {
  const capitalize = (name) => {
    return name[0].toUpperCase() + name.slice(1)
  }

  const formInput = inputs.map((input) => (
    <div className="form-outline mb-4" key={input.name}>
      <label className="form-label" htmlFor={input.name}>
        {capitalize(input.name)}
      </label>
      <input
        type={input.type}
        name={input.name}
        id={input.name}
        className="form-control"
        onChange={input.onChange}
      />
    </div>
  ));

  const formButtons = buttons.map((button, index) => (
    <button key={index} type="submit" className="btn btn-primary btn-block mb-4">
      {button}
    </button>
  ));

  return (
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form onSubmit={action}>
          {formInput}
          {formButtons}
        </form>
      </div>
    </div>
  );
};

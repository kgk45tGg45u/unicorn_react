import '../assets/wizard.css'

export const Wizard = () => {
  return (
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        <form>
          <div className="m-4 text-white">
            <label className="fs-5 mb-2" for="fullName" class="form-label">Full name</label>
            <input type="text" id="fullName" name="name" className="form-control" />
              <div className="form-text text-white">
                Your full name will be confirmed with your ID through a confirmation process.
              </div>
          </div>
              <button className="m-4 btn btn-secondary">Next</button>
        </form>
      </div>
    </div>
  )
}

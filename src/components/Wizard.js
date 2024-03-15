import { useState, useRef, useEffect } from 'react'
import '../assets/wizard.css'

export const Wizard = () => {
  const [data, setData] = useState({})
  const [nextActive, setNextActive] = useState(0)
  const [submitButton, setSubmitButton] = useState(false)
  const wname = useRef()
  const working = useRef()

  useEffect(() => {
    console.log(data)
    console.log(working)
  }, [data])

  const next = (e) => {
    e.preventDefault()
    const nameValue = wname.current.value.trim(); // Accessing the current value of the input field and trimming any leading or trailing whitespace
    const nameParts = nameValue.split(" "); // Splitting the name into parts

    if (nameParts.length > 1) { // Checking if the name has minimum two parts
      setData({
        name: nameValue,
      })
      if(nextActive === 0) {
        setNextActive(1)
        setSubmitButton(true)
      }
    }
  }

  const workingRadio = () => {
    if (working.current.checked) {
      setNextActive(1)
      setSubmitButton(false)
    } else {
      setSubmitButton(true)
    }
  }

  return (
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        <form>
          <div className="m-4 text-white">
            <h1>Personal Data</h1>
            <label className="fs-5 mb-2 form-label" htmlFor="fullName">Full name</label>
            <input type="text" id="fullName" name="name" ref={wname} className="form-control" />
              <div className="form-text text-white">
                Your full name will be confirmed with your ID through a confirmation process.
              </div>

              <div className="form-check form-switch">
                <input ref={working} className={(nextActive >= 1) ? "form-check-input mt-4" : "form-check-input visually-hidden mt-4"} onChange={workingRadio} type="checkbox" id="flexSwitchCheckReverse" />
                <label className={(nextActive >= 1) ? "form-check-label mt-4" : "form-check-label visually-hidden mt-4"} for="flexSwitchCheckReverse">I am currently providing a product or service to public.</label>
              </div>





          </div>
          {submitButton?
            <button className="m-4 btn btn-secondary">Submit</button>
            :
            <button onClick={next} className="m-4 btn btn-secondary">Next</button>
          }
        </form>
      </div>
    </div>
  )
}

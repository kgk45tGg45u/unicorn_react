import { useState, useRef, useEffect } from 'react'
import '../assets/wizard.css'

export const Wizard = () => {
  const [data, setData] = useState({})
  const nextActive = [0]
  const [submitButton, setSubmitButton] = useState(false)
  const [products, setProducts] = useState({})
  const wname = useRef()
  const working = useRef()
  const hasProduct = useRef()
  const p1name = useRef()
  const hasService = useRef()

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
      if(nextActive.includes(0)) {
        nextActive.push(1)
        setSubmitButton(true)
      }
    }
  }

  const workingRadio = () => {
    if (working.current.checked) {
      nextActive.push(2)
      setSubmitButton(false)
    } else {
      setSubmitButton(true)
    }
  }

  const hasProductRadio = () => {
    if (hasProduct.current.checked) {
      nextActive.push(3)
    }
    // else {
    //   setNextActive(6)
    // }
  }

  const next2 = (e) => {
    e.preventDefault()
    const productName = p1name.current.value
      setProducts({
        name: productName,
      })
    nextActive.push(4)
  }

  const addProduct = (e) => {
    e.preventdefault()

  }

  const hasServiceRadio = (e) => {
    e.preventDefault()
    if (hasService.current.checked) {
      nextActive.push(5)
    } else {
      nextActive.push(6)
    }
  }

  return (
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        <form>
          <div className="m-4 text-white">
            <h2>Personal Data</h2>
            <label className="fs-5 mb-2 form-label font-weight-bold" htmlFor="fullName">Full name</label>
              <div className="row">
                <input type="text" id="fullName" name="name" ref={wname} className="col-9 mx-2" />
                {nextActive.includes(0) ?
                <div className="col-2">
                  <button onClick={next} className="btn btn-secondary">Next</button>
                </div>
                : ""}
                  <div className="form-text text-white">
                    Your full name will be confirmed with your ID through a confirmation process.
                  </div>
               </div>
              <div className="form-check form-switch">
                <input ref={working} className={(nextActive.includes(0) ||  nextActive.includes(1) || nextActive.includes(2) || nextActive.includes(3) || nextActive.includes(4) ) ? "form-check-input mt-4" : "form-check-input visually-hidden mt-4"} onChange={workingRadio} type="checkbox" id="currentlyproductyesno" />
                <label className={(nextActive > 0 && nextActive <= 4) ? "form-check-label mt-4" : "form-check-label visually-hidden mt-4"} htmlFor="currentlyproductyesno">I am currently providing a product or service to public.</label>
              </div>

              <div className="form-check form-switch">
                <input ref={hasProduct} className={(nextActive > 1 && nextActive <= 5) ? "form-check-input mt-4" : "form-check-input visually-hidden mt-4"} type="checkbox" id="producesproduct" onChange={hasProductRadio} />
                <label className={(nextActive > 1 && nextActive <= 5) ? "form-check-label mt-4" : "form-check-label visually-hidden mt-4"} htmlFor="producesproduct">I produce a product.</label>
              </div>

              <div>
                <label className={nextActive === 3 ? "fs-5 my-3 form-label" : "fs-5 my-3 form-label visually-hidden"} htmlFor="p1name">Full product name</label>
                <div className="row">
                  <input type="text" id="p1name" name="p1name" ref={p1name} className={nextActive === 3 ? "col-8 mx-2" : "col-9 mx-2 visually-hidden"} />

                  <div className="col-1">
                    <button onClick={next2} className={nextActive === 3 ? "btn btn-secondary" : "btn btn-secondary visually-hidden"}>Next</button>
                  </div>
                  <div className="col-2">
                    <button onClick={addProduct} className={nextActive === 3 ? "btn btn-secondary" : "btn btn-secondary visually-hidden"}>+ Product</button>
                  </div>
                </div>
              </div>

              <div className="form-check form-switch">
                <input ref={hasService} className={(nextActive > 3) ? "form-check-input mt-4" : "form-check-input visually-hidden mt-4"} type="checkbox" id="hasservice" onChange={hasServiceRadio} />
                <label className={(nextActive > 3 && nextActive <= 4) ? "form-check-label mt-4" : "form-check-label visually-hidden mt-4"} htmlFor="hasservice">I offer a service.</label>
              </div>



          </div>
          {submitButton?
            <button className="m-4 btn btn-secondary">Submit</button>
            :
            ""
          }

          {/* Create a "start over" button */}
        </form>
      </div>
    </div>
  )
}

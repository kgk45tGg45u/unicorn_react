import { useState, useRef, useEffect } from 'react'
import '../assets/wizard.css'

export const UserWizard = () => {
  const properties = {
    grand_label: "Full Name",
    input_id: "fullname",
    input_type: "text",
    options: {},
    option_labels: {},
    button_label: "",
    action_button_label: "Next",
    action_button_function: ""
  }

  const smallAction = () => {

  }

  const action = () => {

  }


  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        <div className="my-3 mx-4 text-white">
          <h2>Personal Data</h2>
        </div>

        <form class="form-inline my-3 mx-4">
          <div class="form-group mx-sm-3 mb-2">
            <label for={properties.input_id} class="sr-only text-white my-3">{properties.grand_label}</label>
            <input type={properties.input_type} class="form-control" id={properties.input_id} />
          </div>
          <button type="submit" class="btn btn-primary mt-5 mb-3">{properties.action_button_label}</button>
        </form>

      </div>
    </div>
  )
}

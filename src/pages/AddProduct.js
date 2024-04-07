import { useState, useEffect } from 'react'
import { useFetch } from "../hooks/useFetch"
import { Loading } from '../components/Loading'
import newIntermediateProduct from '../assets/SVG/square-plus-solid.svg'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const AddProduct = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const {result, loading, error} = useFetch(currentUser.id, "", "councils", "GET")
  const [openNewIntermediateProduct, setOpenNewIntermediateProduct] = useState(false);
  const handleOpen = () => setOpenNewIntermediateProduct(true);
  const handleClose = () => setOpenNewIntermediateProduct(false);

  const newIntermediateProductstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [inputFields, setInputFields] = useState({
    productName: "",
    productModel: "",
    productActive: "",
    productUnit: "",
    productDirectWork: null,
    productIntermediateName: "",
    productIntermediateSource: "",
    productIntermediateUnit: null
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.productName && inputValues.productName.length < 3) {
      errors.productName = "Product name is too short!";
    }
    if (!inputValues.productModel && inputValues.productModel.length < 1) {
      errors.productModel = "Product model is too short!";
    }
    if (!inputValues.productActive) {
      errors.productActive = "Are you actively producing or not?";
    }
    if (!inputValues.productUnit || inputValues.Unit.length < 1) {
      errors.productUnit = "Please enter the unit of measurement for this product.";
    }
    if (!inputValues.productDirectWork) {
      errors.productDirectWork = "Enter the number of hours necessary to produce this product. Units can be less than 1.";
    }
    if (inputValues.productIntermediateName && inputValues.productIntermediateName.length < 3) {
      errors.productIntermediateName = "The name of the intermediate product needed to produce this product is too short.";
    }
    if (!inputValues.productIntermediateSource) {
      errors.productIntermediateSource = "Please enter the name of the producer of this intermediate product.";
    }
    if (inputValues.productIntermediateUnit && inputValues.productIntermediateUnit.length < 1) {
      errors.productIntermediateUnit = "Please enter the unit corresponding to this intermediate product.";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    console.log(inputFields);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  if (loading){
    return(
      <Loading />
    )
  }

  if (error){
    return(
      <div>{error.message}</div>
    )
  }

  if (result && result.council.responsible_id === currentUser.id){
  return (
    <div className="container">
    <div className="edit_user">
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
      <form onSubmit={handleSubmit}>


        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productName"
          >
            Product name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productName ? "1px solid red" : null }}
          />
        </div>
        {errors.productName ? (
          <p className="error">Product name is too short.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productModel"
          >
            Model
          </label>
          <input
            type="text"
            name="productModel"
            id="productModel"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productModel ? "1px solid red" : null }}
          />
        </div>
        {errors.productModel ? (
          <p className="error">Product model is too short.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productActive"
          >
            Is the product actively produced?
          </label>
          <input
            type="text"
            name="productActive"
            list="productActiveOptions"
            placeholder="Click to choose..."
            id="productActive"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productActive ? "1px solid red" : null }}
          />
          <datalist id="productActiveOptions">
            <option value="Yes" />
            <option value="No" />
          </datalist>
        </div>
        {errors.productActive ? (
          <p className="error">Please choose an option!</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productUnit"
          >
            Unit
          </label>
          <input
            type="text"
            name="productUnit"
            id="productUnit"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productUnit ? "1px solid red" : null }}
          />
        </div>
        {errors.productUnit ? (
          <p className="error">Enter the unit of the product correctly!</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productDirectWork"
          >
            Direct work needed to produce this product
          </label>
          <input
            type="text"
            name="productDirectWork"
            id="productDirectWork"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productDirectWork ? "1px solid red" : null }}
          /> hours
        </div>
        {errors.productDirectWork ? (
          <p className="error">Enter the number of hours needed to produce this product.</p>
        ) : null}

        <div className="card">
          <div className="card-header">
            Input for 1 unit of the product
          </div>
          <div className="card-body">
            <img onClick={handleOpen} className="ticketing_menu pointer" src={newIntermediateProduct} alt='Add a new input for your putput product' />

          </div>
        </div>



      <button className="mt-4 btn btn-primary" type="submit">Save information</button>
    </form>




     {/* New ticket modal */}
     <div>
        <Modal
          open={openNewIntermediateProduct}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={newIntermediateProductstyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please enter the information about the intermediate product needed to produce this product.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productIntermediateName"
          >
            Name of intermediate product
          </label>
          <input
            type="text"
            name="productIntermediateName"
            id="productIntermediateName"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productIntermediateName ? "1px solid red" : null }}
          />
        </div>
        {errors.productIntermediateName ? (
          <p className="error">Wrong intermediate product name.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productIntermediateSource"
          >
            Produced by
          </label>
          <input
            type="text"
            name="productIntermediateSource"
            id="productIntermediateSource"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.productIntermediateSource ? "1px solid red" : null }}
          />
        </div>
        {errors.productIntermediateSource ? (
          <p className="error">The name of the producer is wrong!</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="productIntermediateUnit"
          >
            Unit
          </label>
          <input
          className="form-control"
          list="productIntermediateUnitOptions"
          id="productIntermediateUnit"
          name="productIntermediateUnit"
          onChange={handleChange}
          placeholder="Type to search..."
          style={{ border: errors.productIntermediateUnit ? "1px solid red" : null }}
          />
          <datalist id="productIntermediateUnitOptions">
            <option value="number" />
            <option value="KG" />
            <option value="meters" />
          </datalist>
        </div>
        {errors.productIntermediateUnit ? (
          <p className="error">Please choose a disability</p>
        ) : null}

        <button className="mt-4 btn btn-primary" type="submit">Add</button>

            </Typography>
          </Box>
        </Modal>
      </div>




  </div>
  </div>
  )
}
}

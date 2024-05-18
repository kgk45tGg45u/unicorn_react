import { useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { Box, Modal, Slider, Button } from "@mui/material";
import { gql, useMutation } from '@apollo/client';
import AvatarEditor from "react-avatar-editor";
import "../assets/Cropper.scss";
import profilePlaceholder from '../assets/SVG/Unicorn_openmoji.svg'
const user = localStorage.getItem("user")
const ADD_USER_AVATAR = gql`
  mutation ($file: Upload!) {
    uploadAvatar(file: $file)
  }
`;
// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

// Modal
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  const [updateAvatar, { data, loading, error }] = useMutation(ADD_USER_AVATAR)
  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      // Save image to server using GraphQL mutation
      try {
        const { data } = await updateAvatar({
          variables: {
            // id: user.id,
            file: blob
          }
        });
        // Handle response from server if necessary

      //   // Update UI with preview
        setPreview(URL.createObjectURL(blob));
        console.log(URL.createObjectURL(blob))
        setModalOpen(false);
      } catch (error) {
        // Handle error
        console.error('Error saving profile picture:', error);
      }
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan"
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black"
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Container
const Cropper = () => {
  const [hidden, setHidden] = useState(true)
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <>
      <main className="container">
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <div
          className="img-container"
          style={{ position: 'relative' }}
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}>
          <img
            src={
              preview ||
              profilePlaceholder
            }
            alt=""
            width="200"
            height="200"
            style={{ position: 'relative' }}
          />
          {hidden ? null :
            <Link to="#"
              onClick={handleInputClick}
              className="link">Change picture
            </Link>
          }
        </div>
      </main>
    </>
  );
};

export default Cropper;

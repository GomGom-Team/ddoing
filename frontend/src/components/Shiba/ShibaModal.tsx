import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import BasicModal from "../common/BasicModal";
import Threejs from "./Threejs";

const ShibaModal = ({ open, setOpen, name, level }: any) => {
  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  console.log(open, name, level);
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={onSubmit}
      >
        <Threejs name={name} level={level} />
      </Box>
    </BasicModal>
  );
};

export default ShibaModal;

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "15px",
};

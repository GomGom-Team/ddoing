import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function BasicModal({
  //   children,
  // }: PropsWithChildren<JSX.Element>): JSX.Element {
  children,
  open,
  setOpen,
}: any): JSX.Element {
  const onCloseModal = () => setOpen((prev: boolean) => !prev);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="div" sx={style}>
        {children}
      </Box>
    </Modal>
  );
}

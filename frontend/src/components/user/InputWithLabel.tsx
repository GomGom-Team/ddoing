import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputProps } from "../../../types/user/inputPropsType";
import { FormControl, InputLabel, Input, TextField } from "@mui/material";

const InputWithLabel = ({ label, ...rest }: InputProps) => (
  <FormControl variant="standard">
    <InputLabel>{label}</InputLabel>
    <Input {...rest} />
  </FormControl>
);

export default InputWithLabel;

const Label = styled.div`
  font-size: 1rem;
  color: aliceblue;
  margin-bottom: 0.25rem;
`;

const InputComponent = styled.input`
  width: 100%;
  border: 1px solid gray;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'

function ModalBasic({ setModalOpen, id, title, content, writer }: PropsType) {
  // 모달 끄기 
  const closeModal = () => {
      setModalOpen(false);
  };

  return (
      <StyledContainer>
          <StyledButton onClick={closeModal}>
              X
          </StyledButton>
          <p>모달창입니다.</p>
      </StyledContainer>
  );
}
export default ModalBasic;

// styles
const StyledContainer = styled.div(
  tw``
)

const StyledButton = styled.button(
  tw``
)
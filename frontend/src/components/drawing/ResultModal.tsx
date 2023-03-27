import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import tw, { css, styled, theme } from 'twin.macro'


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#FBF8CC',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [answer, setAnswer] = React.useState(true);

  // 정답일 경우 띄울 모달 페이지
  if (answer) {
    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {/* 결과 화면을 띄워줄 곳 */}
              <StyledDrawer>
                <StyledDiv> 
                  <DrawerHead> 정답! </DrawerHead>
  
                    <DrawerBody1>
                      <WordDiv>
                        <WordEnglish>Apple</WordEnglish>
                        <WordKorean>사과</WordKorean>
                      </WordDiv>
                      <ImgWrapper>
                        <CustomedImage></CustomedImage>
                      </ImgWrapper>
                    </DrawerBody1>
  
                    <DrawerBody2>
                      <ExampleEnglish>Apple is delicious</ExampleEnglish>
                      <ExampleKorean>사과는 맛있어~</ExampleKorean>
                    </DrawerBody2>
  
                  <DrawerEnd>
                    {/* <button onClick={toggleDrawer(anchor, false)}>NEXT</button> */}
                  </DrawerEnd>
                </StyledDiv>
              </StyledDrawer>
  
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
  return(
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* 결과 화면을 띄워줄 곳 */}
            <StyledDrawer>
              <StyledDiv> 
                <DrawerHead> 땡! </DrawerHead>

                  <DrawerBody1>
                    <WordDiv>
                      <WordEnglish>Apple</WordEnglish>
                      <WordKorean>사과</WordKorean>
                    </WordDiv>
                    <ImgWrapper>
                      <CustomedImage></CustomedImage>
                    </ImgWrapper>
                  </DrawerBody1>

                  <DrawerBody2>
                    <ExampleEnglish>Apple is delicious</ExampleEnglish>
                    <ExampleKorean>사과는 맛있어~</ExampleKorean>
                  </DrawerBody2>

                <DrawerEnd>
                  {/* <button onClick={toggleDrawer(anchor, false)}>NEXT</button> */}
                </DrawerEnd>
              </StyledDiv>
            </StyledDrawer>

          </Box>
        </Fade>
      </Modal>
    </div>
  )
}


// style

const StyledDrawer = styled.div(
  tw`flex justify-center items-center`
)

const StyledDiv = styled.div(
  tw`border-red-500`,
  css`
    width: 40rem;
    height: 40rem;
  `
)

const DrawerHead = styled.h1(
  tw`flex justify-center mb-16 text-7xl p-5`
)


const DrawerBody1 = styled.div(
  tw`flex justify-evenly mb-16`
)

const WordDiv = styled.div(
  tw`flex flex-col items-center justify-center`
)

const WordEnglish = styled.h1(
  tw`text-4xl mb-5`
)

const WordKorean = styled.h1(
  tw`text-3xl`
)


const ImgWrapper = styled.div(
  tw`flex justify-center items-center pl-10 ml-10`
)

const CustomedImage = styled.img(
  tw`object-cover rounded-md bg-slate-500`,
  css`
    height: 9rem;
    width: 16rem;
  `
)

const DrawerBody2 = styled.div(
  tw`flex flex-col items-center mb-16`
)

const ExampleEnglish = styled.h1(
  tw`text-3xl mb-5`
)

const ExampleKorean = styled.h1(
  tw`text-2xl`
)

const DrawerEnd = styled.div(
  tw`flex justify-center`
)
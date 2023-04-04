import React, { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import myList from "./Shiba.json";
import ShibaModal from "./ShibaModal";

const ShibaList = () => {
  const [openShibaModal, setOpenShibaModal] = useState<boolean>(false);
  const [nowName, setNowName] = useState<string>("");
  const [nowLevel, setNowLevel] = useState<number>(0);

  const onClickShiba = () => {
    setOpenShibaModal((prev) => !prev);
  };
  return (
    <AllWrapDiv>
      {myList.map((item: any, index: number) => {
        return (
          <>
            <OneWrapBtn
              onClick={() => {
                setOpenShibaModal((prev) => !prev);
                setNowLevel(item.level);
                setNowName(item.name);
              }}
            >
              <LevelDiv>{item.level}</LevelDiv>
              <ShibaImg
                src={`../../../ec2/model/Shiba_${item.name}_${item.level}/Shiba_${item.name}_${item.level}.png`}
              />
            </OneWrapBtn>
          </>
        );
      })}
      {openShibaModal && (
        <ShibaModal
          open={openShibaModal}
          setOpen={setOpenShibaModal}
          name={nowName}
          level={nowLevel}
        />
      )}
    </AllWrapDiv>
  );
};

export default ShibaList;

const AllWrapDiv = styled.div`
  display: flex;
  width: 80vw;
  height: 50vh;
  flex-wrap: wrap;
`;

const OneWrapBtn = styled.button`
  display: flex;
  width: 20vw;
  /* height: 18vh; */
  margin: 10px;
`;

const ShibaImg = styled.img`
  border-radius: 10px;
`;

const LevelDiv = styled.div`
  position: relative;
  display: flex;
  left: 30px;
  top: 10px;
  height: 25px;
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

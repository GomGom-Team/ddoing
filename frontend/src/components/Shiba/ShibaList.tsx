import { useState } from "react";
import { styled } from "twin.macro";
import myList from "./Shiba.json";
import ShibaModal from "./ShibaModal";
import { useAppSelector } from "../../redux/configStore.hooks";
import { Container } from "../common";

const ShibaList = () => {
  const user = useAppSelector((state) => state.user.userData);

  const [openShibaModal, setOpenShibaModal] = useState<boolean>(false);
  const [nowName, setNowName] = useState<string>("");
  const [nowLevel, setNowLevel] = useState<number>(0);

  return (
    <AllWrapDiv>
      <Container isOverflowed={true}>
        {myList.map((item: any, index: number) => {
          return (
            <OneWrapDiv>
              {user.level && item.level > user.level && (
                <NoDiv>
                  <LockImg src="/assets/img/Lock.png" />
                </NoDiv>
              )}
              <OneWrapBtn
                onClick={() => {
                  setOpenShibaModal((prev) => !prev);
                  setNowLevel(item.level);
                  setNowName(item.name);
                }}
              >
                <LevelDiv>{item.level}</LevelDiv>
                {/* <BadgeImg src={`/assets/img/Badge.png`} /> */}
                <ShibaImg
                  src={`../../../ec2/model/Shiba_${item.name}_${item.level}/Shiba_${item.name}_${item.level}.png`}
                ></ShibaImg>
              </OneWrapBtn>
            </OneWrapDiv>
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
      </Container>
    </AllWrapDiv>
  );
};

export default ShibaList;

const AllWrapDiv = styled.div`
  display: flex;
  width: 84vw;
  height: 58vh;
  flex-wrap: wrap;
  overflow-y: auto;
  margin-left: 14.5vw;
  margin-top: 1vw;
  padding-left: 2.5vw;
`;

const OneWrapBtn = styled.button`
  display: flex;
  position: relative;
  width: 18vw;
  /* height: 21vh; */
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 1vw;
  z-index: 1;
`;

const OneWrapDiv = styled.div`
  display: flex;
  position: relative;
  width: 18vw;
  /* height: 21vh; */
  margin: 1vw;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 1vw;
  z-index: 1;
`;

const LockImg = styled.img`
  position: absolute;
  width: 2vw;
  right: 1vw;
  bottom: 1vw;
`;

const NoDiv = styled.div`
  position: absolute;
  width: 18vw;
  height: 100%;
  margin: 10px;
  border-radius: 1vw;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #00000089;
  z-index: 999;
`;

const ShibaImg = styled.img`
  border-radius: 1vw;
  width: 25vw;
  /* height: 21vh; */
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  &:hover {
    box-shadow: -2px -2px 5px #fff;
  }
`;

const LevelDiv = styled.div`
  position: absolute;
  display: flex;
  left: 1vw;
  top: 1vw;
  height: 25px;
  padding: 5px;
  text-align: left;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-size: 25px;
`;

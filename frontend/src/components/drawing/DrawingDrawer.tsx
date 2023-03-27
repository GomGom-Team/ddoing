import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ResultPage from "./ResultPage"
import WordDrawer from "./WordDrawer"

type Anchor = "top";
interface wordListType {
  wordEng: string
  wordKor: string
  sentenceEng: string
  sentenceKor: string
}
interface ResultPageProps {
  anchor: Anchor
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: {
    top: boolean
  }
  wordList: wordListType[]
  index: number
  maxStage: number
};

const DrawingDrawer = ({ toggleDrawer, state, index, maxStage }: ResultPageProps) => {

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <WordDrawer toggleDrawer={toggleDrawer} anchor={anchor} index= {index} maxStage={maxStage} />
    </Box>
  );

  return (
    <div>
      {(["top"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DrawingDrawer


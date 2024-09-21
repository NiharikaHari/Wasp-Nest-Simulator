import { Button } from "./components/ui/button";
import Sketch from "./components/Sketch";
import { useEffect } from "react";
import Heading from "./components/Heading";
import {
  AttachSketchToElement,
  startLoop,
  stopLoop,
  nextStep,
  prevStep,
  reset,
  incSpeed,
  decSpeed,
} from "./sketches/sketch";
import Options from "./components/Options";
import Simulation from "./components/Simulation";
import Main from "./components/Main";
import ControlBar from "./components/ControlBar";
import RuleOptions from "./components/RuleOptions";

function App() {
  useEffect(() => {
    let sketchDiv = document.getElementById("sketch");
    if (sketchDiv) {
      AttachSketchToElement(sketchDiv);
    }
  }, []);

  //handle click for start button
  const handlePlayClick = () => {
    startLoop();
  };
  const handlePauseClick = () => {
    stopLoop();
  };
  const handleNextStepClick = () => {
    nextStep();
  };
  const handlePrevStepClick = () => {
    prevStep();
  };
  const handleResetClick = () => {
    reset();
  };
  const handleIncSpeedClick = () => {
    incSpeed();
  };
  const handleDecSpeedClick = () => {
    decSpeed();
  };

  return (
    <>
      <Heading>Wasp Nest Simulator</Heading>
      <Main>
        <Options>
          <RuleOptions></RuleOptions>
        </Options>
        <Simulation>
          <Sketch></Sketch>
          <ControlBar>
            <Button className="m-1" onClick={handlePlayClick}>
              Play
            </Button>
            <Button className="m-1" onClick={handlePauseClick}>
              Pause
            </Button>
            <Button className="m-1" onClick={handleNextStepClick}>
              NextStep
            </Button>
            <Button className="m-1" onClick={handlePrevStepClick}>
              PrevStep
            </Button>
            <Button className="m-1" onClick={handleDecSpeedClick}>
              - Speed
            </Button>
            <Button className="m-1" onClick={handleIncSpeedClick}>
              + Speed
            </Button>
            <Button className="m-1" onClick={handleResetClick}>
              Reset
            </Button>
          </ControlBar>
        </Simulation>
      </Main>
    </>
  );
}

export default App;

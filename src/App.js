import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { turtle1, turtle2, turtle3 } from "./assets/index";

const Box = styled.div`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #eeeeee;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgb(186, 198, 189);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #000000;
    transition: all 0.3s ease-in-out;
  }
`;
const Turtle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  transform: rotate(${(props) => props.rotate}deg);
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  color: #6a7570;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 70px;
`;

const TURTLE_SIZE = 200;
const BOX_WIDTH = 600;
const BOX_HEIGHT = 600;

function App() {
  const [turtles, setTurtles] = useState([turtle3, turtle2, turtle1, turtle2]);
  const [turtlesStatic, setTurtlesStatic] = useState([
    turtle1,
    turtle2,
    turtle3,
    turtle2,
  ]);

  const [topA, setTopA] = useState(0);
  const [topB, setTopB] = useState(200);
  const [topC, setTopC] = useState(600);

  const [rightA, setRightA] = useState(0);
  const [rightB, setRightB] = useState(650);
  const [rightC, setRightC] = useState(100);

  const [indexTurtle, setIndexTurtle] = useState(0);

  const [triger, setTriger] = useState(false);

  const handleTriger = () => {
    const newBool = !triger;
    setTriger(newBool);
  };

  // Turtle A Moves -----------------------
  useEffect(() => {
    let shipId;
    if (topA < 800 && rightA < 800 && triger) {
      shipId = setInterval(() => {
        setTopA((turtleTop) => turtleTop + 2);
        setRightA((turtleRight) => turtleRight + 2);
      }, 10);
    } else {
      setTopA(-300);
      setRightA(-300);
    }

    return () => {
      clearInterval(shipId);
    };
  }, [topA, rightA, triger]);

  // Turtle B Moves-----------------------
  useEffect(() => {
    let shipId;
    if (topB > -300 && triger) {
      shipId = setInterval(() => {
        setTopB((turtleTop) => turtleTop - 2);
        setRightB((turtleRight) => turtleRight - 2);
      }, 10);
    } else {
      setTopB(650);
      setRightB(1000);
    }

    return () => {
      clearInterval(shipId);
    };
  }, [topB, rightB, triger]);

  // Turtle C Moves-----------------------
  useEffect(() => {
    let shipId;
    if (topC < 1000 && topC > -300 && triger) {
      shipId = setInterval(() => {
        setTopC((turtleTop) => turtleTop - 3);
        setRightC((turtleRight) => turtleRight + 0.5);
      }, 10);
    } else {
      setTopC(800);
      setRightC(-200);
    }

    return () => {
      clearInterval(shipId);
    };
  }, [topC, rightC, triger]);

  // TurtleMOVES ---------------------
  useEffect(() => {
    let interval = null;
    if (triger) {
      interval = setInterval(() => {
        if (indexTurtle < 3) {
          setIndexTurtle((indexTurtle) => indexTurtle + 1);
        } else {
          setIndexTurtle((indexTurtle) => (indexTurtle = 0));
        }
      }, 200);
    }
    return () => {
      clearInterval(interval);
    };
  }, [indexTurtle, triger]);

  return (
    <div className="App">
      <Div>
        <Box onClick={handleTriger} width={BOX_WIDTH} height={BOX_HEIGHT}>
          <Title>Turtles' paradise</Title>
          <Turtle size={TURTLE_SIZE} top={topA} right={rightA} rotate={-135}>
            <img
              style={{ width: "100%" }}
              src={turtles[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
          <Turtle size={TURTLE_SIZE} top={topB} right={rightB} rotate={45}>
            <img
              style={{ width: "100%" }}
              src={turtles[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
          <Turtle size={TURTLE_SIZE} top={topC} right={rightC} rotate={-15}>
            <img
              style={{ width: "100%" }}
              src={turtles[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
          <Turtle size={TURTLE_SIZE} top={50} right={-250} rotate={60}>
            <img
              style={{ width: "100%" }}
              src={turtlesStatic[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
          <Turtle size={TURTLE_SIZE} top={500} right={300} rotate={-30}>
            <img
              style={{ width: "100%" }}
              src={turtlesStatic[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
          <Turtle size={TURTLE_SIZE} top={100} right={700} rotate={-200}>
            <img
              style={{ width: "100%" }}
              src={turtlesStatic[indexTurtle]}
              alt="turtle"
            />
          </Turtle>
        </Box>
      </Div>
      <div className="text">Click to any turtle or the box in the middle.</div>
    </div>
  );
}

export default App;

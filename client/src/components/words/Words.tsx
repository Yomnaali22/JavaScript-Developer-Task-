import React from "react";
import "./words.css";
import { useState, useEffect } from "react";
import { fetchWords } from "../../api/api";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import RankScreen from "../RankScreen/RankScreen";

interface List {
  word: number;
  id: any;
  pos: string;
}

const Words: React.FC = () => {
  const [wordList, setwordList] = useState<List[]>([]);
  const [count, setCount] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [rankScreen, setRankScreen] = useState<boolean>(false);

  useEffect(() => {
    // fetch all words
    fetchWords(setwordList, "/words");
    let partsofspeech: string[] = ["noun", "adverb", "adjective", "verb"];
    setPartsOfSpeech(partsofspeech);
  }, []);

  const handleAnswer = (e: any) => {
    e.preventDefault();
    if (e.target.innerText === wordList[count]["pos"]) {
      /// show correct answer to user
      setAnswer("Correct");
      setScore((prev) => prev + 1);
    } else {
      setAnswer("Incorrect");
    }
  };

  const handleNext = () => {
    setAnswer("");
    if (count !== wordList.length - 1) {
      setCount((count) => count + 1);
    }
    const progress1 =
      wordList[count] &&
      Math.round((wordList[count]["id"] / wordList.length) * 100);
    setProgress(progress1);
  };

  return rankScreen ? (
    <div className="rankScreen">
      <RankScreen score={Math.round((score / wordList.length) * 100)} />
      <button
        className="tryAgainButton"
        onClick={() => {
          setRankScreen(false);
          setFlag(false);
          setProgress(0);
          setAnswer("");
          setCount(0);
        }}
      >
        Try Again
      </button>
    </div>
  ) : (
    <>
      {!flag ? (
        <div className="playNow">
          <h1>Play Parts of speech Now</h1>
          <button
            className="playButton"
            onClick={() => {
              setFlag(true);
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="progress">
          <h1 className="text">{flag && wordList[count]["word"]}</h1>
          <ProgressBar progress={progress} />
          <div className="buttonscontainer">
            {count !== wordList.length &&
              partsOfSpeech.map((speech: string, index: number) => (
                <Button name={speech} key={index} handler={handleAnswer} />
              ))}
          </div>
          {answer !== "" && (
            <button
              className="nextButton"
              onClick={() => {
                handleNext();
                if (count === wordList.length - 1) {
                  setRankScreen(true);
                }
              }}
            >
              Next
            </button>
          )}
          <h1 className="text"> {answer !== "" && answer} </h1>
        </div>
      )}
    </>
  );
};
export default Words;

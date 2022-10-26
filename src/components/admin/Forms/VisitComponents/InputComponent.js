import React, { useState } from "react";
const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;
const BACKSPACE_KEYCODE = 8;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const SPACE_KEYCODE = 32;

function InputComponent({
  id,
  placeholder,
  handleChange,
  value,
  runPrediction,
  wordList,
}) {
  const [suggestionEl, setSuggestionEl] = useState("");
  //   console.log(suggestionEl);
  const onInput = async (e) => {
    const resultsHTML = document.getElementById("results");
    const textInputEl = document.getElementById("note");
    var end = textInputEl.selectionEnd;
    console.log(end);
    let results = await runPrediction(e);
    let suggestedWord = "";
    let insertText = false;
    if (e.data != " ") {
      insertText = true;
    }
    if (insertText == false) {
      textInputEl.value = "";
    }

    let inputValue = e;
    // suggestedWordsArray = filterArray(results, inputValue);
    suggestedWord = results[0];
    console.log(suggestedWord);
    setSuggestionEl(results[0]);
    // console.log(results);

    if (suggestedWord != undefined) {
      // console.log(suggestedWordsArray);
      setSuggestionEl(suggestedWord);
      console.log(2);
    }

    if (inputValue.length == 0 || results.length == 0) {
      setSuggestionEl("");
      console.log(3);
    }

    // if (suggestedWordsArray.length != 0) {
    //   svgTabIcon.classList.remove("hidden");
    //   svgEnterIcon.classList.add("hidden");
    // } else {
    //   svgTabIcon.classList.add("hidden");
    //   svgEnterIcon.classList.remove("hidden");
    // }

    // if (inputValue.length == 0 || inputValue == suggestedWord) {
    //   svgTabIcon.classList.add("hidden");
    //   svgEnterIcon.classList.add("hidden");
    // }
    if (textInputEl.value.length == 0) {
      insertText = false;
    }
    resultsHTML.innerHTML = "";
    resultsHTML.style.display = "block";
    for (let i = 0; i < results.length; i++) {
      resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
    }
  };
  const onKeyDown = (e) => {
    const textInputEl = document.getElementById("note");
    const suggestionEl = document.querySelector(".suggestion-container");
    let currentWordIndex = 0;
    console.log(textInputEl.value.length);
    if (textInputEl.value.length != 0) {
      if (e.keyCode == UP_ARROW_KEYCODE) {
        if (currentWordIndex == 0) return;
        currentWordIndex--;
        setSuggestionEl(wordList[currentWordIndex]);
      }

      if (e.keyCode == DOWN_ARROW_KEYCODE) {
        if (currentWordIndex == wordList.length - 1) return;
        currentWordIndex++;
        setSuggestionEl(wordList[currentWordIndex]);
      }

      if (e.keyCode == BACKSPACE_KEYCODE) {
        currentWordIndex = 0;
      }
    }

    if (wordList != undefined && wordList != "") {
      if (e.keyCode == ENTER_KEYCODE) {
        handleChange(value + wordList[currentWordIndex]);
        setSuggestionEl("");
        // svgTabIcon.classList.add("hidden");
        // svgEnterIcon.classList.add("hidden");
      }
    }
  };
  return (
    <>
      <textarea
        id={id}
        placeholder={placeholder}
        className="form-control form-background textarea-note"
        onChange={(e) => {
          handleChange(e.target.value);
          onInput(e.target.value);
        }}
        onKeyDown={onKeyDown}
        value={value}
        required
      ></textarea>
      <span className="suggestion-container">{suggestionEl}</span>
    </>
  );
}

export default InputComponent;

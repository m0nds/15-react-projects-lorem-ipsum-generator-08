import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [input, setInput] = useState(1);
  const [tags, setTags] = useState("p");
  const [includeHtml, setIncludeHtml] = useState("no");
  const [paragraph, setParagraph] = useState([]);
  const [copy, setCopy] = useState(false);
  const [modalContent, setModalContent] = useState('copied to Clipboard!')

  // useEffect(() => {
  //   handleChange()
  // })

  const closeModal = () => {
    setCopy(false)
  }

  const handleChange = (e) => {
    e.preventDefault();
    const url = `https://baconipsum.com/api/?type=all-meat&paras=${input}&start-with-lorem=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setParagraph(data));
  };

  return (
    <div className="container">
      <h1>Lorem ipsum Generator</h1>
      <div className="select">
        <input
          className="number-input"
          type="number"
          min="1"
          max="20"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <label>Tags:</label>
          <select value={tags} onChange={(e) => setTags(e.target.value)}>
            <option value="p">p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
            <option value="h4">h4</option>
            <option value="h5">h5</option>
            <option value="h6">h6</option>
            <option value="span">span</option>
          </select>
        </div>
        <div>
          <label>Include HTML:</label>
          <select
            value={includeHtml}
            onChange={(e) => setIncludeHtml(e.target.value)}
          >
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
        <button className="btn" onClick={handleChange}>
          Generate
        </button>
      </div>
      <div>
        <CopyToClipboard
          text={paragraph.map((para) =>
            includeHtml === "yes" ? `<${tags}>${para}</${tags}>` : para
          )}
          onCopy={() => setCopy(true)}
        >
          <button className="copy">Copy to clipboard</button>
        </CopyToClipboard>
      </div>
      <div>
        { copy && <Modal modalContent={modalContent} closeModal={closeModal} /> }
      </div>
      <div className="paragraph">
        {includeHtml === "yes"
          ? paragraph.map((para) => `<${tags}>${para}</${tags}>`)
          : paragraph.map((para) => <p>{para}</p>)}
      </div>
    </div>
  );
};

export default App;

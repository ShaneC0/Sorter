import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      delay: 20,
    };
  }

  componentDidMount() {
    const tempBoxes = [];
    for (let i = 0; i < 50; i++) {
      tempBoxes.push({
        height: i + 1,
      });
    }
    this.setState({ boxes: tempBoxes });
  }

  async componentDidUpdate() {
    await this.setHeights();
  }

  async handleBubbleSort() {
    const tempBoxes = this.state.boxes;
    let length = tempBoxes.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (tempBoxes[j].height > tempBoxes[j + 1].height) {
          let temp = tempBoxes[j];
          tempBoxes[j] = tempBoxes[j + 1];
          tempBoxes[j + 1] = temp;
          this.setState({ boxes: tempBoxes });
          await new Promise((resolve) => setTimeout(resolve, this.state.delay));
        }
      }
    }
  }

  async handleInsertionSort() {
    const tempBoxes = this.state.boxes;
    let n = tempBoxes.length;
    for (let i = 1; i < n; i++) {
      let current = tempBoxes[i];
      let j = i - 1;
      while (j > -1 && current.height < tempBoxes[j].height) {
        tempBoxes[j + 1] = tempBoxes[j];
        j--;
        this.setState({ boxes: tempBoxes });
        await new Promise((resolve) => setTimeout(resolve, this.state.delay));
      }
      tempBoxes[j + 1] = current;
      this.setState({ boxes: tempBoxes });
    }
  }

  async handleSelectionSort() {
    const tempBoxes = this.state.boxes;
    let length = tempBoxes.length;
    for (let i = 0; i < length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < length; j++) {
        if (tempBoxes[j].height < tempBoxes[min].height) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = tempBoxes[i];
        tempBoxes[i] = tempBoxes[min];
        tempBoxes[min] = tmp;
        this.setState({ boxes: tempBoxes });
        await new Promise((resolve) => setTimeout(resolve, this.state.delay));
      }
    }
  }

  async handleRandomize() {
    const tempBoxes = this.state.boxes;
    let n = tempBoxes.length;
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * Math.floor(i));
      let temp = tempBoxes[i];
      tempBoxes[i] = tempBoxes[j];
      tempBoxes[j] = temp;

      this.setState({ boxes: tempBoxes });
      await new Promise((resolve) => setTimeout(resolve, this.state.delay));
    }
  }

  async setHeights() {
    const { boxes } = this.state;
    for (let i = 0; i < boxes.length; i++) {
      document.getElementById(
        `box-${boxes[i].height}`
      ).style.height = `${boxes[i].height}vh`;
      document.getElementById(
        `box-${boxes[i].height}`
      ).style.background = `rgb(${(boxes[i].height * 2) % 255}, ${
        (boxes[i].height * 5) % 255
      }, ${(boxes[i].height * 5) % 255})`;
    }
  }

  render() {
    return (
      <div className="main">
        <div className="pane">
          {this.state.boxes.map((box, idx) => (
            <div className="box" id={`box-${box.height}`} key={idx}></div>
          ))}
        </div>
        <div>
          <button className="btn" onClick={() => this.handleRandomize()}>
            Scramble
          </button>
          <button className="btn" onClick={() => this.handleBubbleSort()}>
            Bubble Sort (Slow)
          </button>
          <button className="btn" onClick={() => this.handleInsertionSort()}>
            Insertion Sort (Medium)
          </button>
          <button className="btn" onClick={() => this.handleSelectionSort()}>
            Selection Sort (Fast)
          </button>
          <input
            type="number"
            className="delay-input"
            onChange={(e) => this.setState({ delay: e.target.value })}
            placeholder={this.state.delay}
          />
          <label>Delay(ms)</label>
        </div>
      </div>
    );
  }
}

export default App;

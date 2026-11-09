Color picker:

const { useState } = React;
export const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");

  return (
    <div
      id="color-picker-container"
      style={{ backgroundColor: color }}
    >
      <input
        id="color-input"
        type="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
    </div>
  );
};





hide and show :

const {useState} = React;
export const ToggleApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  export const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div id ="toggle-container">
    <button id="toggle-button" onClick = {handleToggleVisibility}>{isVisible ? "Hide" : "Show"} Message</button>
      {isVisible && <p id="message">I love freeCodeCamp!</p>}
    </div>
)
}

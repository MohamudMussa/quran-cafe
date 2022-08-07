import ReactSlider from "react-slider";

const Slider = ({
  onSeek,
  value=0,
}) => {
  return (
    <ReactSlider
      className="slider"
      thumbClassName="thumb"
      trackClassName="track"
      maxValue={100}
      minValue={0}
      value={value}
      onAfterChange={onSeek}
    />
  )
};

export default Slider;
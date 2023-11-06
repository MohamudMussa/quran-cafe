import ReactSlider from "react-slider";
import moment from 'moment';

const Slider = ({
  onSeek,
  value = 0,
  duration
}) => {

  const progressInSeconds = value / 100 * duration;

  const getTimeDuration = (d) => {
    const dateWithNoTime = moment().startOf('day');
    const timeWithHour = dateWithNoTime.add(d, 's').format('HH.mm.ss');

    return timeWithHour;
  }

  return (
    <div>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        maxValue={100}
        minValue={0}
        value={value}
        onAfterChange={onSeek}
      />
      <div className="time-wrapper">
        <p className="">{getTimeDuration(progressInSeconds)}</p>
        <p className="">{getTimeDuration(duration)}</p>
      </div>
    </div>
  )
};

export default Slider;
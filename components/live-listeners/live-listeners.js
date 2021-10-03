function LiveListeners({ count = 0 }) {
  return (
    <div className="absolute top-0 flex items-center justify-between p-4">
      <div className="relative -top-0.5">
        <div className="flex items-center space-x-1">
          <p>Count: {count}</p>
        </div>
      </div>
    </div>
  );
}

export default LiveListeners;

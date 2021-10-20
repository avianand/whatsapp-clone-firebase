export const formatDate = (time) => {
  var options = {
    // weekday: "short",
    // year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <>{new Date(time.seconds * 1000).toLocaleDateString("en-US", options)}</>
  );
};

export const formatTime = (time) => {
  return (
    <>
      {new Date(time.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </>
  );
};

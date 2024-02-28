export const calcPointsFromBuffer = (
  data: Float32Array,
  height: number,
  width: number
) => {
  const step = Math.ceil(data.length / width);
  const amp = height / 2;
  let points = [];
  for (var i = 0; i < width; i++) {
    var min = 1.0;
    var max = -1.0;
    for (var j = 0; j < step; j++) {
      var datum = data[i * step + j];
      if (datum < min) min = datum;
      if (datum > max) max = datum;
    }
    points.push({
      index: i,
      min: (1 + min) * amp,
      max: Math.max(1, (max - min) * amp),
    });
  }
  return points;
};

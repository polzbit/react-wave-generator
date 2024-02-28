import { useCallback } from "react";
import { Point } from "@generator/src";

type Props = {
  height?: number;
  width?: number;
  points: Point[];
};

export const Canvas = ({ height, width, points }: Props) => {
  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      const context = node?.getContext("2d");
      console.log(points);
      if (context) {
        points.forEach(({ index, min, max }) =>
          context.fillRect(index, min, 1, max)
        );
      }
    },
    [points]
  );

  return <canvas ref={canvasRef} height={height} width={width} />;
};

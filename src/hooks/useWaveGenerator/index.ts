import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Point } from "../../types";
import { calcPointsFromBuffer } from "../../utils";

type Params = {
  file: File | null;
  width?: number;
  height?: number;
};

const audioCtx = new window.AudioContext();

export const useWaveGenerator = ({ file, width, height }: Params) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const reader = new FileReader();

  reader.onload = async (event) => {
    const arrayBuffer = event.target.result as ArrayBuffer;
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const data = audioBuffer.getChannelData(0);
    const canvasWidth = width ?? ref.current.offsetWidth ?? 1000;
    const canvasHeight = height ?? ref.current.offsetHeight ?? 100;
    const points = calcPointsFromBuffer(data, canvasHeight, canvasWidth);
    setPoints(points);
  };

  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      const context = node?.getContext("2d");
      ref.current = node;

      if (context) {
        points.forEach(({ index, min, max }) =>
          context.fillRect(index, min, 1, max)
        );
      }
    },
    [points]
  );

  useEffect(() => {
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return { points, canvasRef };
};

import { useCallback, useEffect, useRef, useState } from "react";
import { Point } from "../../types";
import { calcPointsFromBuffer } from "../../utils";

type Params = {
  file: File | null;
  width?: number;
  height?: number;
  startCursor?: number;
  endCursor?: number;
  defaultColor?: string;
  cursorColor?: string;
  onFileLoaded?: (points: Point[]) => void;
  onPointClick?: (point: { x: number; y: number }) => void;
};

const audioCtx = new window.AudioContext();

export const useWaveGenerator = ({
  file,
  width,
  height,
  startCursor,
  endCursor,
  defaultColor = "#000",
  cursorColor = "#BBB",
  onFileLoaded,
  onPointClick,
}: Params) => {
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  const convertFileToPoints = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result as ArrayBuffer;
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const data = audioBuffer.getChannelData(0);
      const canvasWidth = width ?? ref.current.offsetWidth ?? 1000;
      const canvasHeight = height ?? ref.current.offsetHeight ?? 100;
      const filePoints = calcPointsFromBuffer(data, canvasHeight, canvasWidth);
      onFileLoaded?.(filePoints);
      setPoints(filePoints);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    if (event.buttons === 1) {
      onPointClick?.({ x: event.offsetX, y: event.offsetY });
    }
  }, []);

  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      const context = node?.getContext("2d");
      ref.current = node;
      if (context) {
        context.fillStyle = defaultColor;
        points.forEach(({ index, min, max }) => {
          if (!!endCursor && index <= endCursor) {
            context.fillStyle = cursorColor;
          }
          if (
            (!!startCursor && index < startCursor) ||
            (!!endCursor && index > endCursor)
          ) {
            context.fillStyle = defaultColor;
          }
          context.fillRect(index, min, 1, max);
        });
        node.addEventListener("mousemove", handleCanvasClick);
        unsubscribeRef.current = () => {
          node.removeEventListener("mousemove", handleCanvasClick);
        };
      }
    },
    [points, startCursor, endCursor, defaultColor, cursorColor]
  );

  useEffect(() => {
    if (file) {
      convertFileToPoints(file);
    }
  }, [file]);

  return { points, canvasRef };
};

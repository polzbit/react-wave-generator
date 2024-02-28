import { useWaveGenerator } from "@generator/src";
import { UploadButton } from "@/components";
import { Content } from "./style";
import { useState } from "react";

export const App = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const { canvasRef } = useWaveGenerator({
    file: currentFile,
  });
  return (
    <Content component="div">
      <h1>Wave Generator Demo</h1>
      <UploadButton
        onUpload={(files) =>
          files && !!files.length && setCurrentFile(files[0])
        }
      />
      <canvas ref={canvasRef} width={1000} />
    </Content>
  );
};

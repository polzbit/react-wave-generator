import { CloudUpload } from "@mui/icons-material";
import { Button, VisuallyHiddenInput } from "./style";
import { useRef } from "react";

type Props = { onUpload: (files: FileList | null) => void };

export const UploadButton = ({ onUpload }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Button
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      onClick={() => ref.current?.click()}
    >
      Upload file
      <VisuallyHiddenInput
        ref={ref}
        type="file"
        onChange={(event) => {
          onUpload(event.target.files);
        }}
      />
    </Button>
  );
};

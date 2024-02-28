import { Typography, styled } from "@mui/material";

export const Content = styled(Typography<"div">)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100%",
  width: "100%",
});

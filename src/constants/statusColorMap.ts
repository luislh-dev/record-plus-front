import { ChipProps } from "@nextui-org/react";
import { State } from "./state";

export const statusColorMap: Record<string, ChipProps["color"]> = {
  [State.ACTIVO]: "success",
  [State.INACTIVO]: "danger",
  vacation: "warning",
};

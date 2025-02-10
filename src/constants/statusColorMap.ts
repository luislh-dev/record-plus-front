import { ChipProps } from "@heroui/react";
import { State } from './state';

export const statusColorMap: Record<string, ChipProps['color']> = {
  [State.ACTIVO]: 'success',
  [State.INACTIVO]: 'danger',
  vacation: 'warning'
};

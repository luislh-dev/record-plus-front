import { DeleteIcon } from '@/icons/DeleteIcon';
import { EditIcon } from '@/icons/EditIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import { Tooltip } from "@heroui/react";

interface ActionsCellProps {
  state?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetail?: () => void;
  inactiveStates?: string[];
}

export function ActionsCell({
  state,
  onEdit,
  onDelete,
  inactiveStates,
  onDetail
}: ActionsCellProps) {
  const isInactive = state && inactiveStates?.includes(state);

  return (
    <div className="relative flex items-center justify-center w-full gap-2">
      {onEdit && (
        <Tooltip content="Editar">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onEdit}
          >
            <EditIcon />
          </span>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip content="Eliminar">
          <span
            className={`text-lg transition-all duration-200 ${
              isInactive
                ? 'text-danger/40 pointer-events-none cursor-not-allowed opacity-70'
                : 'text-danger cursor-pointer active:opacity-50 hover:opacity-80'
            }`}
            onClick={isInactive ? undefined : onDelete}
          >
            <DeleteIcon />
          </span>
        </Tooltip>
      )}
      {onDetail && (
        <Tooltip content="Detalle">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onDetail}
          >
            <EyeIcon />
          </span>
        </Tooltip>
      )}
    </div>
  );
}

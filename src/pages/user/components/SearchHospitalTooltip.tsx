import { Help } from "@/icons/Help";
import { Tooltip } from "@nextui-org/react";

export const SearchHospitalTooltip = () => (
  <Tooltip
    content={
      <div className="max-w-xs">
        <p>Ingrese el nombre del hospital donde el usuario ejercerá sus funciones.</p>
        <ul className="list-disc pl-4 mt-2 text-sm">
          <li>Escriba el nombre completo o parcial del hospital</li>
          <li>Seleccione de la lista de resultados</li>
          <li>Asegúrese de elegir el hospital correcto si hay varios con nombres similares</li>
        </ul>
      </div>
    }
  >
    <Help color="black" />
  </Tooltip>
);

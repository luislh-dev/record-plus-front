import { DropDownFilter } from './components/DropDrownFilter';
import { DropDownSort } from './components/DropDownSort';
import { SearchImput } from './components/Search';
import { HospitalList } from './components/HospitalList';
import { Header } from './components/Header';

const Hospital = () => {
  return (
    <>
      <div>
        {/* Encabezado */}
        <Header />

        {/* Barra de búsqueda y filtros */}
        <search className="px-2 pb-2 pt-4 flex gap-x-4">
          <form className="px-2 pb-2 pt-4" onSubmit={e => e.preventDefault()}>
            <div className="flex gap-x-4">
              <SearchImput />
              <div className="flex gap-x-4" role="group" aria-label="Filtros y ordenamiento">
                <DropDownFilter />
                <DropDownSort />
              </div>
            </div>
          </form>
        </search>
        {/* Tabla de hospitales */}
        <HospitalList />
      </div>
    </>
  );
};

export default Hospital;

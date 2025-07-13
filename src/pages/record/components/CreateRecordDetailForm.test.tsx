import { mockFileType } from '@/test/__mocks__/hooks/mockFileType';
import { mockState } from '@/test/__mocks__/hooks/mockState';
import { renderWithProviders } from '@/utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateRecordDetailForm } from './CreateRecordDetailForm';

// Agregar mocks para los hooks de estado y tipo de archivo
vi.mock('@/hooks/fileType/useFileType', () => mockFileType);
vi.mock('@/hooks/state/useState', () => mockState);

vi.mock('@/hooks/fileType/useFileType', () => ({
  useFileType: () => ({
    fileTypes: [
      { id: 1, name: 'Documento' },
      { id: 2, name: 'Imagen' },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe('CreateRecordDetailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar todos los campos del formulario', () => {
    renderWithProviders(<CreateRecordDetailForm personId='123' />);

    // Campos de texto y área
    expect(screen.getByLabelText(/motivo de la visita/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diagnóstico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tratamiento/i)).toBeInTheDocument();

    // Campos de fecha y estado
    expect(screen.getByText('Fecha de la visita')).toBeVisible();
    expect(screen.getByRole('button', { name: /estado/i })).toBeInTheDocument();

    // Selector de archivos
    expect(screen.getByLabelText(/seleccionar archivo/i)).toBeInTheDocument();

    // Botón de guardar
    expect(screen.getByRole('button', { name: /guardar registro/i })).toBeInTheDocument();

    // Abrir el selector de estado
    const stateSelect = screen.getByRole('button', { name: /estado/i });
    fireEvent.click(stateSelect);

    // Verificar que las opciones están disponibles en el menú del selector
    expect(screen.getByRole('option', { name: 'Activo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Inactivo' })).toBeInTheDocument();
  });

  it('debería permitir seleccionar el tipo de archivo después de subir un archivo', () => {
    renderWithProviders(<CreateRecordDetailForm personId='123' />);

    // Crear un archivo de prueba
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    // Obtener el input de archivo y simular la subida
    const fileInput = screen.getByLabelText(/seleccionar archivo/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verificar que el nombre del archivo aparece
    expect(screen.getByText('test.pdf')).toBeInTheDocument();

    // Verificar que el selector de tipo de archivo está presente
    const fileTypeSelect = screen.getByRole('button', { name: /tipo de archivo/i });
    expect(fileTypeSelect).toBeInTheDocument();

    // Abrir el selector de tipo de archivo
    fireEvent.click(fileTypeSelect);

    // Verificar que las opciones de tipo de archivo están disponibles
    expect(screen.getByRole('option', { name: 'Documento' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Imagen' })).toBeInTheDocument();

    // Seleccionar un tipo de archivo
    const imagenOption = screen.getByRole('option', { name: 'Imagen' });
    fireEvent.click(imagenOption);

    // Verificar que se puede eliminar el archivo
    const eliminarButton = screen.getByRole('button', { name: /eliminar/i });
    expect(eliminarButton).toBeInTheDocument();
  });

  it('debería permitir eliminar un archivo', () => {
    renderWithProviders(<CreateRecordDetailForm personId='1' />);

    // Crear un archivo de prueba
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    // Obtener el input de archivo y simular la subida
    const fileInput = screen.getByLabelText(/seleccionar archivo/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verificar que el nombre del archivo aparece
    expect(screen.getByText('test.pdf')).toBeInTheDocument();

    // Verificar que el botón de eliminar está presente
    const eliminarButton = screen.getByRole('button', { name: /eliminar/i });
    expect(eliminarButton).toBeInTheDocument();

    // Eliminar el archivo
    fireEvent.click(eliminarButton);

    // Verificar que el archivo ya no está presente
    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
  });

  it('debería limitar la cantidad de archivos a 5', () => {
    renderWithProviders(<CreateRecordDetailForm personId='1' />);

    // Crear 6 archivos de prueba
    const files = Array.from(
      { length: 6 },
      (_, index) => new File(['test content'], `test${index + 1}.pdf`, { type: 'application/pdf' }),
    );

    const fileInput = screen.getByLabelText(/seleccionar archivo/i);

    // Intentar agregar 6 archivos

    for (let i = 0; i < files.length; i++) {
      fireEvent.change(fileInput, { target: { files: [files[i]] } });
    }

    // Verificar que solo se muestran 5 archivos
    const fileNames = files.slice(0, 5).map((_, index) => `test${index + 1}.pdf`);

    // Verificar que cada uno de los primeros 5 archivos está presente
    for (let i = 0; i < fileNames.length; i++) {
      expect(screen.getByText(fileNames[i])).toBeInTheDocument();
    }

    // Verificar que el sexto archivo no está presente
    expect(screen.queryByText('test6.pdf')).not.toBeInTheDocument();

    // Verificar que hay exactamente 5 botones de "Eliminar"
    const eliminarButtons = screen.getAllByRole('button', { name: /eliminar/i });
    expect(eliminarButtons).toHaveLength(5);

    // Verificar que hay exactamente 5 selectores de tipo de archivo
    const fileTypeSelects = screen.getAllByRole('button', { name: /tipo de archivo/i });
    expect(fileTypeSelects).toHaveLength(5);
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRecordDetailSearch } from '../hooks/useRecordDetailSearch';
import type { RecordDetailListResponseDto } from '../types/RecordDetailListResponseDto';
import RecordDetailList from './RecordDetailList';
vi.mock('../hooks/useRecordDetailSearch');

const mockRecords: RecordDetailListResponseDto[] = [
  {
    id: '1',
    reason: 'Consulta General',
    visit_date: '2024-01-05',
    hospital_name: 'Hospital Central',
    doctor_name: 'Dr. Juan Pérez',
    files: [
      {
        name: 'radiografia.pdf',
        type_name: 'Receta',
        url: 'http://example.com/radiografia.pdf',
        mime_type: 'application/pdf',
        size: '50.00 KB',
        object_key: 'radiografia.pdf',
      },
    ],
  },
];

describe('RecordDetailList', () => {
  const mockSetPersonId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar los registros médicos correctamente', async () => {
    vi.mocked(useRecordDetailSearch).mockReturnValue({
      recordDetails: mockRecords,
      isLoading: false,
      isError: false,
      totalElements: 1,
      currentPage: 0,
      setPersonId: mockSetPersonId,
      setRangeDate: vi.fn(),
      searchTerm: '',
      setSearchTerm: vi.fn(),
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });

    render(
      <BrowserRouter>
        <RecordDetailList personId='123' />
      </BrowserRouter>,
    );

    await waitFor(() => {
      // Verificar que se muestra la información del registro
      expect(screen.getByText('Consulta General')).toBeDefined();
      expect(screen.getByText('Hospital Central')).toBeDefined();
      expect(screen.getByText('Dr. Juan Pérez')).toBeDefined();

      // Verificar archivo adjunto
      expect(screen.getByText('Receta')).toBeDefined();
      expect(screen.getByText('50.00 KB')).toBeDefined();
    });

    // Verificar que se llamó a setPersonId con el ID correcto
    expect(mockSetPersonId).toHaveBeenCalledWith('123');
  });
});

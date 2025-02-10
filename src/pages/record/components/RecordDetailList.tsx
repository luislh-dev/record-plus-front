import { Typography } from '@/components/Typography';
import { ACCEPTED_MIME_TYPES } from '@/constants/mineTypes';
import { Document } from '@/icons/Document';
import { Hospital } from '@/icons/Hospital';
import { Image } from '@/icons/Image';
import { Reloj } from '@/icons/Reloj';
import { Button, Chip } from "@heroui/react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordDetailSearch } from '../hooks/useRecordDetailSearch';
import { FileDetailDto } from '../types/RecordDetailListResponseDto';
import { DateRangeFilter } from './DateRangeFilter';
import { SearchRecordDetail } from './SearchRecordDetail';

interface RecordDetailListProps {
  personId: string | undefined;
}

interface FilePreviewProps {
  files: FileDetailDto[];
  maxVisible?: number;
}

const DocumentFileList = ({ files, maxVisible = 2 }: FilePreviewProps) => {
  const sortedFiles = files.sort((a, b) => {
    if (a.mime_type === ACCEPTED_MIME_TYPES.PDF && b.mime_type !== ACCEPTED_MIME_TYPES.PDF) {
      return -1;
    }
    if (b.mime_type === ACCEPTED_MIME_TYPES.PDF && a.mime_type !== ACCEPTED_MIME_TYPES.PDF) {
      return 1;
    }
    return 0;
  });

  const totalFiles = files.length;
  const displayFiles = sortedFiles.slice(0, maxVisible);
  const hiddenCount = totalFiles - maxVisible;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-wrap gap-2 items-center justify-end">
        {displayFiles.map(file => (
          <div
            key={file.url}
            className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {file.mime_type === ACCEPTED_MIME_TYPES.PDF ? (
              <Document size={20} fill="red" className="shrink-0" />
            ) : (
              <Image size={20} fill="blue" className="shrink-0" />
            )}
            <span className="ml-2 text-sm text-gray-600 hidden sm:inline">{file.type_name}</span>
            <span className="ml-2 text-xs text-gray-500 hidden lg:inline">{file.size}</span>
          </div>
        ))}

        {hiddenCount > 0 && (
          <Chip variant="bordered" size="md">
            +{hiddenCount}
          </Chip>
        )}
      </div>
    </div>
  );
};

export default function RecordDetailList({ personId }: RecordDetailListProps) {
  const { recordDetails, setPersonId, fetchNextPage, hasNextPage, isLoading, isError } =
    useRecordDetailSearch();

  useEffect(() => {
    setPersonId(personId || null);
  }, [personId, setPersonId]);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-wrap items-center p-4 gap-4">
        {/* Search */}
        <div className="w-80 ">
          <SearchRecordDetail />
        </div>
        {/* Date Range */}
        <div className="w-80">
          <DateRangeFilter />
        </div>
      </div>

      {isLoading && (
        <div>
          <p className="text-lg font-medium text-center p-40">Cargando registros...</p>
        </div>
      )}

      {isError && (
        <div>
          <p className="text-lg font-medium text-center p-40 text-red-500">
            Ocurrió un error al cargar los registros
          </p>
        </div>
      )}

      {recordDetails.length === 0 && !isLoading && !isError && (
        <div>
          <p className="text-lg font-medium text-center p-40">No se encontraron registros</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-4">
          <div className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
            {recordDetails.map(recordDetail => (
              <div
                key={recordDetail.id}
                onClick={() => navigate(`/people/${personId}/detail/record/${recordDetail.id}`)}
                className="p-4 flex flex-col sm:flex-row sm:justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                {/* Hospital Info */}
                <div className="flex-1 w-3/5">
                  <div className="flex items-center gap-2 ">
                    <Hospital size={20} />
                    <Typography variant="data-title">{recordDetail.hospital_name}</Typography>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Reloj size={20} fill="gray" />
                    <Typography variant="body-small">{recordDetail.visit_date}</Typography>
                  </div>
                  <p className="font-medium mt-2 line-clamp-1 overflow-hidden">
                    {recordDetail.reason}
                  </p>
                  <p className="text-gray-600">{recordDetail.doctor_name}</p>
                </div>

                {/* Files List */}
                <div className="flex flex-col sm:items-end 2xl:items-end justify-center space-y-2 w-full sm:w-2/5">
                  {recordDetail.files.length > 0 && (
                    <DocumentFileList
                      files={recordDetail.files}
                      maxVisible={window.innerWidth < 640 ? 2 : 3}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center py-4">
              <Button onPress={() => fetchNextPage()} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Cargar más registros'}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

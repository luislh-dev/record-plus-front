import { ACCEPTED_MIME_TYPES } from '@/constants/mineTypes';
import { Document } from '@/icons/Document';
import { Hospital } from '@/icons/Hospital';
import { Image } from '@/icons/Image';
import { Reloj } from '@/icons/Reloj';
import type { FileDetailDto, RecordDetailListResponseDto } from '@/pages/record/types/RecordDetailListResponseDto';
import { Chip } from '@heroui/react';

interface Props {
  record: RecordDetailListResponseDto;
}

interface FilePreviewProps {
  files: FileDetailDto[];
  maxVisible?: number;
}

const DocumentFileList = ({ files, maxVisible = 2 }: FilePreviewProps) => {
  const sortedFiles = files.toSorted((a, b) => {
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
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-wrap gap-2 items-center justify-end'>
        {displayFiles.map((file, index) => (
          <div
            key={file.url || index}
            className='flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer'
          >
            {file.mime_type === ACCEPTED_MIME_TYPES.PDF ? (
              <Document size={20} fill='red' className='shrink-0 ' />
            ) : (
              <Image size={20} fill='blue' className='shrink-0' />
            )}
            <span className='ml-2 text-sm text-gray-600 hidden sm:inline'>{file.type_name}</span>
            <span className='ml-2 text-xs text-gray-500 hidden lg:inline'>{file.size}</span>
          </div>
        ))}

        {hiddenCount > 0 && (
          <Chip variant='bordered' size='md'>
            +{hiddenCount}
          </Chip>
        )}
      </div>
    </div>
  );
};

export function PeopleRecordDetailCard({ record }: Readonly<Props>) {
  return (
    <div key={record.id} className='p-4 flex flex-col sm:flex-row sm:justify-between gap-4 '>
      {/* Hospital Info */}
      <div className='flex-1 w-3/5'>
        <div className='flex items-center gap-2 '>
          <Hospital size={20} />
          {record.hospital_name}
        </div>
        <div className='flex items-center gap-2 mt-1'>
          <Reloj size={20} fill='gray' />
          {record.visit_date}
        </div>
        <p className='font-medium mt-2 line-clamp-1 overflow-hidden'>{record.reason}</p>
        <p className='text-gray-600'>{record.doctor_name}</p>
      </div>

      {/* Files List */}
      <div className='flex flex-col sm:items-end 2xl:items-end justify-center space-y-2 w-full sm:w-2/5'>
        {record.files.length > 0 && (
          <DocumentFileList files={record.files} maxVisible={window.innerWidth < 640 ? 2 : 3} />
        )}
      </div>
    </div>
  );
}

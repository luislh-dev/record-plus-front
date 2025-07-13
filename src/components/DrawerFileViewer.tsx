import { Drawer, DrawerBody, DrawerContent } from '@heroui/react';
import { ImageViewer } from '@zeitui-org/image-viewer';
import { PDFViewer } from './pdfViewer/PDFViewer';

interface DrawerFileViewerProps {
  url: string;
  mineType: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerFileViewer = ({ isOpen, onClose, url, mineType }: DrawerFileViewerProps) => {
  const renderFileContent = () => {
    if (mineType === 'application/pdf') {
      return <PDFViewer src={url} />;
    }

    if (mineType.startsWith('image/')) {
      return <ImageViewer src={url} controlSize='sm' />;
    }

    return <div>Tipo de archivo no permitido</div>;
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='5xl' isDismissable={false}>
      <DrawerContent>
        <DrawerBody>
          <div className='pt-8'>{renderFileContent()}</div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

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
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size='5xl' isDismissable={false}>
        <DrawerContent>
          <DrawerBody>
            <div className='pt-8'>
              {mineType === 'application/pdf' ? (
                <PDFViewer src={url} />
              ) : mineType.startsWith('image/') ? (
                <ImageViewer src={url} controlSize='sm' />
              ) : (
                <div>Tipo de archivo no permitido</div>
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

import { Drawer, DrawerBody, DrawerContent } from '@nextui-org/react';
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
      <Drawer isOpen={isOpen} onClose={onClose} size="5xl" isDismissable={false}>
        <DrawerContent>
          <DrawerBody>
            <div className="pt-8">
              {mineType === 'application/pdf' ? (
                <PDFViewer src={url} />
              ) : (
                <div>File type not supported</div>
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

import { DrawerFileViewer } from '@/components/DrawerFileViewer';
import { downloadFile } from '@/components/pdfViewer/utils/DownloadFIles';
import { Calendar } from '@/icons/Calendar';
import { Document } from '@/icons/Document';
import { Download } from '@/icons/Download';
import { Hospital } from '@/icons/Hospital';
import { Image } from '@/icons/Image';
import { Person } from '@/icons/Person';
import { groupBy } from '@/utils/groupBy';
import { Button, Card, CardBody, CardHeader, Chip, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecordDetailById } from './hooks/useRecordDetailBy';

export const RecordDetail = () => {
  const { recordId, id: personId } = useParams<{ recordId: string; id: string }>();

  //Navegar directamente al perfil de la persona
  const handleNavigateToProfile = () => {
    navigate(`/people/${personId}/detail`);
  };

  const navigate = useNavigate();

  const { recordDetail } = useRecordDetailById(recordId ?? '');

  // dividir tratamiento por saltos de línea
  const treatmentList = recordDetail?.treatment.split('\\n');

  // agrupar archivos por tipo
  const groupedFiles = groupBy(recordDetail?.files ?? [], file => file.type_name);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [fileViewerData, setFileViewerData] = useState<{ url: string; mineType: string } | null>(
    null
  );

  const handleOpenFileViewer = (file: { url: string; mineType: string }) => {
    setFileViewerData({ url: file.url, mineType: file.mineType });
    onOpen();
  };

  return (
    <>
      <DrawerFileViewer
        isOpen={isOpen}
        onClose={onClose}
        url={fileViewerData?.url ?? ''}
        mineType={fileViewerData?.mineType ?? ''}
      />

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Detalle de registro</h2>
          <Chip
            classNames={{
              base: 'bg-gray-200'
            }}
            size="sm"
          >
            {recordDetail?.id}
          </Chip>
        </div>

        <Button color="primary" size="sm" onPress={handleNavigateToProfile}>
          Ir al perfil del paciente
        </Button>
      </div>
      <div className="p-4 space-y-4">
        {/* Doctor y Hospital info*/}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <Person className="h-4 w-4 t" fill="gray" />
                <span className="text-sm font-medium">Doctor:</span>
                <span className="text-sm t">{recordDetail?.doctorFullName}</span>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <Hospital className="h-4 w-4 t" color="gray" />
                <span className="text-sm font-medium">Hospital:</span>
                <span className="text-sm t">{recordDetail?.hospitalName}</span>
              </div>
            </CardBody>
          </Card>
        </div>
        {/* Fecha */}
        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 t" fill="gray" />
              <span className="text-sm font-medium">Día de visita:</span>
              <span className="text-sm ">{recordDetail?.visitDate}</span>
            </div>
          </CardBody>
        </Card>
        {/* razon y diagnostico */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="text-sm font-medium">Rázon de visita</CardHeader>
            <CardBody>
              <p className="text-sm text-muted">{recordDetail?.reason}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="text-sm font-medium">Diagnóstico</CardHeader>
            <CardBody>
              <p className="text-sm text-muted">{recordDetail?.diagnostic}</p>
            </CardBody>
          </Card>
        </div>
        {/* Tratamiento */}
        <Card>
          <CardHeader className="text-sm font-medium">Tratamiento</CardHeader>
          <CardBody>
            <ul className="space-y-2">
              {treatmentList?.map((item, index) => (
                <li key={index} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
        {/* Archivos */}
        <Card>
          <CardHeader className="text-sm font-medium">Archivos</CardHeader>
          <CardBody>
            <div className="grid gap-4">
              {Object.entries(groupedFiles).map(([type, typeFiles]) => (
                <div key={type}>
                  <h3 className="mb-2 text-sm font-medium">{type}</h3>
                  <div className="grid gap-2">
                    {typeFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-2">
                          {file.mime_type.startsWith('image') ? (
                            <Image className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Document className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                          <Button
                            onPress={() => {
                              handleOpenFileViewer({ url: file.url, mineType: file.mime_type });
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            Ver
                          </Button>
                          <Button onPress={() => downloadFile(file.url)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

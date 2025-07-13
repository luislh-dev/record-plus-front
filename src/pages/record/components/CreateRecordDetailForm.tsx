import { CustomSelect } from '@/components/CustomSelect';
import { DatePickerForm } from '@/components/DatePickerForm';
import { FilePicker } from '@/components/FilePicker';
import { TextAreaForm } from '@/components/TextAreaForm';
import { useFileType } from '@/hooks/fileType/useFileType';
import { useStates } from '@/hooks/state/useState';
import { Alert, Button, Select, SelectItem } from '@heroui/react';
import { getLocalTimeZone, now } from '@internationalized/date';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateRecordDetail } from '../hooks/useCreateRecordDetail';

interface FileWithType {
  file: File;
  typeId: number;
}

interface FormData {
  stateId: number;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  visitDate: string;
  fileTypes: Record<string, number>;
}

interface Props {
  personId: string;
}

export const CreateRecordDetailForm = ({ personId }: Props) => {
  const { fileTypes } = useFileType();
  const { state } = useStates();

  const { isLoading, error, isSuccess, handleCreate } = useCreateRecordDetail();

  const [filesWithTypes, setFilesWithTypes] = useState<FileWithType[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      stateId: 1,
      reason: '',
      diagnosis: '',
      treatment: '',
      visitDate: now(getLocalTimeZone()).toDate().toISOString().slice(0, 19),
      fileTypes: {},
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('personId', personId);
    formData.append('stateId', data.stateId.toString());
    formData.append('reason', data.reason);
    formData.append('diagnosis', data.diagnosis || '');
    formData.append('treatment', data.treatment || '');
    formData.append('visitDate', data.visitDate);

    for (const element of filesWithTypes) {
      const { file, typeId } = element;
      formData.append('files', file);
      formData.append('fileTypeIds', typeId.toString());
    }

    await handleCreate(formData);

    if (isSuccess) {
      reset();
      setFilesWithTypes([]);
    }
  };

  const handleFileAdd = (file: File | null) => {
    if (!file) return;

    // Si ya hay mas de 5 archivos seleccionados, no permitir agregar más
    if (filesWithTypes.length >= 5) return;

    const newFile: FileWithType = {
      file,
      typeId: 1,
    };

    setFilesWithTypes((prev) => [...prev, newFile]);
  };

  const handleFileTypeChange = (index: number, value: number) => {
    setFilesWithTypes((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        typeId: value,
      };
      return updated;
    });
  };

  const removeFile = (index: number) => {
    setFilesWithTypes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <TextAreaForm
        name='reason'
        label='Motivo de la visita'
        control={control}
        error={errors.reason}
        placeholder='Motivo de la visita (mínimo 10 caracteres)'
      />

      <TextAreaForm name='diagnosis' label='Diagnóstico' control={control} placeholder='Diagnóstico (opcional)' />

      <TextAreaForm name='treatment' label='Tratamiento' control={control} placeholder='Tratamiento (opcional)' />
      <div className='grid content-center grid-cols-1 gap-4 md:grid-cols-2'>
        <DatePickerForm name='visitDate' control={control} label='Fecha de la visita' isRequired variant='bordered' />

        <CustomSelect
          name='stateId'
          control={control}
          label='Estado'
          options={state}
          error={errors.stateId}
          placeholder='Seleccione un estado'
        />
      </div>

      <div className='space-y-2'>
        <FilePicker
          label='Seleccionar archivo'
          required
          onChange={handleFileAdd}
          className='disabled:opacity-50 disabled:cursor-not-allowed'
        />
      </div>

      {filesWithTypes.length > 0 && (
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Archivos seleccionados:</h3>
          {filesWithTypes.map(({ file }, index) => (
            <div key={crypto.randomUUID()} className='flex items-center gap-2 p-2 bg-gray-50 rounded'>
              <span className='flex-1'>{file.name}</span>
              <Controller
                name={`fileTypes.file${index}`}
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <Select
                    label='Tipo de archivo'
                    selectedKeys={[field.value.toString()]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      field.onChange(selected ? Number(selected) : 1);
                      handleFileTypeChange(index, Number(selected));
                    }}
                    variant='bordered'
                  >
                    {fileTypes?.map((option) => (
                      <SelectItem key={option.id.toString()} textValue={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Button type='button' variant='bordered' size='sm' onPress={() => removeFile(index)}>
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && <Alert color='danger' description={error} />}
      {isSuccess && <Alert color='success' description='Registro guardado exitosamente' />}

      <Button type='submit' color='primary' className='w-full' isDisabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar Registro'}
      </Button>
    </form>
  );
};

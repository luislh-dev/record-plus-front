import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { useState } from 'react';
import { DoctorForm } from './DoctorFrom';
import { ManagementForm } from './ManagementForm';

export const UserAddTabs = () => {
  const [selected, setSelected] = useState<React.Key>('management');

  return (
    <Card>
      <CardBody className='overflow-hidden'>
        <Tabs selectedKey={selected as string} onSelectionChange={setSelected}>
          <Tab key='management' title='Gestión'>
            <ManagementForm />
          </Tab>
          <Tab key='doctor' title='Médico'>
            <DoctorForm />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

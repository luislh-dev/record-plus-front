interface HeaderFormProps {
  title: string;
  description?: string;
}

export function HeaderForm(props: HeaderFormProps) {
  const { title, description } = props;

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      {description && <p className='text-gray-700'>{description}</p>}
    </div>
  );
}

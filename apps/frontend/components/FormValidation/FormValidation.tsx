import { DisasterDtoType } from '@wfp-dmp/interfaces';
import { formatForm } from '@wfp-dmp/interfaces/dist/kobo/utils';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DisasterFilter } from 'components/Filters/DisasterFilter';
import { RegionFilters } from 'components/Filters/RegionFilters';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType | undefined;
}): JSX.Element => {
  const formattedForm = useMemo(
    () => formatForm(validationForm),
    [validationForm],
  );
  const { control } = useForm({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
      disTyp: formattedForm.disasterType,
    },
  });

  return (
    <form>
      <Controller
        name="disTyp"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DisasterFilter value={value} onChange={onChange} />
        )}
      />
      <Controller
        name="region"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RegionFilters value={value} onChange={onChange} />
        )}
      />
    </form>
  );
};

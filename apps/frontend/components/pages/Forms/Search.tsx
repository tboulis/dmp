import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { TableDisplay } from 'components/TableDisplay';
import { useGetForms } from 'services/api/kobo/useGetForms';

const defaultSearchFormData: SearchFormData = {
  disTyp: DisasterMapping['flood'],
  region: {
    province: '',
    district: '',
    commune: '',
  },
  dateRange: {
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs(),
  },
};

export const FormSearch = () => {
  const [searchFormData, setSearchFormData] = useState(defaultSearchFormData);

  const { data: formData, isLoading } = useGetForms(searchFormData);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters
        initSearchFormData={searchFormData}
        setSearchFormData={setSearchFormData}
        submitButtonContent={
          <FormattedMessage
            id="navigation.forms.search"
            defaultMessage="Search"
          />
        }
      />
      <TableDisplay isLoading={isLoading} forms={formData} />
    </Box>
  );
};

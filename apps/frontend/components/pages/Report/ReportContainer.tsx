import { Box, Skeleton } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { Report } from 'components/Report/Report';
import { ReportSwitch } from 'components/ReportSwitch';
import { useGetForms } from 'services/api/kobo/useGetForms';
import { dropNotApproved } from 'utils/dropNotApproved';

const defaultSearchReportData: SearchFormData = {
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

export const ReportContainer = () => {
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  const [isDetailedReport, setIsDetailedReport] = useState(false);

  const { data: formsData, isLoading } = useGetForms(searchReportData);

  const filteredFormsData = useMemo(() => {
    return formsData !== undefined ? dropNotApproved(formsData) : undefined;
  }, [formsData]);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters
        initSearchFormData={searchReportData}
        setSearchFormData={setSearchReportData}
        submitButtonContent={
          <FormattedMessage
            id="report_page.showReport"
            defaultMessage="Show Report"
          />
        }
      />
      <ReportSwitch
        value={isDetailedReport}
        onChange={(event, checked) => {
          setIsDetailedReport(checked);
        }}
      />
      {(isLoading || filteredFormsData === undefined) && (
        <Skeleton
          variant="rounded"
          sx={{ minWidth: 800, minHeight: 400, mt: 5 }}
        />
      )}
      {filteredFormsData !== undefined && (
        <Report forms={filteredFormsData} isDetailedReport={isDetailedReport} />
      )}
    </Box>
  );
};

import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { DisasterType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const getColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  minWidth = 80,
  opts?: {
    type: 'singleSelect';
    valueOptions: { value: '1' | '2' | ''; label: string }[];
  },
): GridColDef => {
  const fields = {
    field,
    minWidth,
    flex: 1,
    editable: true,

    renderHeader: (params: GridColumnHeaderParams) => (
      <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
    ),
  };

  return { ...fields, ...opts };
};

const getLocationColumnSetup = (
  field:
    | KoboCommonKeys.province
    | KoboCommonKeys.district
    | KoboCommonKeys.commune,
  width = 90,
): GridColDef => {
  return {
    field,
    width,
    editable: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <FormattedMessage id={`forms_table.headers.${params.field}`} />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <FormattedMessage id={`${field}.${params.value as string}`} />
    ),
  };
};

const getLocationCountColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  width = 80,
): GridColDef => ({
  field,
  width,
  renderHeader: (params: GridColumnHeaderParams) => (
    <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
  ),
});

export const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});

export const addDetailedReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  getLocationColumnSetup(KoboCommonKeys.province, 75),
  getLocationColumnSetup(KoboCommonKeys.district, 60),
  getLocationColumnSetup(KoboCommonKeys.commune, 76),
  ...columns,
];

export const addBriefReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  getLocationColumnSetup(KoboCommonKeys.province, 75),
  getLocationCountColumnSetup(KoboCommonKeys.district, 'COMMON', 55),
  getLocationCountColumnSetup(KoboCommonKeys.commune, 'COMMON', 76),
  ...columns,
];

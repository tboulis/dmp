import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
} from '@mui/x-data-grid';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  isEditable: boolean;
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  getRowId,
  isEditable,
}: IProps): JSX.Element => {
  return (
    <DataGrid
      sx={{
        '& .MuiDataGrid-cell:focus': {
          outline: isEditable ? '' : 'none',
        },
        '& .MuiDataGrid-cell': {
          whiteSpace: 'normal !important',
          wordWrap: 'break-word !important',
        },
        '& .MuiDataGrid-columnHeaderTitleContainerContent': {
          whiteSpace: 'normal !important',
          wordWrap: 'break-word !important',
          lineHeight: 'normal',
        },
        mt: 1,
        breakInside: 'avoid',
      }}
      disableRowSelectionOnClick={!isEditable}
      showCellVerticalBorder
      showColumnVerticalBorder
      rows={data}
      columns={columns}
      hideFooter
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={columnGroup}
      isCellEditable={() => isEditable}
      processRowUpdate={(newRow: GridRowModel) => {
        if (onChange) onChange(newRow);

        return newRow;
      }}
      getRowId={getRowId}
      autoHeight
      columnHeaderHeight={75}
      disableVirtualization
    />
  );
};

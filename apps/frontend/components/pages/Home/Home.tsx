import { Box, Typography } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { TableDisplay } from 'components/TableDisplay';
import { ApiRoutes } from 'services/api/apiRoutes';
import { useGetMe } from 'services/api/user/useUser';

export const Home = (): JSX.Element => {
  const user = useGetMe();
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );

  return (
    <Box>
      {user && (
        <>
          <Typography variant="h3" mb={5}>
            Welcome {user.name}!
          </Typography>
        </>
      )}
      <TableDisplay isLoading={isLoading} forms={lastForms} />
    </Box>
  );
};

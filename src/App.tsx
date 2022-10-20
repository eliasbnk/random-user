import React from 'react';
import type { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useUserContext } from 'contexts/users-context';

const App: FC = () => {
  const { isLoading, fetchUserData, userData } = useUserContext();

  const getFormattedDate = (arg: string) => {
    const date = new Date(arg);
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  };

  const rows = userData.map((user) => {
    return {
      key: user.login.uuid,
      id: user.login.uuid,
      picture: user.picture.medium,
      nationality: user.nat,
      name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
      age: user.dob.age,
      dateOfBirth: getFormattedDate(user.dob.date),
      address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state} ${user.location.postcode} ${user.location.country}`,
      timezone: `${user.location.timezone.offset} ${user.location.timezone.description}`,
      email: user.email,
      homePhone: user.phone,
      cellPhone: user.cell,
      username: user.login.username,
      password: user.login.password,
      identification: user.id.value
        ? `${user.id.name}: ${user.id.value}`
        : 'not provided',
      registered: getFormattedDate(user.registered.date),
    };
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User Id', width: 300 },
    {
      field: 'picture',
      headerName: 'Image',
      width: 125,
      renderCell: (params) => (
        <img
          style={{ borderRadius: '50%', height: '50px' }}
          src={params.value}
          alt='user avatar'
        />
      ),
    },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'registered', headerName: 'Member Since', width: 200 },
    { field: 'nationality', headerName: 'Nationality', width: 150 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 95,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      width: 150,
    },
    { field: 'address', headerName: 'Address', width: 600 },
    { field: 'timezone', headerName: 'Timezone', width: 400 },
    { field: 'homePhone', headerName: 'Home Phone Number', width: 200 },
    { field: 'cellPhone', headerName: 'Cell Phone Number', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 400 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
    { field: 'identification', headerName: 'Identification', width: 400 },
  ];
  return (
    <div>
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Button
          disabled={isLoading}
          variant='contained'
          onClick={fetchUserData}
        >
          FETCH MORE USERS
        </Button>
      </div>
    </div>
  );
};

export default App;

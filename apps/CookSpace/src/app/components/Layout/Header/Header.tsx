import React, { useEffect } from 'react';
import styles from './Header.module.css';
import {
  Autocomplete,
  Avatar,
  Link,
  TextField,
  Typography,
} from '@mui/material';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
];
const Header = () => {
  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/register'
  ) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img height={48} src="/logo.png" alt="logo" />
      <div style={{ width: '70%' }}>
        <Autocomplete
          freeSolo
          fullWidth
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search input"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: 'search',
                },
              }}
            />
          )}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar
          sx={{ width: 24, height: 24 }}
          src="/broken-image.jpg"
          className={styles.avatar}
        />
        <Link href="/login">
          <Typography variant="body2">Log in</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Header;

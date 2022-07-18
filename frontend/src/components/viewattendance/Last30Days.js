import { useTheme } from '@emotion/react'
import { TableRow, TableCell, Typography, Checkbox } from '@mui/material'
import React from 'react'

const Last30Days = () => {
  const theme = useTheme()
  return (
    <TableRow
      sx={{
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <TableCell />
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Typography variant='h7'>
          {"jjjkk"}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Typography variant='h7'>
          {"jjjkk"}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Typography variant='h7'>
          <Checkbox checked color='secondary' />
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
      <TableCell align='left'>
        <Checkbox checked color='secondary' />
      </TableCell>
    </TableRow>
  )
}

export default Last30Days
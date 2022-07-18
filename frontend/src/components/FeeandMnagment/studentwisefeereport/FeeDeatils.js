import { useTheme } from '@emotion/react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const FeeDeatils = () => {
  const theme = useTheme()
  return (
    <TableContainer>
      <Table size="small" denes="true">
          <TableHead sx={{ background: theme.palette.secondary.normal }}>
            <TableRow>
              <TableCell align='left'>
                <Typography variant="h7"
                  color={"primary.contrastText"}>
                  Installment Date
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant="h7"
                  color={"primary.contrastText"}>
                  Payment Type</Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant="h7"
                  color={"primary.contrastText"}>
                  Amount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='left'>
                <Typography
                  variant='h7'
                >
                  bfjgh
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography
                  variant='h7'
                >
                  bfjgh
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography
                  variant='h7'
                >
                  bfjgh
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>
              </TableCell>
              <TableCell align='left'>
              </TableCell>
              <TableCell align='left'>
                <Typography>
                  Total : 2000
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
  )
}

export default FeeDeatils
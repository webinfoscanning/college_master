import React from 'react'
import Expenselists from '../../components/expense/Expenselists'
import ExpenselistHeader from '../../components/expense/ExpenselistHeader'
import AddHeader from '../../components/Master/AddHeader'
import { Typography } from '@mui/material'
import GoBack from '../../components/back/GoBack'

const ExpenseList = () => {
  return (
    <div>
      <AddHeader
        StyledButton={
          <Typography
            color="secondary"
            variant="h6"
            className='m-1'
          >Expense List</Typography>
        }
        ArrowBack={<GoBack />}
      />
      <br />
      {/* display ExpenselistHeader only for super admin, now the userTypes are not made */}
      {/* <ExpenselistHeader/> */}

      <Expenselists />
    </div>
  )
}

export default ExpenseList
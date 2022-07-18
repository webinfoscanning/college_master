import { Button } from '@mui/material';
import React from 'react'
import GoBack from '../back/GoBack';
import AddHeader from '../Master/AddHeader';
import './../../style/style.css'
import ExpenseForm from './ExpenseForm';
export const AddexpnseHeader = () => {
  return (
    <div>
      <AddHeader
        StyledButton={
          <Button
            color="secondary"
            variant="contained"
            className='m-1'
          >
            Expense  +  
          </Button>
        }
        ArrowBack={
          <GoBack/>
        }
      />
      <br/>
      <ExpenseForm/>
    </div>
  )
}
export default AddexpnseHeader;
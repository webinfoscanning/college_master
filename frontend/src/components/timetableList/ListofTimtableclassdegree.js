import {
  TableContainer,
  Table,
  Paper,
  Box,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
  Typography,
  Button
} from '@mui/material'
import TableHeader from "./TableHeader"
import React from 'react'
import { getComparator, stableSort } from '../logic/RecomendedFunctions'
import Delete from './../Alerts/DeleteConfirmation.js'
import Edit from "./../EditModal/index"
const ListofTimtableclassdegree = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const createSortHandler = (property) => (event) => {
    _handleRequestSort(event, property);
  };
  const _handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const _handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const _handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <br />
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHeader
                createSortHandler={createSortHandler}
                headLabel={headLabel}
                order={order}
                orderBy={orderBy}
                action={true}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align='left'>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.class}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.deparment}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.acadamicyear}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.section}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <div className="row">
                            <div className='pr-1 column'>
                              <Button
                                size='small'
                                className='mr-1 fullWidth'
                                color="secondary"
                                variant='contained'
                                sx={{ width: "100%", p: "0.1em", borderRadius: "2px" }}
                              >Add Timetable</Button>
                            </div>
                            <div className='pr-1 column'>
                              <Delete />
                            </div>
                            <div className='column'>
                              <Edit />
                            </div>

                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, 200]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={_handleChangePage}
              onRowsPerPageChange={_handleChangeRowsPerPage} />
          </TableContainer>
        </Paper>
      </Box>
    </div>
  )
}

export default ListofTimtableclassdegree
const headLabel = [
  { id: "class", label: "Class/Degree", alignRight: "left" },
  { id: "deparment", label: "Department", alignRight: "left" },
  { id: "Acadmicyear", label: "Acadamic year", alignRight: "left" },
  { id: "Section", label: "Section", alignRight: "left" },
];

const rows = [{
  "class": "Silvan",
  "deparment": "Cadd",
  "acadamicyear": "scadd0@marriott.com",
  "section": "Male",
}, {
  "class": "Halimeda",
  "deparment": "Lyfe",
  "acadamicyear": "hlyfe1@vinaora.com",
  "section": "Genderfluid",
}, {
  "class": "Alphonso",
  "deparment": "Crowcroft",
  "acadamicyear": "acrowcroft2@weibo.com",
  "section": "Male",
}, {
  "class": "Paulita",
  "deparment": "Rankin",
  "acadamicyear": "prankin3@mit.edu",
  "section": "Female",
}, {
  "class": "Edy",
  "deparment": "Taplin",
  "acadamicyear": "etaplin4@hostgator.com",
  "section": "Female",
}, {
  "class": "Anne-corinne",
  "deparment": "Pearlman",
  "acadamicyear": "apearlman5@blog.com",
  "section": "Female",
}, {
  "class": "Elysia",
  "deparment": "Pocknell",
  "acadamicyear": "epocknell6@unc.edu",
  "section": "Female",
}, {
  "class": "Danette",
  "deparment": "Reape",
  "acadamicyear": "dreape7@yellowpages.com",
  "section": "Female",
}, {
  "class": "Marty",
  "deparment": "Favela",
  "acadamicyear": "mfavela8@mashable.com",
  "section": "Male",
}, {
  "class": "Jaquenette",
  "deparment": "Gemeau",
  "acadamicyear": "jgemeau9@indiatimes.com",
  "section": "Female",
}, {
  "class": "Dilly",
  "deparment": "Jelleman",
  "acadamicyear": "djellemana@unesco.org",
  "section": "Male",
}, {
  "class": "Mallissa",
  "deparment": "Pidgin",
  "acadamicyear": "mpidginb@arizona.edu",
  "section": "Female",
}, {
  "class": "Derry",
  "deparment": "Di Iorio",
  "acadamicyear": "ddiiorioc@quantcast.com",
  "section": "Male",
}, {
  "class": "Renelle",
  "deparment": "Jerrand",
  "acadamicyear": "rjerrandd@upenn.edu",
  "section": "Female",
}, {
  "class": "Graeme",
  "deparment": "Greggersen",
  "acadamicyear": "ggreggersene@barnesandnoble.com",
  "section": "Male",
}, {
  "class": "Belvia",
  "deparment": "Drinkhall",
  "acadamicyear": "bdrinkhallf@domainmarket.com",
  "section": "Female",
}, {
  "class": "Beauregard",
  "deparment": "Risson",
  "acadamicyear": "brissong@nyu.edu",
  "section": "Male",
}, {
  "class": "Rafaelia",
  "deparment": "Dalyell",
  "acadamicyear": "rdalyellh@liveinternet.ru",
  "section": "Female",
}, {
  "class": "Cicely",
  "deparment": "Hitzke",
  "acadamicyear": "chitzkei@admin.ch",
  "section": "Female",
}, {
  "class": "Maureene",
  "deparment": "MacKim",
  "acadamicyear": "mmackimj@de.vu",
  "section": "Female",
}, {
  "class": "Matelda",
  "deparment": "Thorby",
  "acadamicyear": "mthorbyk@prnewswire.com",
  "section": "Female",
}, {
  "class": "Alessandra",
  "deparment": "Alesin",
  "acadamicyear": "aalesinl@tripadvisor.com",
  "section": "Female",
}, {
  "class": "Alexio",
  "deparment": "Warnes",
  "acadamicyear": "awarnesm@google.nl",
  "section": "Male",
}, {
  "class": "Kacie",
  "deparment": "Wilkowski",
  "acadamicyear": "kwilkowskin@furl.net",
  "section": "Female",
}, {
  "class": "Hew",
  "deparment": "Vosse",
  "acadamicyear": "hvosseo@dell.com",
  "section": "Male",
}, {
  "class": "Webster",
  "deparment": "Drillingcourt",
  "acadamicyear": "wdrillingcourtp@google.fr",
  "section": "Male",
}, {
  "class": "Viviyan",
  "deparment": "Chartres",
  "acadamicyear": "vchartresq@ebay.com",
  "section": "Female",
}, {
  "class": "Sammy",
  "deparment": "Quaintance",
  "acadamicyear": "squaintancer@home.pl",
  "section": "Male",
}, {
  "class": "Robert",
  "deparment": "Stopp",
  "acadamicyear": "rstopps@myspace.com",
  "section": "Male",
}, {
  "class": "Annora",
  "deparment": "Ciciari",
  "acadamicyear": "aciciarit@oakley.com",
  "section": "Female",
}]

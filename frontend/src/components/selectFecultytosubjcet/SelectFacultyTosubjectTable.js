import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useTheme } from '@emotion/react'
import {
  Paper,
  Table,
  TableContainer,
  Box,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  TablePagination
} from '@mui/material'
import { connect } from 'react-redux'
import { getComparator, stableSort } from '../logic/RecomendedFunctions'
import SearchBar from '../Master/SearchBar'
import TableHeader from '../Table/TableHeader'
import { GET_FACULTY_LIST, MAP_FACULTY_TO_SUBJECT } from "../../redux/action/mapsubject"
import { getuserId } from '../logic/RecomendedFunctions';

const userid = getuserId()?.id
const SelectFacultyTosubjectTable = (props) => {

  const theme = useTheme()
  const {
    GET_FACULTY_LIST,
    getFacultylist,
    MAP_FACULTY_TO_SUBJECT
  } = props

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("")

  const location = useLocation()

  let subject = location?.state?.row.subjectJson

  useEffect(() => {
    GET_FACULTY_LIST()

  }, [GET_FACULTY_LIST])

  useMemo(() => {
    setdata(getFacultylist)
  }, [setdata, getFacultylist])


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

  const _handleSubmit = (e, mapdata) => {
    e.preventDefault()

    subject.createdOn = new Date().toISOString()
    subject.userId = userid

    const payload = {
      "empRefId": (mapdata.id).toString(),
      "institutionId": mapdata.institutionId,
      "mappedSubject": JSON.stringify(subject)
    }

    MAP_FACULTY_TO_SUBJECT(payload)

  }

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)

  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();
    if (SearchValue.length !== "") {
      let filterdata = getFacultylist.filter(
        (item) =>

          item.employeeId.toLowerCase().includes(SearchValue) ||
          item.firstName.toLowerCase().includes(SearchValue) ||
          item.department?.subHeader.includes(SearchValue) ||
          item.workingHours.includes(SearchValue)
      );
      setdata(filterdata);
    }
    else {
      setdata(getFacultylist);
    }
  }

  return (
    <Box>
      <Paper>
        <TableContainer>
          <div className='space-between'>
            <SearchBar
              _handlechangeSearch={_handlechangeSearch}
              search={search}
              _handleKeyPress={_handleKeyPress}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, 200]}
              component="div"
              count={data?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={_handleChangePage}
              onRowsPerPageChange={_handleChangeRowsPerPage}
            />
          </div>
          <Table>
            <TableHeader
              createSortHandler={createSortHandler}
              headLabel={headLabel}
              order={order}
              orderBy={orderBy}
              action={true}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => {
                  return (
                    <TableRow key={i} sx={
                      {
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover
                        }
                      }} >
                      <TableCell align='left'>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.employeeId}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.firstName}</Typography>&nbsp;
                        <Typography variant='h7'>{item?.lastName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.department?.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.workingHours}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        {
                          item.mappedSubject === null ? (
                            null
                          ) : (
                            item.mappedSubject.subHeader

                          )
                        }

                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          size="small"
                          variant='contained'
                          color="secondary"
                          onClick={(e) => { _handleSubmit(e, item) }}
                        >
                          Select Faculty
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}


const mapStateprops = (state) => {
  return {
    getFacultylist: state.Mapsubject.getFacultylist
  }
}

export default connect(mapStateprops, { GET_FACULTY_LIST, MAP_FACULTY_TO_SUBJECT })(SelectFacultyTosubjectTable)

const headLabel = [
  { id: "FacultyId", label: "Faculty ID", alignRight: "left" },
  { id: "FacultyName", label: "Faculty Name", alignRight: "left" },
  { id: "Department", label: "Department", alignRight: "left" },
  { id: "WorkingHours", label: "Working Hours", alignRight: "left" },
  { id: "Subject Already Mapped", label: "Subject Already Mapped", alignRight: "left" },
];

const rows = [{
  "class": "className",
  "subjectCode": "Silvan",
  "AcadmicYear": "Cadd",
  "section": "scadd0@marriott.com",
  "location": "Male",
  "SubjectAlreadyMapped": "217.237.124.116",
  "FacultyId": "Prodder",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Halimeda",
  "AcadmicYear": "Lyfe",
  "section": "hlyfe1@vinaora.com",
  "location": "Genderfluid",
  "SubjectAlreadyMapped": "101.92.73.212",
  "FacultyId": "Cardify",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Alphonso",
  "AcadmicYear": "Crowcroft",
  "section": "acrowcroft2@weibo.com",
  "location": "Male",
  "SubjectAlreadyMapped": "41.117.90.178",
  "FacultyId": "Transcof",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Paulita",
  "AcadmicYear": "Rankin",
  "section": "prankin3@mit.edu",
  "location": "Female",
  "SubjectAlreadyMapped": "249.240.10.160",
  "FacultyId": "Duobam",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Edy",
  "AcadmicYear": "Taplin",
  "section": "etaplin4@hostgator.com",
  "location": "Female",
  "SubjectAlreadyMapped": "100.247.40.45",
  "FacultyId": "Pannier",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Anne-corinne",
  "AcadmicYear": "Pearlman",
  "section": "apearlman5@blog.com",
  "location": "Female",
  "SubjectAlreadyMapped": "207.30.248.63",
  "FacultyId": "Stringtough",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Elysia",
  "AcadmicYear": "Pocknell",
  "section": "epocknell6@unc.edu",
  "location": "Female",
  "SubjectAlreadyMapped": "81.117.49.101",
  "FacultyId": "Greenlam",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Danette",
  "AcadmicYear": "Reape",
  "section": "dreape7@yellowpages.com",
  "location": "Female",
  "SubjectAlreadyMapped": "57.5.16.209",
  "FacultyId": "Ronstring",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Marty",
  "AcadmicYear": "Favela",
  "section": "mfavela8@mashable.com",
  "location": "Male",
  "SubjectAlreadyMapped": "185.51.86.238",
  "FacultyId": "Quo Lux",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Jaquenette",
  "AcadmicYear": "Gemeau",
  "section": "jgemeau9@indiatimes.com",
  "location": "Female",
  "SubjectAlreadyMapped": "78.26.34.32",
  "FacultyId": "Subin",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Dilly",
  "AcadmicYear": "Jelleman",
  "section": "djellemana@unesco.org",
  "location": "Male",
  "SubjectAlreadyMapped": "240.235.245.125",
  "FacultyId": "Aerified",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Mallissa",
  "AcadmicYear": "Pidgin",
  "section": "mpidginb@arizona.edu",
  "location": "Female",
  "SubjectAlreadyMapped": "180.8.151.36",
  "FacultyId": "Temp",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Derry",
  "AcadmicYear": "Di Iorio",
  "section": "ddiiorioc@quantcast.com",
  "location": "Male",
  "SubjectAlreadyMapped": "141.103.161.124",
  "FacultyId": "Otcom",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Renelle",
  "AcadmicYear": "Jerrand",
  "section": "rjerrandd@upenn.edu",
  "location": "Female",
  "SubjectAlreadyMapped": "5.83.148.181",
  "FacultyId": "Job",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Graeme",
  "AcadmicYear": "Greggersen",
  "section": "ggreggersene@barnesandnoble.com",
  "location": "Male",
  "SubjectAlreadyMapped": "60.198.142.69",
  "FacultyId": "Bytecard",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Belvia",
  "AcadmicYear": "Drinkhall",
  "section": "bdrinkhallf@domainmarket.com",
  "location": "Female",
  "SubjectAlreadyMapped": "24.181.46.221",
  "FacultyId": "Duobam",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Beauregard",
  "AcadmicYear": "Risson",
  "section": "brissong@nyu.edu",
  "location": "Male",
  "SubjectAlreadyMapped": "173.232.138.107",
  "FacultyId": "Namfix",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Rafaelia",
  "AcadmicYear": "Dalyell",
  "section": "rdalyellh@liveinternet.ru",
  "location": "Female",
  "SubjectAlreadyMapped": "25.89.121.162",
  "FacultyId": "Tres-Zap",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Cicely",
  "AcadmicYear": "Hitzke",
  "section": "chitzkei@admin.ch",
  "location": "Female",
  "SubjectAlreadyMapped": "234.246.134.186",
  "FacultyId": "Sonair",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Maureene",
  "AcadmicYear": "MacKim",
  "section": "mmackimj@de.vu",
  "location": "Female",
  "SubjectAlreadyMapped": "116.95.21.198",
  "FacultyId": "Asoka",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Matelda",
  "AcadmicYear": "Thorby",
  "section": "mthorbyk@prnewswire.com",
  "location": "Female",
  "SubjectAlreadyMapped": "212.100.249.45",
  "FacultyId": "Aerified",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Alessandra",
  "AcadmicYear": "Alesin",
  "section": "aalesinl@tripadvisor.com",
  "location": "Female",
  "SubjectAlreadyMapped": "15.100.20.242",
  "FacultyId": "Bytecard",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Alexio",
  "AcadmicYear": "Warnes",
  "section": "awarnesm@google.nl",
  "location": "Male",
  "SubjectAlreadyMapped": "245.72.129.140",
  "FacultyId": "Lotstring",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Kacie",
  "AcadmicYear": "Wilkowski",
  "section": "kwilkowskin@furl.net",
  "location": "Female",
  "SubjectAlreadyMapped": "182.216.29.116",
  "FacultyId": "Tresom",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Hew",
  "AcadmicYear": "Vosse",
  "section": "hvosseo@dell.com",
  "location": "Male",
  "SubjectAlreadyMapped": "186.56.148.215",
  "FacultyId": "Matsoft",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Webster",
  "AcadmicYear": "Drillingcourt",
  "section": "wdrillingcourtp@google.fr",
  "location": "Male",
  "SubjectAlreadyMapped": "66.113.140.164",
  "FacultyId": "Redhold",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Viviyan",
  "AcadmicYear": "Chartres",
  "section": "vchartresq@ebay.com",
  "location": "Female",
  "SubjectAlreadyMapped": "230.153.23.157",
  "FacultyId": "Biodex",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Sammy",
  "AcadmicYear": "Quaintance",
  "section": "squaintancer@home.pl",
  "location": "Male",
  "SubjectAlreadyMapped": "112.184.152.94",
  "FacultyId": "Trippledex",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Robert",
  "AcadmicYear": "Stopp",
  "section": "rstopps@myspace.com",
  "location": "Male",
  "SubjectAlreadyMapped": "56.55.137.93",
  "FacultyId": "Fintone",
  "FacultyName": "something"
}, {
  "class": "className",
  "subjectCode": "Annora",
  "AcadmicYear": "Ciciari",
  "section": "aciciarit@oakley.com",
  "location": "Female",
  "SubjectAlreadyMapped": "144.83.127.101",
  "FacultyId": "Toughjoyfax",
  "FacultyName": "something"
}]
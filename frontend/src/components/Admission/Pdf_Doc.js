import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styled from '@emotion/styled'
import { Card, Grid, Typography } from '@mui/material'
import "../../style/style.css"
import defalutimage from "../../assets/images/default.jpg"
import moment from 'moment'

const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.main,
    width: "100%",
    padding: "1em",
    color: theme.palette.common.white,
}))

const Pdf_Doc = (props) => {
    const {
        studentDetails
    } = props
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    const inputRef = useRef(null);

    const printDocument = () => {
        html2canvas(inputRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            let pdf = new jsPDF();
            pdf.setProperties({
                title: "Report"
            });
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.output('dataurlnewwindow');
        });
    };

    function onDocumentLoadSuccess({ numPages }) {
        //setNumPages(numPages);
        setPageNumber(1);
    }


    return (
        <div>
            <div>
                <button onClick={printDocument}>Print</button>
            </div>
            {
                studentDetails.map((student) => (
                    <div id="divToPrint" ref={inputRef}>
                        <div><b>Class/Degree</b>: {student.classDegree?.subHeader}</div>
                        <div>Note: Here the dimensions of div are same as A4</div>
                        <div>You Can add any component here</div>
                    </div>
                ))
            }
            {/* <Document
                file={pdf}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document> */}

            {
                studentDetails.map((student) => (
                    <div>
                        <StyledCard>
                            <Grid container spacing={1}>
                                <Grid item sm={5} md={5}>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Class/Degree</b>: {student.classDegree?.subHeader}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Academic Year</b>: {student.acedemicYear.subHeader}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Gender</b>: {student.gender.subHeader}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Dob</b>: {moment(student.dob).format("DD-MM-YYYY")}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Email</b>: {student.email ? student.email : ""}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Aadhaar Card</b>: {student.aadhar}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Mother Name</b>: {student.mothername ? student.mothername : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Address</b>: {student.address}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>City</b>: {student.city?.subHeader ? student.city?.subHeader : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Country</b>: {student.country?.subHeader ? student.country?.subHeader : null}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item sm={5} md={5}>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Department</b>: {student.department?.subHeader ? student.department?.subHeader : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Student Name</b>: {student.firstname ? student.firstname : null}
                                            &nbsp;&nbsp;{student.lastname ? student.lastname : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Student ID</b>: {student.id}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Mobile</b>: {student.phone ? student.phone : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Religion</b>: {student.religion?.subHeader ? student.religion?.subHeader : null}
                                        </Typography>
                                    </div>
                                    <div className="m-1">
                                        <Typography
                                            variant="h7"
                                        >
                                            <b>Father Name</b>: {student.fathername ? student.fathername : null}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item sm={2} md={2} className='flex-end'>
                                    <Card className='profile-card' sx={{ borderRadius: 0, }}>
                                        <div>
                                            <img className='object-fit' src={student?.image !== null ? student?.image : defalutimage} alt="parents" />
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </div>
                ))
            }
        </div>
    )
}
export default Pdf_Doc;

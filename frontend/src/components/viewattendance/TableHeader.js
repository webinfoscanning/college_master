import {
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const TableHeader = (props) => {
    const { headLabel } = props;
    return (
        <TableHead >
            <TableRow>
                <TableCell align={"left"} padding={"normal"} />
                {headLabel.map((item) => {
                    return (
                        <TableCell
                            align={headLabel.alignRight === null ? "center" : headLabel.alignRight ? "right" : "left"}
                            padding={"normal"}
                            key={item.id} >
                            <Typography
                                variant="h6"
                                color={"secondary"}
                            >{item.label}
                            </Typography>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead >
    );
};
export default TableHeader;

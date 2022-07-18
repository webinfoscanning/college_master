import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

const MasterTableHeader = (props) => {
  const { createSortHandler, headLabel, order, orderBy } = props;
  
  return (
    <TableHead>
      <TableRow>
        <TableCell align={"left"} padding={"normal"} />
        {headLabel.map((item) => {
          return (
            <TableCell key={item.label} align={"left"} padding={"normal"}>
              <TableSortLabel
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : "asc"}
                onClick={createSortHandler(item?.id)}
              >
                <Typography variant="h6">{item.label}</Typography>
              </TableSortLabel>
            </TableCell>
          );
        })}
        <TableCell align={"center"} padding={"normal"}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default MasterTableHeader;

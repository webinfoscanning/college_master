import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

const TableHeader = (props) => {
  const { createSortHandler, headLabel, order, orderBy, action } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell align={headLabel.alignRight ? "right" : "left"} padding={"normal"} />
        {headLabel.map((item) => {
          return (
            <TableCell
              align={headLabel.alignRight === null ? "center" : headLabel.alignRight ? "right" : "left"}
              padding={"normal"}
              key={item.id} >
              <TableSortLabel
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : "asc"}
                onClick={createSortHandler(item?.id)}
              >
                <Typography
                  color={"secondary"}
                  variant="h6"
                >{item.label}
                </Typography>
              </TableSortLabel>
            </TableCell>
          );
        })}
        {
          action ? <TableCell align={"left"} padding={"normal"} >
            <Typography variant="h6"
              color={"secondary"}
            >Select</Typography>
          </TableCell> : null
        }
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;

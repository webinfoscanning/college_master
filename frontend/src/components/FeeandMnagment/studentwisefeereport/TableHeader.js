import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

const TableHeader = (props) => {
  const { createSortHandler, headLabel, order, orderBy } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headLabel.map((item) => {
          return (
            <TableCell
              align={item.alignRight}
              padding={"normal"}
              key={item.id} >
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
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;

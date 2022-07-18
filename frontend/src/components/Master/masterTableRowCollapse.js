import { TableCell, Collapse, } from "@mui/material";
import React from "react";
import CollapsRows from "./CollapsRows";

const MasterTableRowCollapse = (props) => {
  const { openCollapse, row, } = props;
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
      <div>
        <Collapse in={openCollapse === row.id}  >
          <CollapsRows  row={row}/>
        </Collapse>
      </div>
    </TableCell>
  );
};

export default MasterTableRowCollapse;

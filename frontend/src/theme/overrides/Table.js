// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          backgorund: "red",
        },
      },
      headerStyle: {
        backgroundColor: "red",
        color: theme.palette.primary.main,
      },
    },
  };
}

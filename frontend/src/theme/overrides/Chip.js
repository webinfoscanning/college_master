// ----------------------------------------------------------------------

export default function Chip(theme) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        label: {
          "& .MuiChip-label": {
            fontWeight: "bold",
          },
        },
      },
    },
  };
}

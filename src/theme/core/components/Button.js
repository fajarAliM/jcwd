const Button = (theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
        },
        outlined: {
          "&:hover": {
            backgroundColor: theme.palette.Brand["500"],
            color: "white",
            borderColor: "transparent",
          },
          borderColor: theme.palette.Brand["500"],
          color: theme.palette.Brand["500"],
        },
        contained: {
          "&:hover": {
            backgroundColor: theme.palette.Brand["600"],
            borderColor: theme.palette.Brand["500"],
            boxShadow: 0,
            border: 0,
          },
          color: "white",
          backgroundColor: theme.palette.Brand["500"],
          boxShadow: 0,
          border: "1px transparent",
        },
      },
    },
  };
};

export default Button;

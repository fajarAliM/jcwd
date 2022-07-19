import { Box, Typography, Divider } from "@mui/material";

const IncomeStatement = ({
  title1,
  title2,
  kategori = [],
  footer,
  footerValue,
}) => {
  return (
    <>
      <Box marginBottom="16px" display="flex" justifyContent="space-between">
        <Typography fontWeight="bold" fontSize="24px">
          {title1}
        </Typography>
        <Typography fontWeight="bold" fontSize="24px">
          {title2}
        </Typography>
      </Box>
      {kategori.map((val, idx) => {
        return (
          <Box
            marginBottom="10px"
            display="flex"
            justifyContent="space-between"
          >
            <Typography>
              {idx + 1}. {val.kategoriName}
            </Typography>
            <Typography>{val.value}</Typography>
          </Box>
        );
      })}
      <Divider />
      <Box
        marginTop="10px"
        marginBottom="30px"
        display="flex"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold">{footer}</Typography>
        <Typography fontWeight="bold">{footerValue}</Typography>
      </Box>
    </>
  );
};

export default IncomeStatement;

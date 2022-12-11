import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export const AddressesListResults = ({ addresses, ...rest }) => {
  const [selectedAddressIds, setSelectedAddressIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedAddressIds;

    if (event.target.checked) {
      newSelectedAddressIds = addresses.map((address) => address.cep);
    } else {
      newSelectedAddressIds = [];
    }

    setSelectedAddressIds(newSelectedAddressIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAddressIds.indexOf(id);
    let newSelectedAddressIds = [];

    if (selectedIndex === -1) {
      newSelectedAddressIds = newSelectedAddressIds.concat(selectedAddressIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAddressIds = newSelectedAddressIds.concat(selectedAddressIds.slice(1));
    } else if (selectedIndex === selectedAddressIds.length - 1) {
      newSelectedAddressIds = newSelectedAddressIds.concat(selectedAddressIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAddressIds = newSelectedAddressIds.concat(
        selectedAddressIds.slice(0, selectedIndex),
        selectedAddressIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAddressIds(newSelectedAddressIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAddressIds.length === addresses.length}
                    color="primary"
                    indeterminate={
                      selectedAddressIds.length > 0 && selectedAddressIds.length < addresses.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>Logradouro</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.slice(0, limit).map((address) => (
                <TableRow
                  hover
                  key={address.cep}
                  selected={selectedAddressIds.indexOf(address.cep) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAddressIds.indexOf(address.cep) !== -1}
                      onChange={(event) => handleSelectOne(event, address.cep)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{address.cep}</TableCell>
                  <TableCell>{address.logradouro}</TableCell>
                  <TableCell>{address.bairro}</TableCell>
                  <TableCell>{address.cidade}</TableCell>
                  <TableCell>{address.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={addresses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AddressesListResults.propTypes = {
  addresses: PropTypes.array.isRequired,
};

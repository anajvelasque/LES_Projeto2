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
import { useRouter } from "next/router";

export const PatientListResults = ({ patients, ...rest }) => {
  const [selectedPatientIds, setSelectedPatientIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const router = useRouter();
  const handleGoToPatientRegister = () => {
    router.push("/register-patients");
  };

  const handleSelectAll = (event) => {
    let newSelectedPatientIds;

    if (event.target.checked) {
      newSelectedPatientIds = patients.map((patient) => patient.id);
    } else {
      newSelectedPatientIds = [];
    }

    setSelectedPatientIds(newSelectedPatientIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPatientIds.indexOf(id);
    let newSelectedPatientIds = [];

    if (selectedIndex === -1) {
      newSelectedPatientIds = newSelectedPatientIds.concat(selectedPatientIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPatientIds = newSelectedPatientIds.concat(selectedPatientIds.slice(1));
    } else if (selectedIndex === selectedPatientIds.length - 1) {
      newSelectedPatientIds = newSelectedPatientIds.concat(selectedPatientIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPatientIds = newSelectedPatientIds.concat(
        selectedPatientIds.slice(0, selectedIndex),
        selectedPatientIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPatientIds(newSelectedPatientIds);
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
                    checked={selectedPatientIds.length === patients.length}
                    color="primary"
                    indeterminate={
                      selectedPatientIds.length > 0 && selectedPatientIds.length < patients.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell> Nome </TableCell>
                <TableCell> Email </TableCell>
                <TableCell> Endereço </TableCell>
                <TableCell> Telefone </TableCell>
                <TableCell> Tipo Sanguíneo </TableCell>
                <TableCell> Peso </TableCell>
                <TableCell> Altura </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.slice(0, limit).map((patient) => (
                <TableRow
                  hover
                  key={patient.id}
                  selected={selectedPatientIds.indexOf(patient.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPatientIds.indexOf(patient.id) !== -1}
                      onChange={(event) => handleSelectOne(event, patient.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell> {patient.email} </TableCell>
                  <TableCell>{`${patient.cep}, ${patient.logradouro}`}</TableCell>
                  <TableCell> {patient.phone} </TableCell>
                  <TableCell> {patient.bloodType} </TableCell>
                  <TableCell> {patient.weigth} </TableCell>
                  <TableCell> {patient.heigth} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={patients.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PatientListResults.propTypes = {
  patients: PropTypes.array.isRequired,
};

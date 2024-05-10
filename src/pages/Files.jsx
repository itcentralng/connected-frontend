/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

const Files = () => {
  const { user } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/${user.id}/files/`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });
  }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="left">File Name</TableCell>
            <TableCell align="left">Short code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{i + 1}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.short_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Files;

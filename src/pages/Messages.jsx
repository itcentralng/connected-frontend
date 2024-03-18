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

const Messages = () => {
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/${user.name}/messages/`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Shortcode</TableCell>
            <TableCell align="left">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{i + 1}</TableCell>
              <TableCell align="left">{row.areas}</TableCell>
              <TableCell align="left">{row.short_code}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Messages;

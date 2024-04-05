import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@tremor/react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
interface Maatmens {
  nummer: number,
  status: string,
  leeftijd: number,
  ftsalaris: number,
  op: number,
  vermogeninvarenfpr: number,
  vermogeninvarenspr: number,
  vervangingsratioaanvang: number
}
export default function UsersTable({ maatmensen }: { maatmensen: Maatmens[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Leeftijd</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>op</TableHeaderCell>
          <TableHeaderCell>Salaris</TableHeaderCell>
          <TableHeaderCell>Invaarvermogen</TableHeaderCell>
          <TableHeaderCell>VVR aanvang</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {maatmensen.map((user) => (
          <TableRow key={user.nummer}>
            <TableCell>{user.leeftijd}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>€{user.ftsalaris}</TableCell>
            <TableCell>€{user.op}</TableCell>
            <TableCell>€{user.vermogeninvarenspr}</TableCell>
            <TableCell>{user.vervangingsratioaanvang}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

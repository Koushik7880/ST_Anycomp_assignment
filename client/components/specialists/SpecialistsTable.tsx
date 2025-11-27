// components/specialists/SpecialistsTable.tsx
"use client";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";
import { useSpecialistsStore } from "@/store/specialistsStore";
import type { Specialist } from "@/types/specialists";

interface SpecialistsTableProps {
  onDelete: (id: string) => void;
}

export default function SpecialistsTable({ onDelete }: SpecialistsTableProps) {
  const router = useRouter();
  const { specialists } = useSpecialistsStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<string | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleEdit = (id: string) => {
    router.push(`/specialists/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    handleMenuClose();
    onDelete(id);
  };

  if (!specialists.length) {
    return (
      <Paper elevation={0}>
        <Box className="py-8 text-center text-sm text-gray-500">
          No specialists found.
        </Box>
      </Paper>
    );
  }

  const renderApprovalChip = (s: Specialist) => {
    // We didn't model full approval flow; just mock based on is_verified
    if (s.is_verified) {
      return <Chip label="Approved" color="success" size="small" />;
    }
    return <Chip label="Under Review" color="warning" size="small" />;
  };

  const renderPublishChip = (s: Specialist) => {
    if (s.is_draft) {
      return <Chip label="Draft" size="small" color="default" />;
    }
    return <Chip label="Published" size="small" color="success" />;
  };

  return (
    <Paper elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Purchases</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Approval Status</TableCell>
            <TableCell>Publish Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialists.map((s) => (
            <TableRow key={s.id} hover>
              <TableCell>{s.title}</TableCell>
              <TableCell>RM {Number(s.final_price ?? 0).toFixed(2)}</TableCell>
              <TableCell>{s.total_number_of_ratings ?? 0}</TableCell>
              <TableCell>{s.duration_days} Days</TableCell>
              <TableCell>{renderApprovalChip(s)}</TableCell>
              <TableCell>{renderPublishChip(s)}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEdit(s.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={(e) => handleMenuClick(e, s.id)}
                  size="small"
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => menuRowId && handleEdit(menuRowId)}
          dense
        >
          <EditIcon fontSize="small" className="mr-2" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => menuRowId && handleDeleteClick(menuRowId)}
          dense
        >
          <DeleteIcon fontSize="small" className="mr-2" />
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
}

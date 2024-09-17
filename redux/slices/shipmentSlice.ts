import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shipment {
  id?: number;
  name?: string;
  status?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  owner?: string;
  docstatus?: number;
  idx?: number;
  color?: string;
  _user_tags?: string | null;
  _comments?: string | null;
  _assign?: string | null;
  _liked_by?: string | null;
}

interface ShipmentState {
  shipments: Shipment[];
}

const initialState: ShipmentState = {
  shipments: [
    {
      id: 1,
      name: "New ShipmentTT",
      creation: "2023-02-21 11:53:33.952548",
      modified: "2024-03-21 11:43:05.485522",
      modified_by: "Administrator",
      owner: "ahmed.fathy@brandimic.com",
      docstatus: 0,
      idx: 1,
      status: "New ShipmentTT",
      color: "#761ACB",
      _user_tags: null,
      _comments: null,
      _assign: null,
      _liked_by: null,
    },
    {
      id: 2,
      name: "PUP",
      creation: "2024-02-05 12:50:28.231753",
      modified: "2024-02-05 12:50:28.231753",
      modified_by: "Administrator",
      owner: "Administrator",
      docstatus: 0,
      idx: 0,
      status: "PUP",
      color: "#CB2929",
      _user_tags: null,
      _comments: null,
      _assign: null,
      _liked_by: null,
    },
    {
      id: 3,
      name: "test status",
      creation: "2024-01-22 10:03:29.564104",
      modified: "2024-01-22 10:03:29.564104",
      modified_by: "Administrator",
      owner: "Administrator",
      docstatus: 0,
      idx: 0,
      status: "test status",
      color: "#CB2929",
      _user_tags: null,
      _comments: null,
      _assign: null,
      _liked_by: null,
    },
  ],
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<Shipment[]>) => {
      state.shipments = action.payload;
    },
    updateShipmentStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const { id, status } = action.payload;
      const shipment = state.shipments.find((s) => s.id === id);
      if (shipment) {
        shipment.status = status;
      }
    },
  },
});

export const { setShipments, updateShipmentStatus } = shipmentSlice.actions;
export default shipmentSlice.reducer;

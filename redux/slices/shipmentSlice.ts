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
  selected?: boolean;
}

interface ShipmentState {
  shipments: Shipment[];
  fiterModalOpen: boolean;
  addScanModalOpen: boolean;
}

const initialState: ShipmentState = {
  shipments: [],
  addScanModalOpen: false,
  fiterModalOpen: false,
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
    toggleFilterModal: (state) => {
      state.fiterModalOpen = !state.fiterModalOpen;
    },
    toggleAddScanModal: (state) => {
      state.addScanModalOpen = !state.addScanModalOpen;
    },
    toggleSelectShipment: (state, action) => {
      const shipment = state.shipments.find((s) => s.id === action.payload);
      if (shipment) {
        shipment.selected = !shipment.selected;
      }
    },
    markAllShipmentAsSelected: (state) => {
      // toggle all shipment as selected or unselected
      const count = state.shipments.filter((s) => s.selected);
      state.shipments.forEach((shipment) => {
        if (count.length > 0) {
          shipment.selected = false;
        } else {
          shipment.selected = true;
        }
      });
    },
  },
});

export const {
  setShipments,
  updateShipmentStatus,
  toggleFilterModal,
  toggleAddScanModal,
  toggleSelectShipment,
  markAllShipmentAsSelected,
} = shipmentSlice.actions;
export default shipmentSlice.reducer;

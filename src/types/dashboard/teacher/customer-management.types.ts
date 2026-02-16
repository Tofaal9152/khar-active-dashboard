export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export type CustomerListTableTypes = {
  customerId: string;
  name: string;
  address: string;
  customerType: "Residential" | "Corporate" | "Rental";
  area: string;
  contact01: string;
  lastServiceDate: string;     // e.g. "15-Sep-25"
  lastServiceItems: string;    // comma-separated summary
  nextServiceDate: string;     // e.g. "15-Oct-25"
  nextServiceItems: string;    // comma-separated summary
};

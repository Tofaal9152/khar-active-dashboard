import { useFetchQuery } from "@/hooks/useFetchQuery";

export const OPTIONS_QUERY_KEY = "supplier-options";

export type OptionType =
  | "hotel"
  | "location"
  | "currency"
  | "suite_room_type"
  | "suite_bed_type";

// response shapes you showed
type CurrencyItem = {
  id: string;
  currency_name: string;
  currency_rate_us_dollar?: number;
};
type HotelItem = { id: string; hotel_name: string };
type LocationItem = { id: string; place_name: string };

export type SupplierOptionItem = CurrencyItem | HotelItem | LocationItem | any;

export const getSupplierOptions = (option: OptionType) => {
  return useFetchQuery<SupplierOptionItem[]>(
    [OPTIONS_QUERY_KEY, option],
    `/suppliers/options/?option=${option}`,
    {}
  );
};

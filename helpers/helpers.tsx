export interface AppState {
  loading: Boolean;
  error: string;
  data: any;
}
export interface AppActions {
  type: string;
  payload?: any;
  error?: string;
}

export const value: AppState = { loading: true, error: "", data: [] };

export function disCountPrice(price: number, discount: number) {
  let dis = 0;
  let totalprice = 0;
  dis = (price * discount) / 100;
  totalprice = price - dis;
  return numberWithCommas(totalprice);
}

export function numberWithCommas(x: number) {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case "SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error ? action.error : "error",
        data: [],
      };
    default:
      return state;
  }
}

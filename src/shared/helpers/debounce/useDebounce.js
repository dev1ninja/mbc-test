import debounce from "debounce-promise";

export const useDebounce = (callback, delay = 500) => debounce(callback, delay);

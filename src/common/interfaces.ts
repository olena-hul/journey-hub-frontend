export interface APIResponse<T = any> {
  data: T;
  error: string | null;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface AttractionData {
  name: string;
  time: string;
  price: Price;
  type: string;
  image_url: string;
}

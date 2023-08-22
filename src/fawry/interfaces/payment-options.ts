export interface IFawrySignatureEncryptionParameters {
  merchantCode?: string;
  itemCode?: string;
  quantity?: string;
  price?: number;
  merchantRefNumber?: any;
  secureHashKey?: string;
  userId?: string;
  transactionId?: number;
  fawryRefNumber?: string;
  orderStatus?: string;
  membershipId?: string;
}

export interface FawryHeaders {
  'Content-Type': string;
  Accept: string;
}

export interface User {
  id: string;
  phone: string;
  email: string;
  name: string;
}

export interface CreatePaymentLinkDTO {
  price: string;
  merchantRefNumber: any;
  user: User;
}

export class CreateDummyPaymentLinkDTO {
  price: string;
  merchantRefNumber: any;
}

export interface FawryBody {
  auth_token: string;
  amount_cents: string;
  expiration: string;
  delivery_needed: string;
  order_id: string;
  billing_data: FawryBillingData;
  currency: string;
  integration_id: string;
}

export interface FawryBillingData {
  apartment: string;
  email: string;
  floor: string;
  first_name: string;
  street: string;
  building: string;
  phone_number: string;
  shipping_method: string;
  postal_code: string;
  city: string;
  country: string;
  last_name: string;
  state: string;
}

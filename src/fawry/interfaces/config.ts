/**
 * Initial configuration settings. Needed for the Rave Payload.
 */
export interface Config {
  merchantCode: string;
  fawryV2CheckoutPreview: string;
  productId: string;
  secureHashKey: string;
  hostURL: string;
}

export type Currency = 'EGP' | 'USD';

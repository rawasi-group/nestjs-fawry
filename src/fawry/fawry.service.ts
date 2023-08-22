import { Injectable } from '@nestjs/common';
import { Config } from './interfaces/config';
import {
  CreateDummyPaymentLinkDTO,
  CreatePaymentLinkDTO,
  IFawrySignatureEncryptionParameters,
} from './interfaces/payment-options';
import { sha256 } from 'js-sha256';
import FawryAxios from './axios/fawry-axios';
import { fawryEndPoints } from './axios';

@Injectable()
export class FawryService {
  constructor(private readonly config: Config) {}

  public async getPaymentLink(createPaymentLinkDTO: CreatePaymentLinkDTO) {
    const signatureParams: IFawrySignatureEncryptionParameters = {
      merchantCode: this.config.merchantCode,
      itemCode: '11',
      quantity: '1',
      price: +createPaymentLinkDTO.price,
      merchantRefNumber: createPaymentLinkDTO.merchantRefNumber,
      secureHashKey: this.config.secureHashKey,
      userId: '11',
      transactionId: 11,
      membershipId: '11',
    };
    const signature = this.prepareFawryV2SignatureSHA256(signatureParams);

    const initPaymentParams = {
      merchantCode: signatureParams.merchantCode,
      merchantRefNum: signatureParams.merchantRefNumber,
      customerMobile: createPaymentLinkDTO.user.phone,
      customerEmail: createPaymentLinkDTO.user.email,
      customerName: createPaymentLinkDTO.user.name,
      customerProfileId: '11',
      chargeItems: [
        {
          itemId: signatureParams.itemCode,
          description: 'Goal Name',
          price: signatureParams.price,
          quantity: signatureParams.quantity,
        },
      ],
      returnUrl: this.config.fawryV2CheckoutPreview,
      authCaptureModePayment: false,
      signature: signature,
    };
    console.info(JSON.stringify(initPaymentParams));
    const { data } = await FawryAxios.post(
      fawryEndPoints.init_payment,
      JSON.stringify(initPaymentParams),
    );
    return data;
  }
  public async getDummyPaymentLink(
    createPaymentLinkDTO: CreateDummyPaymentLinkDTO,
  ) {
    const signatureParams: IFawrySignatureEncryptionParameters = {
      merchantCode: this.config.merchantCode,
      itemCode: '11',
      quantity: '1',
      price: +createPaymentLinkDTO.price,
      merchantRefNumber: createPaymentLinkDTO.merchantRefNumber,
      secureHashKey: this.config.secureHashKey,
      userId: '11',
      transactionId: 11,
      membershipId: '11',
    };
    const signature = this.prepareFawryV2SignatureSHA256(signatureParams);

    const initPaymentParams = {
      merchantCode: signatureParams.merchantCode,
      merchantRefNum: signatureParams.merchantRefNumber,
      customerMobile: '01017213866',
      customerEmail: 'email@domain.com',
      customerName: 'Customer Name',
      customerProfileId: signatureParams.userId,
      chargeItems: [
        {
          itemId: signatureParams.itemCode,
          description: 'Product Description',
          price: signatureParams.price,
          quantity: signatureParams.quantity,
        },
      ],
      returnUrl: this.config.fawryV2CheckoutPreview,
      authCaptureModePayment: false,
      signature: signature,
    };
    console.info(JSON.stringify(initPaymentParams));
    const { data } = await FawryAxios.post(
      fawryEndPoints.init_payment,
      JSON.stringify(initPaymentParams),
    );
    return data;
  }

  public prepareFawryV2SignatureSHA256(
    signatureParameters: IFawrySignatureEncryptionParameters,
  ): string {
    // Fawry V2 signature
    console.info('secureHashKey');
    console.info(
      signatureParameters.merchantCode +
        '    ' +
        signatureParameters.merchantRefNumber +
        '    ' +
        signatureParameters.membershipId +
        '    ' +
        this.config.fawryV2CheckoutPreview +
        '    ' +
        this.config.productId +
        '    ' +
        signatureParameters.quantity +
        '    ' +
        signatureParameters.price.toFixed(2) +
        '    ' +
        signatureParameters.secureHashKey,
    );
    return sha256(
      signatureParameters.merchantCode +
        signatureParameters.merchantRefNumber +
        signatureParameters.membershipId +
        this.config.fawryV2CheckoutPreview +
        this.config.productId +
        signatureParameters.quantity +
        signatureParameters.price.toFixed(2) +
        signatureParameters.secureHashKey,
    );
  }
}

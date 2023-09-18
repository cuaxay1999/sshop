import api from '../../../utils/service/api';
import { auth } from '../../../utils/constants/firebase';
import { getFirebaseError } from '../../../utils/helpers';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

export function actionGenerateOTP(data = {}) {
    return api({ method: "post", url: `/auth/v2/otp/generate-v2`, data });
}

export function actionReGenerateOTP(data = {}) {
    return api({ method: "post", url: `/auth/v2/otp/regenerate`, data });
}

export function actionVerifyOTP(data = {}) {
    return api({ method: "post", url: `/auth/v2/otp/verify`, data });
}

export function actionRegisterAccount(data = {}) {
    return api({ method: "post", url: `/auth/v2/user/register`, data });
}

export function actionLogin(data = {}) {
    return api({ method: "post", url: `/auth/v2/user/login`, data });
}

export function actionResetPassword(data = {}) {
    return api({ method: "post", url: `/auth/v2/user/forget-password`, data });
}

export function actionGetChainsByCustomerId() {
    return api({
        method: 'get',
        url: `/chain-shop-employment-manage/get-list-chain-by-customer-id`,
    });
}

export function getShopsByChainId(chainId) {
    return api({
        method: "get",
        url: `chain-shop-employment-manage/get-shop-by-chainId-and-customerId`,
        params: { chainId },
    });
}

export async function actionRegisterByFirebase(data) {
    return api({ method: "post", url: `/auth/v2/user/register_firebase`, data });
}

export async function actionResetPasswordByFirebase(data) {
    return api({ method: "post", url: `/auth/v2/user/forget-password-firebase`, data });
}

export async function actionSigninByFirebase(phoneNumber) {
    if (!phoneNumber) return;
    // verify by firebase
    if (window && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);
    }
    let appVerifier = window.recaptchaVerifier;
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((response) => {
      window.confirmationResult = response
      window.confirmationError = null
    }).catch((e) => {
      window.confirmationResult = null
      window.confirmationError = getFirebaseError(e)
    });
}

export async function actionVerifyOTPByFirebase(code) {
    const confirmationResult = window.confirmationResult;
    if (confirmationResult) {
        return await confirmationResult.confirm(code).then((response) => {
            return response;
        }).catch((e) => {
            return null;
        })
    }
    return null
}
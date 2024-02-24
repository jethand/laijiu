import { IResponseCode } from "./constant";


export const successRes = (data?: any, total?: number) => {
  const response = {
    code: IResponseCode.SUCCESS,
    data,
    message: "success",
  }
  if (total) {
    Object.assign(response, {total})
  }
  return response;
};

export const paramRes = (message: string) => {
  return {
    code: IResponseCode.PARAM_ERROR,
    data: null,
    message,
  }
};

export const errorRes = (message: string) => {
  return {
    code: IResponseCode.RESPONSE_ERROR,
    data: null,
    message,
  }
};

export const notLoginRes = (message: string) => {
  return {
    code: IResponseCode.NOT_LOGIN,
    data: null,
    message,
  }
}
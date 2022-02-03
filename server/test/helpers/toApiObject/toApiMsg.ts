import { validateToString } from '../../../src/utils/validators';

export interface ApiMsg {
  msg: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiMsg = (data: any): ApiMsg => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiMsgFromAny(data);
};

type MsgFields = { msg: unknown };
const toApiMsgFromAny = ({ msg }: MsgFields): ApiMsg => {
  return {
    msg: validateToString(msg)
  };
};

import Token from '../tokens';

export const statusToKeyMap: Record<number, keyof typeof Token.IconTemplate> = {
  19: 'AcceptedPayment',  
  26: 'ContractAllSaved',   
  29: 'ContractReviewed',  
  30: 'RejectedPayment', 
  66: 'Sent',
  67: 'TruckDocReceived',
  68: 'ContractReviewed',
  69: 'RejectedPayment',
  70: 'ContractAllSaved',
  81: 'IncomeMovement',
  86: 'ContractNotSaved',
  89: 'Expenditure',
  90: 'Income',
  91: 'RejectedPayment',
  92: 'NotPendingPayment',
};

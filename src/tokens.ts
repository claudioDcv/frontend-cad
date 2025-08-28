import { icons } from './components/molecules/icon/icons';
import theme from './conf/theme';

const GoldLight = 'hsl(45.1deg 100% 70%)';
const GoldDark = 'hsl(44.71deg 41.46% 24.12%)';
const SilverLight = 'rgb(201 201 201)';
const SilverDark = 'rgb(87 87 87)';
const ExclusiveBrandLight = 'hsl(29.63deg 57.78% 48.31%)';
const ExclusiveBrandDark = '#371c03';
const CollectedLight = '#52bdeb';
const CollectedDark = '#0a4067';

const PrimaryMain = 'hsl(45.1deg 30% 50%)';
const PrimaryLight = 'hsl(45.1deg 100% 90%)';
// versión Dark se resta 10% de L y H
const PrimaryDark = 'hsl(45.1deg 30% 45%)';

const SecondaryMain = 'hsl(0deg 0% 78.82%)';
// versión Dark se suma 10% de L y H
const SecondaryLight = 'hsl(0deg 0% 88.82%)';
// versión Dark se resta 10% de L y H
const SecondaryDark = 'hsl(0deg 0% 68.82%)';

const Success = '#2e7d32';
const Warning = '#fbc02d';
const Error = '#d32f2f';
const Info = '#1976d2';
const Neutral = 'hsl(0deg 0% 50%)';

const Dark = 'hsl(0deg 0% 0%)';
const Light = 'hsl(0deg 0% 100%)';

const GoldAbbr = 'AU';
const SilverAbbr = 'AG';
const CollectedAbbr = 'VI';
const ExclusiveBrandAbbr = 'RE';

// Estilo por modificaciones
export const smallStyle = {
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
};

interface IIconTemplate {
  [key: string]: {
    name: keyof typeof icons;
    description: string;
    color: string;
  };
}

const IconTemplate: IIconTemplate = {
  Deleted: {
    name: 'delete',
    description: 'Eliminado',
    color: Error,
  },
  Income: {
    name: 'income',
    description: 'Ingreso',
    color: PrimaryMain,
  },
  Expenditure: {
    name: 'expenditure',
    description: 'Egreso',
    color: Error,
  },
  Movement: {
    name: 'movement',
    description: 'Movimiento',
    color: PrimaryMain,
  },
  IncomeMovement: {
    name: 'incomeMovement',
    description: 'Movimiento de ingreso',
    color: Success,
  },
  expenditureMovement: {
    name: 'incomeMovement',
    description: 'Movimiento de egreso',
    color: Error,
  },
  Sent: {
    name: 'sent',
    description: 'Enviado',
    color: PrimaryMain,
  },
  NotSent: {
    name: 'sent',
    description: 'Aun no enviado',
    color: Neutral,
  },
  NoTruckDoc: {
    name: 'truckDoc',
    description: 'Sin documento de camión',
    color: Neutral,
  },
  TruckDocSent: {
    name: 'truckDoc',
    description: 'Documento de camión enviado',
    color: PrimaryMain,
  },
  TruckDocReceived: {
    name: 'truckDoc',
    description: 'Documento de camión recibido',
    color: Success,
  },
  TruckDocNotReceived: {
    name: 'truckDoc',
    description: 'Documento de camión no recibido',
    color: Error,
  },
  SecurityBag: {
    name: 'securityBag',
    description: 'Bolsa de seguridad',
    color: PrimaryMain,
  },
  ContractPending: {
    name: 'contract',
    description: 'Contrato pendiente',
    color: Neutral,
  },
  ContractReviewed: {
    name: 'contract',
    description: 'Contrato revisado',
    color: Success,
  },
  ContractNotSaved: {
    name: 'save',
    description: 'Aún no se ha guardado nada',
    color: Neutral,
  },
  ContractSomeSaved: {
    name: 'save',
    description: 'Algunos contratos ya tiene información guardada',
    color: Warning,
  },
  ContractAllSaved: {
    name: 'save',
    description: 'Todos los contratos ya guardados',
    color: PrimaryMain,
  },
  Visualize: {
    name: 'visualize',
    description: 'Visualizar',
    color: PrimaryMain,
  },
  Download: {
    name: 'download',
    description: 'Descargar',
    color: PrimaryMain,
  },
  Edit: {
    name: 'edit',
    description: 'Editar',
    color: PrimaryMain,
  },
  Next: {
    name: 'next',
    description: 'Siguiente',
    color: PrimaryMain,
  },
  Update: {
    name: 'update',
    description: 'Actualizar',
    color: PrimaryMain,
  },
  ContractWithoutNotes: {
    name: 'note',
    description: 'Contrato sin nota',
    color: Neutral,
  },
  ContractWithNotes: {
    name: 'note',
    description: 'Contrato con nota',
    color: Info,
  },
  NormalAperture: {
    name: 'box',
    description: 'Apertura normal',
    color: Neutral,
  },
  MassAperture: {
    name: 'box',
    description: 'Apertura masiva',
    color: PrimaryMain,
  },
  AcceptedPayment: {
    name: 'payment',
    description: 'Cuentas por cobrar aceptadas',
    color: Success,
  },
  RejectedPayment: {
    name: 'payment',
    description: 'Posee cuentas por cobrar rechazadas',
    color: Error,
  },
  PendingPayment: {
    name: 'payment',
    description: 'Posee cuentas por cobrar pendientes',
    color: Warning,
  },
  NotPendingPayment: {
    name: 'payment',
    description: 'Sin cuentas por cobrar',
    color: Neutral,
  },
  NotAccountReceivable: {
    name: 'info',
    description: 'Sin cuentas por cobrar',
    color: Neutral,
  },
  PendingAccountReceivable: {
    name: 'info',
    description: 'Cuentas por cobrar pendientes',
    color: Warning,
  },
  RejectedAccountReceivable: {
    name: 'info',
    description: 'Cuentas por cobrar rechazadas',
    color: Error,
  },
  AcceptedAccountReceivable: {
    name: 'info',
    description: 'Cuentas por cobrar aceptadas',
    color: Success,
  },
};

const Token = {
  Color: {
    GoldLight,
    GoldDark,
    SilverLight,
    SilverDark,
    PrimaryMain,
    PrimaryLight,
    PrimaryDark,
    SecondaryMain,
    SecondaryLight,
    SecondaryDark,
    ExclusiveBrandLight,
    ExclusiveBrandDark,
    CollectedLight,
    CollectedDark,
    Dark,
    Light,
    Success,
    Warning,
    Error,
    Info,
    Neutral,
  },
  Abbr: {
    Gold: GoldAbbr,
    Silver: SilverAbbr,
    Collected: CollectedAbbr,
    ExclusiveBrand: ExclusiveBrandAbbr,
  },
  IconTemplate,
};

export default Token;

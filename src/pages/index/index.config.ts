import { toDay } from "../../utils";
import { FormModel } from "./types";

const emptyOption = { value: '', label: '' };

export const columnsResolutions = [
  { id: 'resolutionNumber', label: 'N° Resolución' },
  { id: 'resolutionBarcode', label: 'Código de Barras' },
  { id: 'dispatchGuideNumber', label: 'Guía Despacho' },
  { id: 'investmentName', label: 'Inversión' },
  { id: 'branchName', label: 'Sucursal' },
  { id: 'closureDate', label: 'Fecha de Cierre' },
  { id: 'contractQuantity', label: 'Cantidad Contratada' },
  { id: 'jewelTotalCount', label: 'Joyas Totales' },
  { id: 'categoryName', label: 'Categoría' },
  { id: 'stateName', label: 'Estado' },
];

export const columnsPackinglist = [
  { id: 'resolutionNumber', label: 'Paquete' },
  { id: 'resolutionBarcode', label: 'Código de Barras' },
  { id: 'dispatchGuideNumber', label: 'Guía Despacho' },
];

export const defaultFormValues: FormModel = {
  materialType: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  dateRange: [toDay, toDay],
};
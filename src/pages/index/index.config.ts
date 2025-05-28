import { emptyOption, toDay } from "../../utils";
import { FormModel } from "./types";

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
  { id: 'packinglistId', label: 'Paquete' },
  { id: 'barcode', label: 'Código de Barras' },
  { id: 'dispatchNumber', label: 'Guía de Despacho' },
  { id: 'investmentName', label: 'Nombre Inversión' },
  { id: 'originBranch', label: 'Sucursal Origen' },
  { id: 'destinyBranch', label: 'Sucursal Destino' },
  { id: 'creationDate', label: 'Fecha de Creación' },
  { id: 'totalQuantity', label: 'Cantidad Total' },
  { id: 'totalGrams', label: 'Gramos Totales' },
  { id: 'documentType', label: 'Tipo Documento' },
  { id: 'statusId', label: 'ID Estado' },
  { id: 'statusName', label: 'Estado' },
  { id: 'category', label: 'Categoría' },
];


export const defaultFormValues: FormModel = {
  materialType: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  dateRange: [toDay, toDay],
};
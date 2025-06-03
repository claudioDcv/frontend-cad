import { Box, Button, Pagination } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { ResolutionFormModel, ResolutionModel } from "../../types";
import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllResolutions,
  useGetAllStatus,
} from "../../../../clients";
import { Dropdown, MonthRangePicker, ButtonClear, Table } from "../../../../components";
import { ResolutionParams } from "../../utils";
import { STATUS_RESOLUTION } from "../../../../utils";
import { defaultResolutionsFormValues } from "../../index.config";
import IconList from "../../../../components/molecules/icon";

const Resolutions = () => {
  const { control, reset, watch } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const { t } = useTranslation();
  const [range, setRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const { investment, location, materialType, status } = watch();

  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  const handleInvestmentChange =
    (onChange: (value: { value: string; label: string }) => void) =>
    (value: { value: string; label: string }) => {
      onChange(value);

      reset((prev) => ({
        ...prev,
        location: { value: '', label: '' },
      }));

      if (value.value) {
        getAllLocations.call({ investmentId: value.value, status: true });
      } else {
        getAllLocations.clearData();
      }
    };

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([new Date(), new Date()]);
    getAllLocations.clearData();
    getAllInvestments.clearData();
  };

  useEffect(() => {
    getAllMaterialType.call();
    getAllInvestments.call();
    getAllStatus.call({ tableId: STATUS_RESOLUTION });
  }, []);

  useEffect(() => {
    const params = ResolutionParams(1, {
      investment,
      location,
      materialType,
      status,
      range,
    });
    getAllResolutions.call(params);
  }, [investment, location, materialType, status, range]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const params = ResolutionParams(value, {
      investment,
      location,
      materialType,
      status,
      range,
    });
    getAllResolutions.call(params);
  };

  return (
    <Box>
      <form>
        <Box
          mb={2}
          mt={2}
          flexWrap="nowrap"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Controller
            name="materialType"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllMaterialType.data}
                label={t('common.materialType')}
                disabled={getAllMaterialType.data.length === 0}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllStatus.data}
                label={t('common.status')}
                disabled={getAllStatus.data.length === 0}
              />
            )}
          />

          <Controller
            name="investment"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllInvestments.data}
                label={t('common.investment')}
                onChange={handleInvestmentChange(field.onChange)}
                disabled={getAllInvestments.data.length === 0}
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllLocations.data}
                label={t('common.location')}
                disabled={getAllLocations.data.length === 0}
              />
            )}
          />

          <MonthRangePicker value={range} onChange={setRange} />

          <ButtonClear onClick={handleClear} label={t('common.clearFilters')} />
        </Box>
      </form>

      <Table
        columns={columnsResolutions}
        rows={getAllResolutions.data?.resolutions || []}
        messageVoidData={t('common.noData')}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={getAllResolutions.data?.meta?.count || 0}
          page={getAllResolutions.data?.meta?.page || 1}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default Resolutions;

const columnsResolutions = [
  { id: 'resolutionNumber', label: 'N° Resolución' },
  { id: 'barcode', label: 'Código de Barras' },
  { id: 'dispatchGuide', label: 'Guía Despacho' },
  { id: 'investmentName', label: 'Inversión' },
  { id: 'locationName', label: 'Sucursal' },
  { id: 'closeDate', label: 'Fecha de Cierre' },
  { id: 'contractCount', label: 'Cantidad Contratada' },
  { id: 'totalJewels', label: 'Joyas Totales' },
  { id: 'categoryName', label: 'Categoría' },
  { id: 'stateName', label: 'Estado' },
  {
    id: 'actions',
    label: 'Acciones',
    render: (row: ResolutionModel) => (
      <Button onClick={() => console.log('Resolution ID:', row.resolutionId)}>
        Ver Contratos
        <IconList name="visualize" />
      </Button>
    ),
  },
];

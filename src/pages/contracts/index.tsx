import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetAllContracts } from '../../clients';
import { useForm } from 'react-hook-form';
import { useRoute } from 'wouter';
import routes from '../../conf/routes';
import { Breadcrumb, Table } from '../../components';
import { ContractFormModel } from '../index/types';
import { contractParams, defaultContractsFormValues } from '../index/utils';

const Contracts = () => {
const [, params] = useRoute('/contracts/:id');
const contractIdFromRoute = params?.id || '';

const { watch } = useForm<ContractFormModel>({
  defaultValues: {
    ...defaultContractsFormValues,
    contractId: { label: contractIdFromRoute, value: contractIdFromRoute },
  },
});

  const { t } = useTranslation();
  const { resolutionId, clientRut, responsible, expirationBefore, contractId } = watch();

  const [filters, setFilters] = useState({
    resolutionId,
    clientRut,
    responsible,
    expirationBefore,
    contractId,
  });

  const previousFiltersRef = useRef(filters);

  const getAllContracts = useGetAllContracts();
  
  useEffect(() => {
    const fetchContracts = async () => {
      try {
          //Borrar despues, es para test
        const params = { resolutionId: '9907' }; 
        await getAllContracts.call(params);
        console.log('Datos contratos:', getAllContracts.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };
  
    fetchContracts();
  }, []);

  /*
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newFilters = {
        resolutionId,
        clientRut,
        responsible,
        expirationBefore,
        contractId,
      };

      const hasChanged =
        JSON.stringify(previousFiltersRef.current) !==
        JSON.stringify(newFilters);

      if (hasChanged) {
        previousFiltersRef.current = newFilters;
        setFilters(newFilters);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [clientRut, contractId, expirationBefore, resolutionId, responsible]);

  const fetchContracts = useCallback(async () => {
    const params = contractParams(filters);
  
    try {
      await getAllContracts.call(params); 
    } catch (error) {
      console.error('Error al obtener contratos:', error);
    }
  }, [filters, getAllContracts]);
/*
  useEffect(() => {
    fetchContracts();
  }, []);
  */
  return (
    <Box>
      <Breadcrumb items={[routes.index, routes.contracts]} />
      <h1>Contracts Page</h1>
      <p>This is the contracts page.</p>

      <Table
        columns={[
          { id: 'contractId', label: t('contracts.contractId') },
          { id: 'contractNumber', label: t('contracts.contractNumber') },
          { id: 'securityBagCode', label: t('contracts.securityBagCode') },
          { id: 'jewelQuantity', label: t('contracts.jewelQuantity') },
          {
            id: 'totalContractValue',
            label: t('contracts.totalContractValue'),
          },
          {
            id: 'averagePurchaseValue',
            label: t('contracts.averagePurchaseValue'),
          },
          { id: 'totalWeight', label: t('contracts.totalWeight') },
          { id: 'startDate', label: t('contracts.startDate') },
          { id: 'endDate', label: t('contracts.endDate') },
          { id: 'responsibleName', label: t('contracts.responsibleName') },
          { id: 'clientName', label: t('contracts.clientName') },
          { id: 'clientRut', label: t('contracts.clientRut') },
        ]}
        rows={getAllContracts.data?.contracts || []}
        messageVoidData={t('common.noData')}
      />
    </Box>
  );
};

export default Contracts;

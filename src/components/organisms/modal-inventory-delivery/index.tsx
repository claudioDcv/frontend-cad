import { useState } from 'react';
import { Box, Dialog, DialogContent } from '@mui/material';
import { initialStateI18N, InventoryDeliveryProps, Item } from './index.type';
import ModalActions from '../../molecules/modal-actions';
import ModalHeader from '../../molecules/modal-header';
import Dropdown from '../../molecules/dropdown';
import Input from '../../molecules/input';

const ModalInventoryDelivery: React.FC<InventoryDeliveryProps> = ({
  open,
  onClose,
  onSuccess,
  inventories,
  destinations,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18N, ...i18n } : initialStateI18N;
  const [selectedOption, setSelectedOption] = useState<Item>({ value: '', label: '' });
  const [selectedDestination, setSelectedDestination] = useState<Item>({ value: '', label: '' });
  const [units, setUnits] = useState(0);
  const [grams, setGrams] = useState(0);
  const [cost, setCost] = useState(0);

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnits(Number(e.target.value));
  };

  const handleGramsChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(Number(value));
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(Number(e.target.value));
  };

  const handleChangeOption = (item: Item) => {
    setSelectedOption(item);
  };

  const handleChangeDestination = (item: Item) => {
    setSelectedDestination(item);
  };

  const handleSuccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess({
      selectedOption,
      selectedDestination,
      units,
      grams,
      cost,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <ModalHeader onClose={onClose}>{lang.label}</ModalHeader>
      <form onSubmit={handleSuccess}>
        <DialogContent>
          <Box mt={1}>
            <Dropdown
              label="Inventario"
              value={selectedOption}
              onChange={handleChangeOption}
              options={inventories}
              required
            />
            <Box display="flex" gap={2} mt={2} mb={2}>
              <Input
                label="Unidades"
                type="number"
                value={units}
                placeholder="0"
                onChange={handleUnitsChange}
              />
              <Input
                label="Gramos"
                type="number"
                value={grams}
                placeholder="0"
                onChange={handleGramsChange}
              />
              <Input
                label="Costo"
                type="number"
                value={cost}
                placeholder="0"
                onChange={handleCostChange}
              />
            </Box>
            {destinations && (
              <Dropdown
                label="Destino"
                value={selectedDestination}
                onChange={handleChangeDestination}
                options={destinations}
              />
            )}
          </Box>
        </DialogContent>
        <ModalActions i18n={lang} onClose={onClose}/>
      </form>
    </Dialog>
  );
};

export default ModalInventoryDelivery;

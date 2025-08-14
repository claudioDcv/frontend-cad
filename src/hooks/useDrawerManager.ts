import { useToggleState } from './useToggleState';

/**
 * Hook especializado para manejar múltiples drawers y modales
 * de manera organizada y reutilizable
 */
export const useDrawerManager = () => {
	const filters = useToggleState();
	const create = useToggleState();
	const createVehicle = useToggleState();
	const editVehicle = useToggleState();
	const editDriver = useToggleState();
	const resumeVehicle = useToggleState();
	const resumeDriver = useToggleState();
	const filtersVehicle = useToggleState();
	const filtersDriver = useToggleState();
	const modalExportable = useToggleState();

	return {
		// Drawers
		filters: {
			isOpen: filters.isOpen,
			toggle: filters.toggle,
			open: filters.open,
			close: filters.close,
		},
		create: {
			isOpen: create.isOpen,
			toggle: create.toggle,
			open: create.open,
			close: create.close,
		},
		createVehicle: {
			isOpen: createVehicle.isOpen,
			toggle: createVehicle.toggle,
			open: createVehicle.open,
			close: createVehicle.close,
			setValue: createVehicle.setValue,
		},
		editVehicle: {
			isOpen: editVehicle.isOpen,
			toggle: editVehicle.toggle,
			open: editVehicle.open,
			close: editVehicle.close,
		},
		editDriver: {
			isOpen: editDriver.isOpen,
			toggle: editDriver.toggle,
			open: editDriver.open,
			close: editDriver.close,
		},
		resumeVehicle: {
			isOpen: resumeVehicle.isOpen,
			toggle: resumeVehicle.toggle,
			open: resumeVehicle.open,
			close: resumeVehicle.close,
		},
		resumeDriver: {
			isOpen: resumeDriver.isOpen,
			toggle: resumeDriver.toggle,
			open: resumeDriver.open,
			close: resumeDriver.close,
		},
		filtersVehicle: {
			isOpen: filtersVehicle.isOpen,
			toggle: filtersVehicle.toggle,
			open: filtersVehicle.open,
			close: filtersVehicle.close,
		},
		filtersDriver: {
			isOpen: filtersDriver.isOpen,
			toggle: filtersDriver.toggle,
			open: filtersDriver.open,
			close: filtersDriver.close,
		},
		// Modales
		modalExportable: {
			isOpen: modalExportable.isOpen,
			toggle: modalExportable.toggle,
			open: modalExportable.open,
			close: modalExportable.close,
		},
	};
};

import { useState, useCallback } from 'react';

/**
 * Hook reutilizable para manejar estados de tipo toggle (true/false)
 * Útil para modales, drawers, y cualquier componente que necesite abrir/cerrar
 */
export const useToggleState = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const setValue = useCallback((value: boolean) => {
		setIsOpen(value);
	}, []);

	return {
		isOpen,
		toggle,
		open,
		close,
		setValue,
	};
};

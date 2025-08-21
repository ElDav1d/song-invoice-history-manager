import { useAppDispatch } from '@/shared/application/hooks';
import { IssuedInvoice } from '@/features/invoice-history/domain/entities/IssuedInvoice';
import { addNewIssuedInvoice } from '@/features/invoice-history/application/store/slice';

export const useIssuedInvoiceActions = () => {
  const dispatch = useAppDispatch();

  const addIssuedInvoice = (invoice: IssuedInvoice) => {
    dispatch(addNewIssuedInvoice(invoice));
  };

  return { addIssuedInvoice };
};

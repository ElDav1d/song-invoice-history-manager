import { useAppDispatch } from '@/shared/application/hooks';
import { issueNewInvoice } from '@/features/songs-table/application/store/slice';

export interface IssueInvoicePayload {
  id: string;
  progressAtIssue: number;
}

export const useSongsActions = () => {
  const dispatch = useAppDispatch();

  const issueInvoice = ({ id, progressAtIssue }: IssueInvoicePayload) => {
    dispatch(issueNewInvoice({ id, progressAtIssue }));
  };

  return {
    issueInvoice,
  };
};

import { useAppDispatch } from '@/shared/application/hooks';
import { addNewSongs, issueNewInvoice } from '@/features/songs-table/application/store/slice';
import { Song } from '@/features/songs-table/domain/entities/Song';

export interface IssueInvoicePayload {
  id: string;
  progressAtIssue: number;
  dateIssued: string;
}

export const useSongsActions = () => {
  const dispatch = useAppDispatch();

  const addSongs = (songs: Song[]) => {
    dispatch(addNewSongs(songs));
  };

  const issueInvoice = ({ id, progressAtIssue, dateIssued }: IssueInvoicePayload) => {
    dispatch(issueNewInvoice({ id, progressAtIssue, dateIssued }));
  };

  return {
    issueInvoice,
    addSongs,
  };
};

import { useAppDispatch } from '@/shared/application/hooks';
import { addNewSongs, issueNewInvoice } from '@/features/songs-table/application/store/slice';
import { Song } from '../../domain/entities/Song';

export interface IssueInvoicePayload {
  id: string;
  progressAtIssue: number;
}

export const useSongsActions = () => {
  const dispatch = useAppDispatch();

  const addSongs = (songs: Song[]) => {
    dispatch(addNewSongs(songs));
  };

  const issueInvoice = ({ id, progressAtIssue }: IssueInvoicePayload) => {
    dispatch(issueNewInvoice({ id, progressAtIssue }));
  };

  return {
    issueInvoice,
    addSongs,
  };
};

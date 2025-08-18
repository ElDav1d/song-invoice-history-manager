import { expect } from 'chai';
import { getAllSongs } from '../GetAllSongs';

it('should provide an array of 10 songs', () => {
  const songs = getAllSongs();
  expect(Array.isArray(songs)).to.be.true;
  expect(songs.length).to.equal(10);
});

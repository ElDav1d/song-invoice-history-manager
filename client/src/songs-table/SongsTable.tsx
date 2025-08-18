const SongsTable = () => {
  return (
    <table aria-label="songs">
      <thead>
        <tr>
          <th>ID</th>
          <th>Song name</th>
          <th>Author</th>
          <th>Progress</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{/* Render song rows here */}</tbody>
    </table>
  );
};

export default SongsTable;

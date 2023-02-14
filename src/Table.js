const Table = ({ items }) => {
  return (
    <div className="table_container">
      <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {Object.entries(item).map(([key, value]) => {
                return <td key={key}>{JSON.stringify(value)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

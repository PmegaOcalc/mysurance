export default props => {
  const listItems = props.items.map((item, index) =>
    <div key={index} className="insuranceList-item">
      <div className="insuranceList-item-text" key={item.id}>
        {item.categoryName}
      </div>
      <div
        className="insuranceList-item-remove"
        onClick={_ => props.remove(index)}
      >
        ✖️
      </div>
      <style jsx>{`
        .insuranceList-item {
          display: flex;
          justify-content: space-between;
        }

        .insuranceList-item-remove {
          cursor: pointer;
        }
      `}</style>
    </div>
  );

  return (
    <div className="insuranceList">
      {listItems}
      <style jsx>{`
        .insuranceList {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
};

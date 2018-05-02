export default props => {
  function onAdd(title) {
    props.addItem(title);
  }

  let bgColor;
  let textColor;
  const listItems = props.items.map(item => {

    return (
      <div
        key={item.pageid}
        className="insuranceItemCategory customColor"
        onClick={_ => onAdd(item.title)}
      >
        {item.title}
        <style jsx>{`
          .insuranceItemCategory;
           {
            padding: 1.2em 0.6em;
            margin: 0.5em 0;
            font-size: 1.5em;
            font-weight: lighter;
            font-family: sans-serif;
            text-align: center;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;
            cursor: pointer;
            border: 1px solid #eee;
            color: #333;
          }

          .insuranceItemCategory:hover {
            border: 1px solid #999;
          }
        `}</style>
      </div>
    );
  });

  return (
    <div>
      <div className="insuranceItems">
        {listItems}

        <style jsx>{`
          .insuranceItems {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </div>
    </div>
  );
};

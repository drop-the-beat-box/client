function Content(props) {
  return (
    <div className="content-entity">
      <div>{props.id}</div>
      <div>{props.name}</div>
      <div>{props.date}</div>
    </div>
  );
}

function Body() {
  let dataNum = 20;
  let sampleList = GenerateSampleData(dataNum);
  let rendering = [];
  for (let i = 0; i < sampleList.length; i++) {
    rendering.push(
      <Content
        id={sampleList[i].id}
        name={sampleList[i].name}
        date={sampleList[i].date}
      ></Content>
    );
  }

  return (
    <body className="body">
      <div className="body-top"></div>
      <div className="body-second"></div>

      <div className="body-main">
        <div className="body-container">{rendering}</div>
      </div>
    </body>
  );
}

function GenerateSampleData(dataNum) {
  let sampleData = [];

  for (let index = 0; index < dataNum; index++) {
    sampleData.push({ id: index, name: ("Entity", index), date: "2020-05-15" });
  }

  return sampleData;
}

export default Body;

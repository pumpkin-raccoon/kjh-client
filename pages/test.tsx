const TestPage = () => {
  let a = 1 // eslint 잡히는지 확인 (미사용, 재설정 아니면 const)

  return (
    <div>
      <h1>This is h1</h1>
      <h3>This is h3</h3>
      <h5>This is h5</h5>
      <p>This is p tag</p>
      <button>
        <p>This is button</p>
      </button>
      <a href="/">This is a tag</a>
    </div>
    // <div style={{
    //   width: '200px',
    //   height: '300px',
    //   padding: '10px',
    //   marginLeft: '20px',
    //   marginTop: '20px',
    //   border: '10px solid black',
    // }}>
    //   {/* <div style={{
    //     width: '200px',
    //     height: '100px',
    //     border: '10px solid blue'
    //   }}>
    //     This is child container
    //   </div> */}
    // </div>
  )
}

export default TestPage

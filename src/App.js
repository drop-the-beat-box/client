import logo from './logo.svg';
import {useState} from 'react';
import Layout from './components/Layout';
import './assets/css/body.css';
import './assets/css/header.css';
import './assets/css/sidebar.css';
import './assets/css/footer.css';
import './assets/css/layout.css';

function App() {

  let post = "PostName"; // 자료 잠깐 저장 할 때는 변수 let,var,const
  let [postTitles, setTitles] = useState(['postTitle1', 'postTitle3', 'postTitle2']); 
  let [likes, setLikes] = useState(0);

  let [title, setLogo] = useState('MyBlog'); 
  // 자료 잠깐 저장할 땐 state
  // a : 저장한 자료('남자 코트 추천')
  // b : state 변경 도와주는 함수

/*
Destructuring: Array 안에 요소 변수화
let [a, c] = [1, 2];

state는 html 내에서 바로 재렌더링 된다.
state는 
*/

  function onClickLike(){
    setLikes(likes + 1);
  }

  return (
    // <div className = "App">
    //   <div className = "black-nav">
    //     <h4 style={{color : 'gray', fontSize : '16px'}} >
    //       {title}
    //     </h4>
    //   </div>
    //   <div className = "list">
    //     <h4>{postTitles[0]} <span onClick={onClickLike}>👍</span>{likes}</h4>
    //     <p>0217 published</p>
    //   </div>
    //   <div className = "list">
    //     <h4>{postTitles[1]}</h4>
    //     <p>0217 published</p>
    //   </div>
    //   <div className = "list">
    //     <h4>{postTitles[2]}</h4>
    //     <p>0217 published</p>
    //   </div>

    //   <button onClick={()=>{
    //     let tempTitles = [...postTitles];
    //     tempTitles.sort();
    //     setTitles(tempTitles);
    //   }}>SortButton</button>

    //   <button onClick={()=>{
    //     let tempTitles = [...postTitles]; // 값만 복제
    //     tempTitles[0] = "Hello2";
    //     setTitles(tempTitles);
    //   }}>ChangeButton</button>

    //   <DetailPage/>
      
    // </div>

    <Layout/>
    
  );
}

// 컴포넌트
// 써야할 때 - 1. 반복되는 html | 2. 큰 페이지들 | 3. 자주변경되는 것들
// 단점 - state 가져다쓸 때 문제 7가생김
// 다른 function 밖에 함수 정의 , return 안에는 하나의 <태그> 시작해서 </태그>로 끝나야함 병렬X
function DetailPage(){
  return (
    <div className = "detail">
        <h4>title</h4>
        <p>date</p>
        <p>detail</p>
    </div>
  )
}

export default App;

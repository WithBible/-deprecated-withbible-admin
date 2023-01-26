import React, {useState, useEffect} from 'react';
import axios from "axios";
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'  /*FeaturedInfo 컴포넌트 home 페이지에 추가*/
import './home.css'
import { userData } from'../../dummyData'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'


export default function Home() {
    const [users, setUsers] = useState([]);
    // API가 요청 중인지 아닌지, 2. 로딩상태
    const [loading, setLoading] = useState(false);
    //error, 3. 에러
    const [error, setError] = useState(null);     

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            setUsers(null);
            setError(null);
            setLoading(true); //로딩시작
            const { data } = await axios.get(
              "https://port-0-withbible-server-3pblc2flby7o9b4.gksl2.cloudtype.app/quiz/created-count/months"
            );
            setUsers(data.result); //데이터 받아오고 setUser에 담기
          } catch (e) {
            setError(e); //에러가 발생한 경우
          }
          setLoading(false); //로딩이 끝났다는 것을 확인
        };
        fetchUsers();
      }, []);   

    return (
     <div className="home">
        <FeaturedInfo />   {/*FeaturedInfo 컴포넌트 home 페이지에 추가*/}
        <Chart 
            title="월별 퀴즈 등록 수 조회"
            data={users}
            datakey="totalCount"
            grid
        />
        <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
        </div>
    </div>
    )
}
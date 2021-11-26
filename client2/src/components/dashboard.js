import Loader from './loader';
import InfoCard from './infocard';
import RoundIcon from './RoundIcon';
import clientIcon from '../dashboard/sidenavigation/icons/clients';
import salesIcon from '../dashboard/sidenavigation/icons/sales';
import ordersIcon from '../dashboard/sidenavigation/icons/total_orders';
import pendingIcon from '../dashboard/sidenavigation/icons/pending';
import PageTitle from './PageTitle';
import ChartCard from './ChartCard';
import ChartLegend from './ChartLegend';
// import Charts from './Charts';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
  barOptions,
  barLegends,
} from './ChartsData';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState();
  const history = useHistory();

  const requestOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getAdmin = async () => {
    const response = await fetch(
      'http://localhost:8000/user/me',
      requestOptions,
    );

    if (!response.ok) {
      alert('Not Authorized to view Orders');
    } else {
      const json = await response.json();
      if (!json.is_superuser) {
        history.push('/products');
      }
    }
  };
  const getDashboardData = async () => {
    const response = await fetch(
      'http://localhost:8000/dashboard',
      requestOptions,
    );
    if (!response.ok) {
      alert('Some Error occurred');
    } else {
      const json = await response.json();
      setDashboardData(json);
      setLoaded(true);
    }
  };
  useEffect(() => {
    getDashboardData();
    getAdmin();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="grid gap-6 mb-8 mt-6 md:grid-cols-5">
          <InfoCard title="Total clients" value={dashboardData.clients}>
            <RoundIcon
              icon={clientIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mx-2"
            />
          </InfoCard>

          <InfoCard
            title="Total Sales Revenue"
            value={`₹ ${dashboardData.sales}`}
          >
            <RoundIcon
              icon={salesIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mx-2"
            />
          </InfoCard>

          <InfoCard title="Orders Total" value={dashboardData.orders}>
            <RoundIcon
              icon={ordersIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mx-2"
            />
          </InfoCard>

          <InfoCard title="Completed Orders" value={dashboardData.completed}>
            <RoundIcon
              icon={pendingIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mx-2"
            />
          </InfoCard>

          <InfoCard title="Pending Orders" value={dashboardData.pending}>
            <RoundIcon
              icon={pendingIcon}
              iconColorClass="text-teal-500 dark:text-teal-100"
              bgColorClass="bg-red-100 dark:bg-red-500"
              className="mx-2"
            />
          </InfoCard>
        </div>

        <PageTitle>Charts</PageTitle>

        <div className="grid gap-6 mb-8 content-center items-center md:grid-cols-2">
          {/* <ChartCard title="Revenue">
            <Doughnut {...doughnutOptions} />
            <ChartLegend legends={doughnutLegends} />
          </ChartCard> */}

          <ChartCard title="Consumption">
            <Bar {...barOptions} />
            <ChartLegend legends={barLegends} />
          </ChartCard>

          <ChartCard title="Financials">
            <Line {...lineOptions} />
            <ChartLegend legends={lineLegends} />
          </ChartCard>
        </div>

        {/* <div className="grid gap-6 mb-8 md:grid-cols-1 "></div> */}
      </>
    );
  }
};
export default Dashboard;

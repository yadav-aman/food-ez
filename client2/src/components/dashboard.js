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
  const history = useHistory();

  const getAdmin = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      'http://localhost:8000/user/me',
      requestOptions,
    );

    if (!response.ok) {
      alert('Not Authorized to view Orders');
    } else {
      const json = await response.json();
      setLoaded(true);
      if (!json.is_superuser) {
        history.push('/products');
      }
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="grid gap-6 mb-8 mt-6 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total clients" value="6389">
            <RoundIcon
              icon={clientIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Total Sales Today" value="₹ 10,300">
            <RoundIcon
              icon={salesIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Orders Today" value="376">
            <RoundIcon
              icon={ordersIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Pending Orders" value="35">
            <RoundIcon
              icon={pendingIcon}
              iconColorClass="text-teal-500 dark:text-teal-100"
              bgColorClass="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>

        <PageTitle>Charts</PageTitle>

        <div className="grid gap-6 mb-8 content-center items-center md:grid-cols-2">
          {/* <ChartCard title="Revenue">
            <Doughnut {...doughnutOptions} />
            <ChartLegend legends={doughnutLegends} />
          </ChartCard> */}

          <ChartCard title="Traffic">
            <Bar {...barOptions} />
            <ChartLegend legends={barLegends} />
          </ChartCard>

          <ChartCard title="Traffic">
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

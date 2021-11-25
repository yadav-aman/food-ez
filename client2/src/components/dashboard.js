import Loader from './loader';
import InfoCard from './infocard';
import moneyIcon from '../dashboard/sidenavigation/icons/money.svg';
import RoundIcon from './RoundIcon';
import LogoutIcon from '../dashboard/sidenavigation/icons/logout';
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

const Dashboard = () => {
  {
    /* <Loader />; */
  }
  return (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={LogoutIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Sales Today" value="₹ 10,300">
          <RoundIcon
            icon={LogoutIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Orders Today" value="376">
          <RoundIcon
            icon={LogoutIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Orders" value="35">
          <RoundIcon
            icon={LogoutIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Charts</PageTitle>
      
      <div className="grid gap-6 mb-8 md:grid-cols-1">
      <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
      
      <div className="grid gap-6 mb-8 md:grid-cols-2 ">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        
        <ChartCard title="Traffic">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
};
export default Dashboard;

import { useLocation } from "react-router-dom";
import { Pokidata } from "../APIResponseTypes";
import { Card, CardBody, Typography } from "@material-tailwind/react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Location {
  state: {
    data: {
      pokidata: Pokidata;
      base_happiness: string;
      capture_rate: string;
      shape: string;
      growth_rate: string;
      color: string;
    };
  };
}

interface ChartDataType {
  stat: string;
  A: number;
  maxval: number;
}

const Details = () => {
  const location = useLocation() as Location;
  const pokimage =
    location?.state?.data?.pokidata?.sprites?.other?.home?.front_default;
  const statlist = location?.state?.data?.pokidata?.stats;
  const giflist = location?.state?.data?.pokidata?.sprites?.other?.showdown;
  const chartdata: ChartDataType[] = [];
  statlist.map((statitem) => {
    console.log(statitem);
    chartdata.push({
      stat: statitem.stat.name,
      A: statitem.base_stat,
      maxval: 100,
    });
  });
  console.log(chartdata);

  return (
    <div className="p-0 m-0 w-full h-full flex bg-[url(/pokiball-details.jpg)] bg-cover bg-center">
      <div
        className="flex w-1/2 h-full flex-col"
        style={{
          backgroundImage: `linear-gradient(90deg, ${location?.state?.data?.color}, #00000000)`,
        }}
      >
        <h1 className="font-lobster text-6xl text-center pt-10 text-white">
          {location?.state?.data?.pokidata?.species?.name}
        </h1>
        <div className="flex justify-center">
          <img
            className="h-96 w-96 relative bottom-4"
            alt="pokemon rep"
            src={pokimage}
          ></img>
        </div>
        <div className="gifs flex justify-center mt-4">
          <img
            className="h-32 w-32"
            alt="pokemon gif"
            src={giflist.front_default}
          />
          <div>
            <img
              className="h-32 w-32"
              alt="pokemon gif"
              src={giflist.back_default}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full ">
        <div className="h-1/2 flex-nowrap flex justify-center mt-4">
          <div className="flex flex-col w-1/3">
            <Card className="m-4  bg-transparent shadow-xl shadow-blue-300 transition duration-300 hover:scale-110 animate-bounce-short">
              <CardBody className="text-center text-gray-500">
                <Typography className="text-xl text-bold font-pixelify">
                  Weight
                </Typography>
                <Typography className="text-lg text-bold">
                  {location?.state?.data?.pokidata?.weight}
                </Typography>
              </CardBody>
            </Card>
            <Card className="m-4 bg-transparent shadow-xl shadow-red-300 duration-300 hover:scale-110 transition animate-bounce-short">
              <CardBody className="text-center text-gray-500 ">
                <Typography className="text-xl text-bold font-pixelify">
                  Height
                </Typography>
                <Typography className="text-lg text-bold">
                  {location?.state?.data?.pokidata?.height}
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-col w-1/3">
            <Card className="m-4 bg-transparent shadow-xl shadow-green-300 transition duration-300 hover:scale-110 animate-bounce-short">
              <CardBody className="text-center text-gray-500 ">
                <Typography className="text-xl text-bold font-pixelify">
                  Growth Rate
                </Typography>
                <Typography className="text-lg italic">
                  {location?.state?.data?.growth_rate}
                </Typography>
              </CardBody>
            </Card>

            <Card className="m-4 bg-transparent shadow-xl shadow-amber-300 transition duration-300 hover:scale-110 animate-bounce-short">
              <CardBody className="text-center text-gray-500">
                <Typography className="text-xl text-bold font-pixelify">
                  Capture Rate
                </Typography>
                <Typography className="text-lg text-bold">
                  {location?.state?.data?.capture_rate}
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-col w-1/3">
            <Card className="m-4 bg-transparent shadow-xl shadow-teal-300 transition duration-300 hover:scale-110 animate-bounce-short">
              <CardBody className="text-center text-gray-500 ">
                <Typography className="text-xl text-bold font-pixelify">
                  Base Happiness
                </Typography>
                <Typography className="text-lg text-bold">
                  {location?.state?.data?.base_happiness}
                </Typography>
              </CardBody>
            </Card>

            <Card className="m-4 bg-transparent shadow-xl shadow-indigo-300 transition duration-300 hover:scale-110 animate-bounce-short">
              <CardBody className="text-center text-gray-500">
                <Typography className="text-xl text-bold font-pixelify">
                  Pokemon Shape
                </Typography>
                <Typography className="text-lg italic">
                  {location?.state?.data?.shape}
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex flex-col stats h-1/2 ">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              width={500}
              height={300}
              data={chartdata}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="stat" />
              <PolarRadiusAxis />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="black"
                fill="#8331e0"
                fillOpacity={0.7}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Details;

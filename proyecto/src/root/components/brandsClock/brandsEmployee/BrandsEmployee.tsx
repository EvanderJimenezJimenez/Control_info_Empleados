import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchDepartment } from "../../adminDepartment/SearchDepartment";
import { format, parseISO, getDay } from "date-fns";
import { Brands } from "@/root/interface/brands";

export const BrandsEmployee = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [hoursIni, setHoursIni] = useState("");
  const [hoursFin, setHoursFin] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [brandData, setBrandData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });

  useEffect(() => {
    const fetchCurrentDateTime = async () => {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/ip");
        const { datetime } = response.data;
        const [date, time] = datetime.split("T");
        setCurrentDate(date);
        setCurrentTime(time.slice(0, 8));
      } catch (error) {
        console.error("Error getting date and time:", error);
      }
    };

    fetchCurrentDateTime();
  }, [updateDateTime]);

  const handleClick1 = () => {
    setUpdateDateTime(true);
    const weekday = getDateOfWeekday(currentDate);
    console.log(weekday);
    const hoursEmployee = brandData.hoursEmployee;

    if (hoursEmployee.hasOwnProperty(weekday)) {
      const hours = hoursEmployee[weekday];
      const hIni = hours.hIni;
      const hFin = hours.hFin;
      setHoursFin(hFin);
      setHoursIni(hIni);
    } else {
      console.log(`No information found for the day: ${weekday}`);
    }
  };

  const handleGetBrands = async (idEmployee: string) => {
    try {
      const response = await fetch(`/api/brands/${idEmployee}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBrandData(data);
        console.log(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting brands data", error);
    }
  };

  const getDateOfWeekday = (newDate: string) => {
    const date = parseISO(newDate);
    const dayOfWeek = getDay(date);
    const formattedDay = format(date, "EEEE");
    return formattedDay;
  };

  const handleUpdateCycleHours = (cycleName: string) => {
    handleClick1;
    if (brandData && brandData.cycle && brandData.cycle[cycleName]) {
      const cycle = brandData.cycle[cycleName];
      const existingHours = cycle.hours[currentDate];

      if (existingHours) {
        const updatedCycle = {
          ...cycle,
          hours: {
            ...cycle.hours,
            [currentDate]: {
              ...existingHours,
              hFin: currentTime,
            },
          },
        };
        setBrandData((prevData: any) => ({
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        }));
      } else {
        const previousDate = Object.keys(cycle.hours).pop();

        const updatedCycle = {
          ...cycle,
          hours: {
            ...cycle.hours,
            [currentDate]: {
              hIni: currentTime,
              hFin: previousDate ? cycle.hours[previousDate].hFin : "",
            },
          },
        };

        setBrandData((prevData: any) => ({
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        }));
      }
    }
    console.log(brandData);
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentDateOfWeekday = getDateOfWeekday(currentDate);

    if (currentDateOfWeekday && brandData.cycle && brandData.cycle["Ciclo 1"]) {
      const cycle = brandData.cycle["Ciclo 1"];
      const existingHours = cycle.hours[currentDate];

      if (existingHours) {
        const markStart = existingHours.hIni;
        const markEnd = existingHours.hFin;

        if (checkMarkHours(markStart, markEnd)) {
          console.log("The hours match. Performing update...");
        } else {
          console.log("The mark hours do not match the defined hours.");
        }

        fetch(`/api/brands/${brandData.idEmployee}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brandData),
        })
          .then((res) => res.json())
          .then((updatedBrands) => {
            setBrandData((prevData) => ({
              ...prevData,
              ...updatedBrands,
            }));
          })
          .catch((error) => console.error("Error updating brands:", error));
      } else {
        console.log(`No information found for the day: ${currentDate}`);

        fetch(`/api/brands/${brandData.idEmployee}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brandData),
        })
          .then((res) => res.json())
          .then((updatedBrands) => {
            setBrandData((prevData) => ({
              ...prevData,
              ...updatedBrands,
            }));
          })
          .catch((error) => console.error("Error updating brands:", error));
      }
    }
  };

  const checkMarkHours = (markStart: string, markEnd: string): boolean => {
    if (!markEnd) {
      if ((hoursIni && markStart === hoursIni) || markStart < hoursIni) {
        console.log("They match");
        return true;
      } else {
        console.log("The mark start hour does not match");
      }
    } else if (
      (hoursIni &&
        hoursFin &&
        markStart === hoursIni &&
        markEnd === hoursFin) ||
      markEnd < hoursFin
    ) {
      console.log("The hours match");
      return true;
    } else {
      console.log("The mark end hour does not match");
    }

    return false;
  };

  return (
    <div>
      <SearchDepartment handleGet={handleGetBrands} />
      <button onClick={() => handleUpdateCycleHours("Ciclo 1")}>
        Edit Marks
      </button>
      <form action="" onSubmit={handleUpdate}>
        <button
          type="submit"
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          save
        </button>
      </form>
    </div>
  );
};

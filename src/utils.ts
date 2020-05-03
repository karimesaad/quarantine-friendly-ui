import { Company } from "./api/firebase";
import moment from "moment";

export const dayOfWeekAsString = (dayIndex: number): Day => {
  return [
    Day.Sunday,
    Day.Monday,
    Day.Tuesday,
    Day.Wednesday,
    Day.Thursday,
    Day.Friday,
    Day.Saturday,
  ][dayIndex];
};

export enum Day {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday",
}

export const getCompanyHoursForDay = (company: Company, day: Day) => {
  const companyHours = company.hours[day];
  //company does not have hours i.e. it's closed today
  if (companyHours.startTime == null || companyHours.endTime == null) {
    return null;
  }

  const companyStartTime = moment(companyHours.startTime).format("h:mm A");
  const companyEndTime = moment(companyHours.endTime).format("h:mm A");

  return companyStartTime + " - " + companyEndTime;
};

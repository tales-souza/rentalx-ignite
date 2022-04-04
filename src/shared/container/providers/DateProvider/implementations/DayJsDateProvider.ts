import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    const compare = dayjs(end_date_utc).diff(start_date_utc, "hours");
    return compare;
  }

  convertToUTC(date: Date): string {
    const dateUtcFormat = dayjs(date).utc().local().format();
    return dateUtcFormat;
  }
  dateNow(): Date {
    const dateNow = dayjs().toDate();
    return dateNow;
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    const compare = dayjs(end_date_utc).diff(start_date_utc, "days");
    return compare;
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  compareiIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayJsDateProvider };

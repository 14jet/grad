import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getDatesInMonth,
  isSameDate,
  DAYS,
  MONTHS,
  createDatesArr,
  compareDates,
} from "../../services/helpers/dateHandler";
import styles from "./Calendar.module.css";

const getRange = (datesArr) => {
  const timestamps = datesArr.map((item) => item.getTime());

  const min = Math.min(...timestamps);
  const max = Math.max(...timestamps);
  return { min: new Date(min), max: new Date(max) };
};

function Calendar({
  onSelect = function () {},
  availableDates = [],
  flexible = true,
  selectedDate = null,
}) {
  const range = getRange(availableDates);
  const [time, setTime] = useState({
    month:
      availableDates.length > 0 ? range.min.getMonth() : new Date().getMonth(), // 0 - 11
    year:
      availableDates.length > 0
        ? range.min.getFullYear()
        : new Date().getFullYear(),
  });
  const lang = useTranslation().i18n.language;
  const { t } = useTranslation();

  const isMinMonth =
    time.year === range.min.getFullYear() &&
    time.month === range.min.getMonth();
  const isMaxMonth =
    time.year === range.max.getFullYear() &&
    time.month === range.max.getMonth();

  const current_month_dates_count = getDatesInMonth(time.year, time.month);
  const prev_month_dates_count = getDatesInMonth(time.year, time.month - 1);
  const next_month_dates_count = getDatesInMonth(time.year, time.month + 1);

  const firstDays = new Date(time.year, time.month, 1).getDay();
  const lastDays = new Date(
    time.year,
    time.month,
    current_month_dates_count
  ).getDay();

  const viewed_dates = createDatesArr(prev_month_dates_count)
    .slice(prev_month_dates_count - firstDays)
    .map((item) => {
      const this_date = new Date(time.year, time.month - 1, item);

      return {
        value: this_date,
        label: item,
        is_current_month: false,
        is_current_date: false,
        is_selected: selectedDate && isSameDate(this_date, selectedDate),
        is_available: flexible
          ? this_date.getTime() > Date.now() ||
            isSameDate(new Date(), this_date)
          : availableDates.find((item) => isSameDate(item, this_date)),
      };
    })
    .concat(
      createDatesArr(current_month_dates_count).map((item) => {
        const this_date = new Date(time.year, time.month, item);

        return {
          value: this_date,
          label: item,
          is_current_month: true,
          is_current_date: isSameDate(new Date(), this_date),
          is_date_before: compareDates(this_date, new Date()) < 0,
          is_date_after: compareDates(this_date, new Date()) > 0,
          is_selected: selectedDate && isSameDate(this_date, selectedDate),
          is_available: flexible
            ? this_date.getTime() > Date.now() ||
              isSameDate(new Date(), this_date)
            : availableDates.find((item) => isSameDate(item, this_date)),
        };
      })
    )
    .concat(
      createDatesArr(next_month_dates_count)
        .slice(0, 6 - lastDays)
        .map((item) => {
          const this_date = new Date(time.year, time.month + 1, item);

          return {
            value: this_date,
            label: item,
            is_current_month: false,
            is_current_date: false,
            is_selected: selectedDate && isSameDate(this_date, selectedDate),
            is_available: flexible
              ? this_date.getTime() > Date.now() ||
                isSameDate(new Date(), this_date)
              : availableDates.find((item) => isSameDate(item, this_date)),
          };
        })
    );

  const paginationHandler = (step) => {
    if (
      (step === -1 && isMinMonth && !flexible) ||
      (step === 1 && isMaxMonth && !flexible)
    ) {
      return;
    }

    setTime((prev) => {
      const month = prev.month;
      const year = prev.year;

      if (month + step > 11) {
        return {
          year: year + 1,
          month: 0,
        };
      }

      if (month + step < 0) {
        return {
          year: year - 1,
          month: 11,
        };
      }

      return {
        year: year,
        month: month + step,
      };
    });
  };

  const dateClasses = ({
    is_current_month,
    is_selected,
    is_available,
    is_current_date,
    is_date_after,
    is_date_before,
  }) => {
    let classes = styles.date + " ";
    if (is_available) {
      classes += styles.available + " ";
    }

    if (!is_current_month) {
      classes += styles.notCurrentMonth + " ";
    }

    if (is_selected) {
      classes += styles.isSelected + " ";
    }

    if (is_current_date) {
      classes += styles.isCurrentDate + " ";
    }

    if (is_date_before) {
      classes += styles.isDateBefore + " ";
    }

    if (is_date_after) {
      classes += styles.isDateAfter + " ";
    }

    return classes;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header + " d-flex justify-content-between pb-1"}>
        <h6 className={styles.month}>
          {MONTHS[time.month][lang]}, {time.year}
        </h6>

        <div className="d-flex align-items-center">
          <button
            type="button"
            className={
              styles.indicator +
              " " +
              (isMinMonth && !flexible && styles.disabled) +
              " " +
              (((time.month === new Date().getMonth() &&
                time.year === new Date().getFullYear()) ||
                time.year < new Date().getFullYear()) &&
                styles.disabled)
            }
            onClick={() => paginationHandler(-1)}
          >
            &#10094;
          </button>
          <span className={styles.indicatorMiddle}>○</span>
          <button
            type="button"
            className={
              styles.indicator +
              " " +
              (isMaxMonth && !flexible && styles.disabled)
            }
            onClick={() => paginationHandler(1)}
          >
            &#10095;
          </button>
        </div>
      </div>

      <ul className={styles.days}>
        {DAYS.map((item) => (
          <li key={item[lang]}>{item[lang]}</li>
        ))}
      </ul>

      <ul className={styles.dates}>
        {viewed_dates.map((item, index) => (
          <li
            key={index}
            className={dateClasses({
              is_current_month: item.is_current_month,
              is_selected: item.is_selected,
              is_available: item.is_available,
              is_current_date: item.is_current_date,
              is_date_after: item.is_date_after,
              is_date_before: item.is_date_before,
            })}
            onClick={() => {
              if (item.is_available) {
                console.log(item.value);
                onSelect(item.value);
              }
            }}
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div
        className={
          styles.notes + "  d-flex justify-content-end gap-4 border-top pt-2"
        }
      >
        <div className="d-flex gap-1 text-secondary">
          <div className={styles.availableNote}></div>
          <span>{t("components.calendar.picked")}</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

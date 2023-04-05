export const formatDate = (dateInMillis: number): string => {
  const date = new Date(dateInMillis);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const parseDate = (dateInMillis: number): string => {
  const date = new Date(dateInMillis);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getAllDatesFrom1960 = (): string[] => {
  const startDate = new Date("1960-09-01");
  const endDate = new Date();

  const daysArray = [];

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    daysArray.push(formattedDate);
  }

  return daysArray;
};

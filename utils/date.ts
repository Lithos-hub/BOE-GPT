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

export const reformatDate = (date: string): string => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

export const getAllDatesFrom2000 = (): string[] => {
  const startDate = new Date("2000-09-01");
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

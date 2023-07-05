const currentDate = (dateParam: any) => {
    const date = dateParam ? new Date(dateParam) : new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  export default currentDate
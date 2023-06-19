import { format } from "date-fns";

function dateFormater(dateString, template) {
  if (template) {
    return format(new Date(dateString), template);
  }
  return format(new Date(dateString), "MM/dd/yyyy");
}

export default dateFormater;

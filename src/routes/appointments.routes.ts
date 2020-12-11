import { Router } from 'express';
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository"

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = parseISO(date);
  const dateHour = startOfHour(parseDate);

  const findAppointmentInSameDate = appointmentsRepository.findByDate(dateHour);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: "This appointments is already booked" });
  }

  const appointment = appointmentsRepository.create(provider, dateHour)

  return response.json(appointment);
})

export default appointmentsRouter;

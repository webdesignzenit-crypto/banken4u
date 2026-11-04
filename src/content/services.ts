import type { ServicePage } from "./types";
import { servicesBau } from "./services-bau";
import { servicesWeitere } from "./services-weitere";

export const services: ServicePage[] = [...servicesBau, ...servicesWeitere];

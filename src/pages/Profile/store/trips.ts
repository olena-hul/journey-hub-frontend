import { defineStore } from "pinia";
import type { Attraction, Budget, Trip } from "@/pages/Planning/api";
import { createTripAttractions, getMyTrips } from "@/pages/Planning/api";
import type { Destination } from "@/pages/Home/api";
import type {
  CreateExcursion,
  CustomExpenseInput,
  Excursion,
  ExcursionBooking,
  ExcursionBookingInput,
  RateInput,
  TripAttraction,
  TripDetail,
  UpdateTripAttractionInput,
} from "@/pages/Profile/api";
import {
  createBooking,
  createCustomExpense,
  createExcursion,
  createRate,
  getDaysInTrip,
  getExcursionBookings,
  getExcursions,
  getTripAttraction,
  getTripDetail,
  getTripExpenses,
  getVisitedPlaces,
  imageUpload,
  removeCustomExpense,
  updateTripAttraction,
} from "@/pages/Profile/api";
import type { MyObject } from "@/common/interfaces";
import { convertCurrency, planTrip } from "@/pages/Planning/utils";
import { BUDGET_CATEGORIES } from "@/common/constants";

interface TripsState {
  myTrips: Trip[];
  visitedPlaces: Destination[];
  daysInTrips: MyObject;
  tripExpenses: MyObject;
  trip: TripDetail | null;
  plannedTrip: MyObject;
  selectedDates: Date[];
  estimatedExpenses: number[];
  actualExpenses: number[];
  excursionBookings: ExcursionBooking[];
  excursions: Excursion[];
  excursion: Excursion | null;
  booking: ExcursionBooking | null;
  activeAttraction: TripAttraction | null;
  customExpenseFormVisible: boolean;
}

export const useTripsStore = defineStore({
  id: "trips",
  state: () =>
    ({
      myTrips: [],
      visitedPlaces: [],
      daysInTrips: {},
      tripExpenses: {},
      trip: null,
      plannedTrip: {},
      selectedDates: [],
      estimatedExpenses: [],
      actualExpenses: [],
      excursionBookings: [],
      excursions: [],
      excursion: null,
      booking: null,
      activeAttraction: null,
      customExpenseFormVisible: false,
    } as TripsState),

  actions: {
    async getMyTrips() {
      const trips = await getMyTrips();
      this.myTrips = trips.data;
      return trips;
    },

    async getVisitedPlaces() {
      const visitedPlaces = await getVisitedPlaces();
      this.visitedPlaces = visitedPlaces.data;
      return visitedPlaces;
    },

    async getDaysInTrips() {
      const daysInTrips = await getDaysInTrip();
      this.daysInTrips = daysInTrips.data;
      return daysInTrips;
    },
    async getTripExpenses() {
      const tripExpenses = await getTripExpenses();
      this.tripExpenses = tripExpenses.data;
      return tripExpenses;
    },
    async getTripDetail(trip_id: number) {
      const trip = await getTripDetail(trip_id);
      this.trip = trip.data;
      this.selectedDates = [
        new Date(this.trip.start_date),
        new Date(this.trip.end_date),
      ];
    },
    getPlannedTrip(selectedDates: Date[]) {
      console.log("heehehheje");
      this.plannedTrip = planTrip(selectedDates, this.plannedTrip);
    },
    async imageUpload(file: any, attraction: any, user: any) {
      await imageUpload(file, attraction, user);
      await getTripDetail(this.trip?.id as number);
      const res = await getTripAttraction(this.activeAttraction?.id as number);
      this.activeAttraction = res.data;
    },
    async rateCreate(body: RateInput) {
      await createRate(body);
      await getTripDetail(this.trip?.id as number);
      const res = await getTripAttraction(this.activeAttraction?.id as number);
      this.activeAttraction = res.data;
    },
    async customExpenseCreate(body: CustomExpenseInput) {
      await createCustomExpense(body);
      await this.getTripDetail(this.trip?.id as number);
    },
    async customExpenseRemove(id: number) {
      await removeCustomExpense(id);
      await this.getTripDetail(this.trip?.id as number);
    },
    async updateTripAttraction(body: UpdateTripAttractionInput) {
      const res = await updateTripAttraction(
        this.activeAttraction?.id as number,
        body
      );
      this.activeAttraction = res.data;
      await getTripDetail(this.trip?.id as number);
    },

    async createExcursion(body: CreateExcursion) {
      await createExcursion(body);
      await this.getExcursions();
    },
    async createTripAttraction(date: string, attraction: Attraction) {
      if (!this.trip || this.trip?.id === null) {
        return;
      }
      let newAttraction = await createTripAttractions([
        {
          trip: this.trip?.id as number,
          attraction: attraction.id,
          date: date,
          price:
            attraction.currency === this.trip.budgets.at(0)?.currency
              ? attraction.price
              : convertCurrency(
                  this.trip.budgets.at(0)?.currency || "$",
                  attraction.price
                ),
          currency:
            attraction.currency || this.trip.budgets.at(0)?.currency || "$",
        },
      ]);
      newAttraction = newAttraction.data?.at(0);
      return {
        ...newAttraction,
        attraction: attraction,
      };
    },
    async getExcursionBookings(user_id: number) {
      const bookings = await getExcursionBookings(user_id);
      this.excursionBookings = bookings.data;
    },
    async createBooking(body: ExcursionBookingInput) {
      const booking = await createBooking(body);
      this.booking = booking.data;
      return this.booking;
    },
    async getExcursions() {
      const excursions = await getExcursions();
      this.excursions = excursions.data;
    },
    async setBudget(budget: any) {
      if (!this.trip) {
        return;
      }
      this.trip.budgets[0] = budget;
    },
    async calculateExpenses() {
      if (!this.trip) {
        return;
      }
      const budget = this.trip.budgets.at(0) as Budget;
      const customExpenses = this.trip.custom_expenses;

      const estimatedExpenses = budget.entries.reduce(
        (accumulator: MyObject, entry) => {
          const category = entry.category;
          const amount = entry.estimated_amount;

          if (!accumulator[category]) {
            accumulator[category] = 0;
          }

          accumulator[category] += amount;

          return accumulator;
        },
        BUDGET_CATEGORIES.reduce(
          (obj, category) => ({ ...obj, [category]: 0 }),
          {}
        )
      );
      this.estimatedExpenses = Object.values(estimatedExpenses);

      const actualExpenses: MyObject = Object.values(this.plannedTrip).reduce(
        (accumulator: MyObject, attractions: any) => {
          attractions.forEach((tripAttraction: TripAttraction) => {
            const category = tripAttraction.attraction.budget_category;
            const amount = tripAttraction.price;

            if (!accumulator[category]) {
              accumulator[category] = 0;
            }

            accumulator[category] += Number(amount);
          });

          return accumulator;
        },
        BUDGET_CATEGORIES.reduce(
          (obj, category) => ({ ...obj, [category]: 0 }),
          {}
        )
      );

      customExpenses.map((customExpense) => {
        actualExpenses[customExpense.budget_category] += Number(
          customExpense.price
        );
      });

      this.actualExpenses = Object.values(actualExpenses);
    },
  },
});

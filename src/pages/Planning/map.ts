import type { Attraction } from "@/pages/Planning/api";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import type { Destination } from "@/pages/Home/api";

export const useMap = () => {
  let map: google.maps.Map | null = null;

  const planningStore = usePlanningStore();
  const initMap = (
    latitude: number,
    longitude: number,
    mapId: string | null = null,
    zoom = 12
  ): google.maps.Map => {
    map = new google.maps.Map(
      document.getElementById(mapId || "map") as HTMLElement,
      {
        center: { lat: latitude, lng: longitude },
        zoom,
      }
    );
    return map;
  };

  const addMarkers = (attractions: Attraction[]) => {
    return attractions.map((attraction) => {
      const marker = new google.maps.Marker({
        position: {
          lat: attraction.location.latitude,
          lng: attraction.location.longitude,
        },
        map,
        title: attraction.name,
      });
      const infowindow = new google.maps.InfoWindow({
        content: `
            <style>
            button:hover{
                cursor: pointer;
                background-color: gray !important;
            }
            .gm-button-disabled{
                cursor: initial;
                background-color: gray !important;
                border: none !important;
            }
            </style>
            <img 
             style="height: 200px; width: 200px"
             alt="Attraction image" 
             src="${attraction.image_urls?.at(0)}/"
             >
             <h3 style="width: 200px;">${attraction.name}</h3>
             <p style="width: 200px">${attraction.description}</p>
             <button id="gm-button-${attraction.id}"
             style="background-color: black; color: white;
             width: 100px; font-weight: bold; margin: 10px 50px; border: none;
             border-radius: 7px; height: 30px;"
             > + Add to trip
             </button>`,
      });

      // Add a click listener to the marker
      marker.addListener("click", () => {
        infowindow.open(map, marker);
        setTimeout(() => {
          const button = document.getElementById(`gm-button-${attraction.id}`);
          if (!button) {
            return;
          }
          if (!planningStore.selectedDay) {
            button.className = "gm-button-disabled";
          } else {
            button.classList.remove("gm-button-disabled");
          }
          if (planningStore.selectedDay !== null) {
            button.addEventListener("click", () => {
              planningStore.plannedTrip[planningStore.selectedDay as any].push(
                attraction
              );
              planningStore.newPlaceVisible = false;
              planningStore.calculateExpenses();
            });
          }
        }, 50);
      });
      return marker;
    });
  };
  const addVisitedPlacesMarkers = (destinations: Destination[]) => {
    return destinations.map((destination) => {
      return new google.maps.Marker({
        position: {
          lat: destination.location.latitude,
          lng: destination.location.longitude,
        },
        map,
        title: destination.name,
      });
    });
  };
  return {
    map,
    initMap,
    addMarkers,
    addVisitedPlacesMarkers,
  };
};

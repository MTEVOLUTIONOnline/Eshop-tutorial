import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
// import styles from '../../styles/styles';


const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const renderEvents = () => {
    if (allEvents && allEvents.length > 0) {
      return allEvents.map((event, index) => (
        <EventCard key={index} data={event} />
      ));
    } else {
      return (
        <div className="col-span-full text-center text-gray-500 text-lg font-medium">
          Nenhum evento disponível no momento.
        </div>
      );
    }
  };

  return (
    <div className={`${styles} bg-gray-50 py-8`}>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <>
          <Header activeHeading={4} />
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#333]">Eventos Populares</h1>
            <p className="text-gray-600 mt-2">
              Descubra os eventos mais esperados e com grandes descontos!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderEvents()}
          </div>
        </>
      )}
    </div>
  );
};

export default EventsPage;

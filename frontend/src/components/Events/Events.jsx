import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  // Pega apenas os 4 primeiros eventos
  const limitedEvents = allEvents?.slice(0, 3);

  return (
    <div className={`${styles.section} bg-gray-50 py-8`}>
      {!isLoading ? (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#333]">Eventos Populares</h1>
            <p className="text-gray-600 mt-2">
              Descubra os eventos mais esperados e com grandes descontos!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedEvents?.length > 0 ? (
              limitedEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg font-medium">
                Nenhum evento disponível no momento.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-gray-500">Carregando eventos...</p>
        </div>
      )}
    </div>
  );
};

export default Events;

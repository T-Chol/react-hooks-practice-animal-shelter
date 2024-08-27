import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (newType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: newType,
    }));
  };

  const onFindPetsClick = () => {
    let apiUrl = "/api/pets";

    if (filters.type !== "all") {
      apiUrl += `?type=${filters.type}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  };

  const onAdoptPet = (id) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  const filteredPets = pets.filter((pet) => {
    return filters.type === "all" || pet.type === filters.type;
  });

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
              />
          </div>
          <div className="twelve wide column">
            <PetBrowser
              pets={pets} 
              onAdoptPet={onAdoptPet} 
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
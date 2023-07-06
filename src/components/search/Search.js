import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoDbApiOptions } from "../../api";

function Search({ onSearchChange }) {
	const [search, setSearch] = useState(null);

	const handleOnchange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
		setSearch(null);
	};

	const loadOptions = async (inputValues) => {
		try {
			const response = await fetch(
				`${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValues}`,
				geoDbApiOptions
			);


			const result = await response.json();
			return {
				options: result.data.map((city) => {
					return {
						value: `${city.latitude} ${city.longitude}`,
						label: `${city.name} , ${city.countryCode}`, //user see when search as search options
					};
				}),
			};
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={900}
			value={search}
			onChange={handleOnchange}
			loadOptions={loadOptions}
		/>
	);
}

export default Search;

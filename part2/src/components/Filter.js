import React from "react";

const Filter = ({search, searchChangeHandler}) =>
	<div>filter shown with <input value={search} onChange={searchChangeHandler}/></div>

export default Filter;
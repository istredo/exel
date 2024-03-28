import React from 'react'
import axios from "axios"
import { API_URL } from './utils/api';

export type DataItem = (string | number | {})[];

type FilteredDataItem = (string | number)[];

const DataList: React.FC = () => {
	const [value, setValue] = React.useState<FilteredDataItem[]>([]);

	function filterEmptyItems(data: DataItem[]): FilteredDataItem[] {
		return data.map(row => row.filter(item => {
			if (typeof item === 'object') {
				return false; // Тут можно сделать проверку на вложенный список при необходимости
			} else {
				return true;
			}
		})).filter(row => row.length > 0)
			.map(row => row.map(item => typeof item === 'string' ? item : Number(item)));
	}

	React.useEffect(() => {
		const fetchExcel = async () => {
			try {
				const { data } = await axios.get<DataItem[]>(API_URL);
				const filteredData = filterEmptyItems(data);
				setValue(filteredData);

			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchExcel();
	}, []);

	return (
		<div>
			<h1>Filtered Data List</h1>
			<ul className='rows'>
				{value.map((row, rowIndex) => (
					<li key={rowIndex}>
						<ul className='columns'>
							{row.map((item, itemIndex) => (
								<li key={itemIndex} className='columns_item'>{item}</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DataList;
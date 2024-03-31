import React from 'react'
import axios from "axios"
import { API_URL2 } from './utils/api';
import { Button, Container } from '@mui/material';
import { DataItem } from './utils/types';



const DataList: React.FC = () => {
	const [value, setValue] = React.useState<DataItem[]>([]);



	const fetchExcel = async () => {
		try {
			const { data } = await axios.get<DataItem[]>(API_URL2);
			const filteredData = data.filter(item => typeof item.FakePrice === 'number' && !isNaN(item.FakePrice));
			setValue(filteredData);

		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	React.useEffect(() => {
		fetchExcel();
	}, []);

	return (
		<Container maxWidth='xs' className='data__container'>
			<h1>Filtered Data List</h1>
			<ul className='data__list'>
				{value.map((item, index) => (
					<li key={index} className='rows'>
						<span className='columns_item'> {item.FakeData}</span>
						<span className='columns_item'> {item.FakePrice}</span>
					</li>
				))}
			</ul>
			<Button variant="contained" onClick={() => fetchExcel()}>refresh list</Button>
		</Container>
	);
};

export default DataList;
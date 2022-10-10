import React, { useState } from 'react';
import { PurdueMap } from './Map';
import { Photo } from './Photo';
import { Bar } from './Bar';
import { Coordinate } from 'ol/coordinate';
import data from '../data.json';
import { BottomBar } from './BottomBar';

/**
 * Simple type for each questions in the data.json file. Each question contains
 * a url to the picture to be shown to the user, the location of the picutre
 * taken which is also the answer. Offset is tricky to explain, but it is the
 * range of answer. Higher the offest, the more likely is it to get a correct
 * answer. Difficulty is just to use as a multiplier. 
 * 
 * @param {string} pic Url of the picture to show to the user
 * @param {number[]} loc Lat/long of the picture
 * @param {number} offset In terms of meters (not exactly meters, but very close EPSG:3857), the difference between each answer.
 * @param {number} diff Difficulty of the question. Used as a multiplier for the final score.
 */
export type QuestionT = {
	pic: string;
	loc: number[];
};

export const App = (): JSX.Element => {

	const [marker, setMarker] = useState<Coordinate | null>(null);
	const [question, setQuestion] = useState<QuestionT>(data[Math.floor(Math.random() * data.length)]);

	return (
		<div className='app'>
			<Bar />
			<Photo
				pic={question.pic}
			/>
			<PurdueMap
				setMarker={setMarker}
			/>
			<BottomBar
				marker={marker}
				location={question.loc}
				next={() => {
					setQuestion(data[Math.floor(Math.random() * data.length)]);
					setMarker(null);
				}}
			/>
		</div>
	);
}

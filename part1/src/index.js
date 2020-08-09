import React, {useState} from 'react'
import ReactDOM from 'react-dom'

// I wasn't sure if we needed to submit the commented out code so I added it just in case,
// the final submission is uncommented
/* const Button = ({onClick, caption}) => <button onClick={onClick}>{caption}</button>

const Statistic = ({text, value, unit}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value} {unit}</td>
		</tr>
	)
}

const Statistics = ({good, bad, neutral}) => {
	return (bad + good + neutral) ? (
		<div>
			<table>
				<tbody>
					<Statistic text="Good" value={good}/>
					<Statistic text="Neutral" value={neutral}/>
					<Statistic text="Bad" value={bad}/>
					<Statistic text="All" value={bad + good + neutral}/>
					<Statistic text="Average" value={(bad + good + neutral)/3}/>
					<Statistic text="Positive" value= {good/(bad + good + neutral) * 100} unit="%"/>
				</tbody>
			</table>
		</div>
	) : (<p>No feedback given</p>)
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>Give Feedback</h1>
			<Button onClick={() => setGood(good + 1)} caption={"Good"}></Button>
			<Button onClick={() => setNeutral(neutral + 1)} caption={"Neutral"}></Button>
			<Button onClick={() => setBad(bad + 1)} caption={"Bad"}></Button>
			<h1>Statistics</h1>
			<Statistics good={good} bad={bad} neutral={neutral}></Statistics>
		</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)
*/

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Uint8Array(6));
	const anecdotes = props.anecdotes;
	const handleVote = () => {
		const votesCopy = [...votes];
		votesCopy[selected]++;
		setVotes(votesCopy);
	}
	const getMaxVotesAnecdote = () => {
		const indexOfMaxValue = votes.reduce((iMax, currElem, currIndex, array) => currElem > array[iMax] ? currIndex : iMax, 0);
		return anecdotes[indexOfMaxValue] + "\nhas " + votes[indexOfMaxValue] + " vote(s)"
	}
	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]} <br/> has {votes[selected]} vote(s)</p>
			<button onClick={handleVote}>Vote</button>
			<button onClick={() => {setSelected(Math.floor(Math.random() * 5))}}>Next Anecdote</button>
			<h1>Anecdote with the most votes</h1>
			<p>{getMaxVotesAnecdote()}</p>
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  let pokemonList = [
    {
      name: "Gardevoir",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png"
    },
    {
      name: "Roselia",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/315.png"
    },
    {
      name: "Lucario",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
    },
    {
      name: "Flygon",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png"
    },
    {
      name: "Samurott",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/503.png"
    },
    {
      name: "Misdreavus",
      imageSource: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/200.png"
    }
    
  ]

  const [currentScore, setCurrentScore] = useState(0)
  const [shuffledPokemonList, setShuffledPokemonList] = useState(pokemonList)
  const [previousChoices, setPreviousChoices] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [winStatus, setWinStatue] = useState(true)
  const [maxScore, setMaxScore] = useState(0)

  const increaseCurrentScore = () => {
    setCurrentScore(currentScore + 1)
  }

  const clearCurrentScore = () => {
    setCurrentScore(0)
  }

  const shufflePokemons = (pokemonList) => {
    for (let i = pokemonList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pokemonList[i], pokemonList[j]] = [pokemonList[j], pokemonList[i]]
    }
    return pokemonList
  }

  const handleCardSelect = (name) => {
    setSelectedPokemon(name)
  }

  useEffect(() => {
    if (previousChoices.length === 0 && selectedPokemon !== "" && selectedPokemon !== null) {
      setPreviousChoices([...previousChoices, selectedPokemon])
      increaseCurrentScore()
    } else {
      if (!previousChoices.includes(selectedPokemon) && selectedPokemon !== "" && selectedPokemon !== null) {
        setPreviousChoices([...previousChoices, selectedPokemon])
        increaseCurrentScore()
      } else if (previousChoices.includes(selectedPokemon) && selectedPokemon !== "" && selectedPokemon !== null) {
        clearCurrentScore()
        setWinStatue(false)
      }
    }

    setShuffledPokemonList(shufflePokemons(pokemonList))

    return () => {
      setSelectedPokemon(null)
    }
  },
    [selectedPokemon])

  useEffect(
    () => {
      if (currentScore > maxScore) {
        setMaxScore(currentScore)
      }
    }
    , [currentScore])

  const handleRestartGame = () => {
    setSelectedPokemon("")
    setWinStatue(true)
    setPreviousChoices([])
    setCurrentScore(0)
  }


  return (
    <>
      <p>Current score: {currentScore}</p>
      <p>Max score: {maxScore}</p>
      {
        currentScore === pokemonList.length ?
          <div>
            <h1>You won!</h1>
            <input type='button' value="Restart game" onClick={handleRestartGame} />
          </div>
          :
          !winStatus ?
            <div>
              <h1>You lose!</h1>
              <input type='button' value="Restart game" onClick={handleRestartGame} />
            </div>

            :
            <></>
      }
      <div className='cardContainer'>
      {
        shuffledPokemonList.map((pokemon) => {
          return <Card key={pokemon.name} name={pokemon.name} imageSource={pokemon.imageSource} handleCardSelect={setSelectedPokemon} />
        })
      }
      </div>
    </>
  )
}

export default App

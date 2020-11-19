import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CharacterProfiles = () => {
  const [character, setCharacter] = useState(null)

  // Equivalente al ngOnInit o OnLoad
  useEffect(() => {
    axios
      .get('https://www.breakingbadapi.com/api/characters/1')
      .then(({ data }) => {
        setCharacter(data[0])
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      {character && (
        <>
          <p>
            <strong>Name: </strong>
            {character.name}
          </p>
          <p>
            <strong>Nickname: </strong>
            {character.nickname}
          </p>
          <p>
            <strong>Status: </strong>
            {character.status}
          </p>
          <p>
            <strong>Birthday: </strong>
            {character.bithday}
          </p>
          <img src={character.img} alt={character.name} />
          <p>
            <strong>Occupation: </strong>
          </p>
          <ul>
            {character.occupation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default CharacterProfiles

import React from 'react'
import './cards.css'

const Cards = ({ data }) => {

    return (
        <div className='all-cards-style'>
            {data.map((movie, index) => (
                <div key={index} className='card-style'>
                    <img src='./movie.png' alt='Movie image' />
                    <div className='card-text-style'>
                        <div className='movie-title-runtime'>
                            <h3>{movie.name}</h3>
                            <span>{movie.runtimeInMinutes} min</span>
                        </div>
                        <div className='awards-style'>
                            <img src='./Academy award.png' alt='academy-award-img' />
                            <span>{movie.academyAwardWins} Wins & {movie.academyAwardNominations} Nominations</span>
                        </div>
                        <div className='budget-revenue-style'>
                            <div className='currency-div'>
                                <span>Budget</span>
                                <span className='currency-style'>${movie.budgetInMillions}M</span>
                            </div>
                            <div className='currency-div'>
                                <span>Revenue</span>
                                <span className='currency-style'>${movie.boxOfficeRevenueInMillions}M</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards
